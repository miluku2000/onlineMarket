<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="searchForm" :inline="true" :model="searchForm" label-width="100px">
        <el-form-item prop="idCard">
          <el-input v-model="searchForm.idCard" placeholder="输入身份证号" />
        </el-form-item>
        <el-form-item prop="userName">
          <el-input v-model="searchForm.userName" placeholder="输入人员姓名" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="submitSearchForm('searchForm')">搜索</el-button>
          <el-button @click="resetSearchForm('searchForm')">重置</el-button>
          <el-button type="primary" icon="el-icon-edit" @click="handelAdd('add')">
            新增住户
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <el-col v-if="memberType<3" :span="4">
        <el-tree
          ref="tree"
          node-key="id"
          :expand-on-click-node="false"
          :data="options"
          highlight-current
          :props="defaultProps"
          :load="loadNode"
          lazy
          @node-click="handleNodeClick"
        />
      </el-col>
      <el-col :span="memberType<3?20:24">
        <el-table
          ref="multipleTable"
          v-loading="listLoading"
          :data="list"
          node-key="id"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" />
          <el-table-column label="行政规划">
            <template slot-scope="{row}">
              <span>{{ row.administrativeVillageName||'' }}-{{ row.administrativeBlockName||'' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="所在组织">
            <template v-if="row.gridSO" slot-scope="{row}">
              <span>{{ row.gridSO.villageGridName||'' }}-{{ row.gridSO.oneGridName||'' }}-{{ row.gridSO.twoGridName||'' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="户名">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="户主">
            <template slot-scope="{row}">
              <span>{{ row.householderName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="特殊标签">
            <template slot-scope="{row}">
              <span v-for="item in row.labelSOS" :key="item.id">
                <img class="tableListIcon" :src="item.labelIcon">
              </span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="事迹 好/坏/普">
            <template slot-scope="{row}">
              <span class="blue" @click="toEventManage(row)">{{ row.goodMsg||0 }}/{{ row.badMsg||0 }}/{{ row.normalMsg||0 }}</span>
            </template>
          </el-table-column> -->
          <el-table-column label="操作" align="center">
            <template slot-scope="{row}">
              <router-link :to="'/householdManage/details/'+row.id">
                <el-button type="primary" size="mini">
                  详情
                </el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="searchForm.pageNum" :limit.sync="searchForm.pageSize" @pagination="getList" />
      </el-col>
    </el-row>
    <myDialog ref="myDialog" :title="title" :visible.sync="visible" :type="dialogType" @getList="getList($event)" />
    <treeDialog ref="treeDialog" :multiple-selection="multipleSelection" :title="title" :visible.sync="visible1" :type="dialogType" @getList="getList($event)" />
  </div>
</template>

<script>
import { fetchList, addFile } from '@/api/householdManage'
import { fetchChidList } from '@/api/administrativeManage'
import Pagination from '@/components/Pagination'
import MyDialog from './components/dialog'
import TreeDialog from './components/treeDialog'
export default {
  name: 'HouseholdManage',
  components: { Pagination, MyDialog, TreeDialog },
  data() {
    return {
      title: '',
      dialogType: '',
      selectedTreeData: {},
      visible: false,
      visible1: false,
      btnDisabled: true,
      multipleSelection: [],
      memberType: this.$store.getters.token.memberType, // 登录用户类型,3-小组长隐藏按钮-添加至组织
      list: [],
      total: 0,
      listLoading: true,
      searchForm: {
        name: '',
        idCard: '',
        userName: '',
        administrativeId: this.$store.getters.token.administrativeId,
        pageNum: 1,
        pageSize: 10,
        userId: this.$store.getters.token['x-ysmall-user-id']
      },
      searchTreeForm: {
        id: this.$store.getters.token.administrativeId,
        memberType: this.$store.getters.token.memberType
      },
      defaultProps: {
        children: 'children',
        label: 'adminName',
        isLeaf: function(data, node) {
          return data.kidNum < 1
        }
      },
      // 数据列表
      options: []
    }
  },
  watch: {
    $route(to, from) {
      if (from.name === 'HouseholdManageEdit') { // 从编辑页返回刷新
        this.submitSearchForm('searchForm')
      }
    }
  },
  created() {
    this.getList()
    this.getTreeList()
  },
  methods: {
    // 点击上传文件触发input文件
    goFile() {
      this.$refs.files.click()
    },
    // 上传文件oss接口
    upload() {
      const loading = this.$loading({
        lock: true,
        text: '文件上传中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      var fileObj = document.getElementById('file').files // js 获取文件对象
      var form = new FormData()
      form.append('file', this.file)
      if (fileObj.length !== 0) {
        var i = fileObj.length
        this.counts = i
        for (var j = 0; j < i; j++) {
          (function(i) {
            form.append('file', fileObj[i]) // 文件对象
          })(j)
        }
      }
      addFile(form).then(response => {
        // let arr = []
        // if (response && response.length) { // 过滤id相同的元素
        //   arr = response.filter((element, index, self) => {
        //     return self.findIndex(el => el.id === element.id) === index
        //   })
        // }
        // this.list = arr
        console.log(response)
        this.getList()
        document.getElementById('file').value = null
        loading.close()
      }).catch(() => {
        // this.listLoading = false
      })
    },
    download(searchForm) {
      var name = this.searchForm.name
      var idCard = this.searchForm.idCard
      var userId = this.searchForm.userId
      var administrativeId = this.searchForm.administrativeId
      var url = 'https://wangge.koba-ad.com'
      // var url = 'https://caz.koba-ad.com'
      // var url = 'https://10.118.26.191:8090'
      window.location.href = url + '/smart/f/back/household/exportHouseholdList?name=' + name + '&idCard=' + idCard + '&userId=' + userId + '&administrativeId=' + administrativeId
    },
    toEventManage(row) {
      this.$router.push({ name: 'eventManage', params: { name: row.name }})
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      if (val && val.length > 0) {
        this.btnDisabled = false
      } else {
        this.btnDisabled = true
      }
    },
    handleNodeClick(data) {
      this.selectedTreeData = data
      this.searchForm.administrativeId = data.id
      this.getList()
    },
    submitSearchForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.searchForm.pageNum = 1
          this.getList()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetSearchForm(formName) {
      this.$refs[formName].resetFields()
    },
    getTreeList() {
      fetchChidList(this.searchTreeForm).then(response => {
        this.options = response
      }).catch(() => {})
    },
    loadNode(node, resolve) {
      if (node.data.id) {
        const postData = { 'id': node.data.id, 'memberType': this.$store.getters.token.memberType }
        fetchChidList(postData).then(response => {
          resolve(response)
        }).catch(() => {
        })
      }
    },
    getList() {
      this.listLoading = true
      fetchList(this.searchForm).then(response => {
        this.list = response.list
        this.total = response.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handelAdd(e, row) {
      this.dialogType = e
      this.visible = true
      this.title = '新增住户'
      if (this.selectedTreeData.adminType === 3) {
        this.$refs.myDialog.setMyData(this.selectedTreeData)
      }
    },
    addOtherGrid(e, row) {
      this.dialogType = e
      this.visible1 = true
      this.title = '添加至组织'
    }
  }
}
</script>
<style scoped>
.tableListIcon {
  width: 15px;
  height: 15px;
}
.el-tree-node__label{
  font-weight: normal;
}
.el-tree >>>.is-current .el-tree-node__label{
  color: #409EFF;
  font-weight: 700;
}
.el-tree >>>.is-current .el-tree-node__children .el-tree-node__label{
  color:#606266;
  font-weight: normal;
}
.blue {
  color: #1890ff;
  cursor: pointer;
}
</style>
