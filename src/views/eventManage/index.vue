<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="searchForm" :inline="true" :model="searchForm" label-width="100px">
        <el-form-item>
          <el-button type="primary" icon="el-icon-edit" @click="handelAdd('add')">
            添加活动
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      :key="tableKey"
      :data="tableData"
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="序号"><template slot-scope="scope"> {{ scope.$index + 1 }} </template></el-table-column>
      <el-table-column label="活动名称" prop="name" />
      <el-table-column label="时间" prop="date" />
      <el-table-column label="地点" prop="direction" />
      <el-table-column label="宣传图" prop="img">
        <template slot-scope="scope"><img :src="scope.row.img" width="100px" height="100px"></template>
      </el-table-column>
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
// import { fetchList, deleteLabel } from '@/api/labelManage'
import Pagination from '@/components/Pagination'
import MyDialog from './components/dialog'
export default {
  name: 'LabelManage',
  components: { Pagination, MyDialog },
  data() {
    return {
      tableData: [{
        name: '营销',
        direction: '北京市/市辖区/东城区',
        date: '2021/3/4',
        img: 'https://masutaa-1257630833.cos.ap-shanghai.myqcloud.com/yashi/img/developer/worker.png'
      }],
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
    // this.getList()
  },
  methods: {
    editUser(item, idx) {
      console.log(item.name)
      this.userIndex = idx
      this.$refs.myDialog.form = {
        name: item.name,
        date: item.date,
        direction: item.direction,
        img: item.img
      }
      this.title = '编辑活动'
      this.dialogType = 'edit'
      this.visible = true
    },
    handelAdd(e, row) {
      this.dialogType = e
      this.visible = true
      this.title = '添加活动'
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
