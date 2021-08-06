<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="searchForm" :inline="true" :model="searchForm" label-width="100px">
        <el-form-item prop="gridNumber">
          <el-input v-model="searchForm.gridNumber" placeholder="请输入编号搜索" />
        </el-form-item>
        <el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="submitSearchForm('searchForm')">搜索</el-button>
            <el-button @click="resetSearchForm('searchForm')">重置</el-button>
            <el-button v-if="loginGridType!=4" type="primary" icon="el-icon-edit" @click="handelAdd('add')">
              添加组织
            </el-button>
          </el-form-item>
        </el-form-item></el-form>
    </div>

    <el-table
      ref="myTable"
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      row-key="id"
      highlight-current-row
      :lazy="lazy"
      :load="load"
      :tree-props="{children: 'childrenSOs', hasChildren: 'kidNum'}"
      style="width: 100%;"
    >
      <el-table-column label="机构代码">
        <template slot-scope="{row}">
          <span>{{ row.gridNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="机构名称">
        <template slot-scope="{row}">
          <div class="layoutFlex">
            <img v-if="row.level==1" class="lampIcon" src="@/assets/greenLamp.png">
            <img v-if="row.level==2" class="lampIcon" src="@/assets/yellowLamp.png">
            <img v-if="row.level==3" class="lampIcon" src="@/assets/redLamp.png">
            <span>{{ row.gridName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="组织类型">
        <template slot-scope="{row}">
          <span>{{ row.gridType|gridTypeDic }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上级组织">
        <template slot-scope="{row}">
          <span v-if="row.gridType==2">{{ row.town }}</span>
          <span v-if="row.gridType==3">{{ row.village }}</span>
          <span v-if="row.gridType==4">{{ row.pidGridName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="小组长">
        <template slot-scope="{row}">
          <span v-for="(item,index) in row.userSOS" :key="item.id">
            <span v-if="item.gridChief==1">{{ item.name }}</span>
            <span v-else-if="index==0">{{ item.name }}</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="总股">
        <template slot-scope="{row}">
          <span>{{ row.count || 0 }}</span>
        </template>
      </el-table-column>
    </el-table>

    <myDialog ref="myDialog" :title="title" :visible.sync="visible" :type="dialogType" @getList="getList($event)" />
  </div>
</template>

<script>
import { selectGridListNew, deleteGrid, addFile } from '@/api/gridManage'
import MyDialog from './components/dialog'
export default {
  name: 'GridManage',
  components: { MyDialog },
  data() {
    return {
      loginMemberType: this.$store.getters.token.memberType, // 登录用户类型,3-小组长隐藏按钮-添加至组织
      loginGridType: this.$store.getters.token.gridType, // 登录用户所在组织类型
      loginGridId: this.$store.getters.token.gridId, // 登录用户所在组织id
      fggPid: '', // 刷新用，纪录当前编辑组织的父节点id
      fggPid2: '', // 刷新用，纪录当前编辑组织的id
      title: '',
      lazy: false,
      dialogType: '',
      visible: false,
      moveVisible: false,
      expands: [2],
      tableKey: 1,
      list: [],
      total: 0,
      listLoading: true,
      searchForm: {
        gridNumber: '',
        userId: this.$store.getters.token['x-ysmall-user-id']
      }
    }
  },
  watch: {
    $route(to, from) {
      this.getList()
      // if (from.name === 'GridManageEdit') { // 从编辑页返回刷新
      //   this.getList()
      // }
    }
  },
  created() {
    this.getList()
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
    toGridManageEdit(row) {
      this.fggPid = row.pid
      this.fggPid2 = row.id
      this.$router.push('/details/' + row.id)
    },
    submitSearchForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.searchForm.gridNumber) {
            this.tableKey = 2
            this.lazy = false
          }
          this.getList()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetSearchForm(formName) {
      this.tableKey = 1
      this.lazy = true
      this.$refs[formName].resetFields()
      this.getList()
    },
    getList() {
      this.listLoading = true
      selectGridListNew(this.searchForm).then(response => {
        let arr = []
        if (response && response.length) { // 过滤id相同的元素
          arr = response.filter((element, index, self) => {
            return self.findIndex(el => el.id === element.id) === index
          })
        }
        this.list = arr
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    load(row, treeNode, resolve) {
      const postData = { 'pid': row.id }
      selectGridListNew(postData).then(response => {
        let arr = []
        if (response && response.length) { // 过滤id相同的元素
          arr = response.filter((element, index, self) => {
            return self.findIndex(el => el.id === element.id) === index
          })
        }
        resolve(arr)
      }).catch(() => {
      })
    },
    refreshTreeChid(id) {
      // const refreshId = id || this.$store.getters.token.gridId
      // const postData = { 'pid': refreshId }
      this.getList()
      // selectGridListNew(postData).then(response => {
      //   let arr = []
      //   if (response && response.length) { // 过滤id相同的元素
      //     arr = response.filter((element, index, self) => {
      //       return self.findIndex(el => el.id === element.id) === index
      //     })
      //   }
      //   this.$set(this.$refs.myTable.store.states.lazyTreeNodeMap, id, arr)
      // }).catch(() => {
      // })
    },
    handelAdd(e, row) {
      this.dialogType = e
      this.visible = true
      this.title = '添加组织'
    },
    handelMove(e, row) {
      this.dialogType = e
      this.moveVisible = true
      this.title = '组织迁移'
    },
    handleDelete(row) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const postData = { 'id': row.id }
        deleteGrid(postData).then(response => {
          this.refreshTreeChid(row.pid)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.layoutFlex {
  display: flex;
  align-items: center;
}
.lampIcon {
  width: 20px;
  height: 20px;
  margin-right: 3px;
}
</style>
