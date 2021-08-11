<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="searchForm" :inline="true" :model="searchForm" label-width="100px">
        <el-form-item prop="id">
          <el-input v-model="searchForm.idCard" placeholder="输入身份证号" />
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="searchForm.userName" placeholder="输入人员姓名" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="submitSearchForm('searchForm')">搜索</el-button>
          <el-button @click="resetSearchForm('searchForm')">重置</el-button>
          <el-button type="primary" icon="el-icon-edit" @click="handelAdd('add')">
            新增人员
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <el-table
        :key="tableKey"
        :data="tableData"
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="序号"><template slot-scope="scope"> {{ scope.$index + 1 }} </template></el-table-column>

        <el-table-column type="selection" width="50" />
        <el-table-column label="姓名" prop="name" />
        <el-table-column label="手机号" prop="phone" />
        <el-table-column label="身份证号" prop="id" />
        <el-table-column label="性别" prop="sex" />
        <el-table-column label="地址" prop="address" />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editUser(scope.row,scope.$index)">
              编辑
            </el-button>
            <el-button type="warning" size="mini">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="searchForm.pageNum" :limit.sync="searchForm.pageSize" />
    </el-row>
    <myDialog ref="myDialog" :title="title" :visible.sync="visible" :type="dialogType" />
  </div>
</template>

<script>
// import { fetchList, deleteLabel } from '@/api/labelManage'
import Pagination from '@/components/Pagination'
import MyDialog from './components/dialog'
export default {
  name: 'LabelManage',
  components: { Pagination, MyDialog },
  data() {
    return {
      'tableData': [
        {
          'name': '胡图图',
          'phone': '12345678901',
          'id': '320682200007130502',
          'sex': '男',
          'address': '翻斗大街翻斗花园二号楼1001室'
        },
        {
          'name': '胡英俊',
          'phone': '12345678901',
          'id': '320682200007130503',
          'sex': '男',
          'address': '翻斗大街翻斗花园二号楼1001室'
        },
        {
          'name': '张小丽',
          'phone': '12345678901',
          'id': '320682200007130504',
          'sex': '女',
          'address': '翻斗大街翻斗花园二号楼1001室'
        }
      ],
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
      }
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
        phone: item.phone,
        id: item.id,
        sex: item.sex,
        address: item.address
      }
      this.dialogType = 'edit'
      this.title = '编辑人员'
      this.visible = true
    },
    handelAdd(e, row) {
      this.dialogType = e
      this.visible = true
      this.title = '添加人员'
    }
  }
}
</script>
<style lang='scss' scoped>
.tableListIcon {
  width: 40px;
  height: 40px;
}
</style>
