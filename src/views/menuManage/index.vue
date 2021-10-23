<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="searchForm" :inline="true" :model="searchForm" label-width="100px">
        <el-form-item>
          <el-button type="primary" icon="el-icon-edit" @click="handelAdd('add')">
            添加菜单
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column v-if="false" label="序号"><template slot-scope="scope"> {{ scope.$index + 1 }} </template></el-table-column>

      <el-table-column
        prop="name"
        label="菜单名称"
        width="180"
      />
      <el-table-column
        prop="id"
        label="菜单id"
        width="180"
      />
      <el-table-column
        prop="intro"
        label="菜单介绍"
      />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editUser(scope.row,scope.$index)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="searchForm.pageNum" :limit.sync="searchForm.pageSize" />
    <myDialog ref="myDialog" :title="title" :visible.sync="visible" :type="dialogType" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import MyDialog from './components/dialog'
export default {
  name: 'LabelManage',
  components: { Pagination, MyDialog },
  data() {
    return {
      title: '',
      dialogType: '',
      visible: false,
      visible1: false,
      expands: [2],
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      searchForm: {
        pageNum: 1,
        pageSize: 10
      },
      tableData: [{
        id: 1,
        name: '一级菜单',
        intro: '......'
      }, {
        id: 2,
        name: '一级菜单',
        intro: '......'
      }, {
        id: 3,
        name: '一级菜单',
        intro: '......',
        hasChildren: true
      }, {
        id: 4,
        name: '一级菜单',
        intro: '......'
      }]
    }
  },
  created() {
  },
  methods: {
    editUser(item, idx) {
    // console.log(item);
      this.userIndex = idx
      this.$refs.myDialog.form = {
        name: item.name,
        id: item.id,
        intro: item.intro
      }
      this.dialogType = 'edit'
      this.title = '编辑活动'
      this.visible = true
    },
    handelAdd(e, row) {
      this.dialogType = e
      this.visible = true
      this.title = '添加活动'
    },
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            name: '二级菜单',
            intro: '......'
          }, {
            id: 32,
            name: '二级菜单',
            intro: '......'
          }
        ])
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
.tableListIcon {
  width: 40px;
  height: 40px;
}
</style>
