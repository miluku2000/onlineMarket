<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="searchForm" :inline="true" :model="searchForm" label-width="100px">
        <el-form-item>
          <el-button type="primary" icon="el-icon-edit" @click="handelAdd('add')">
            添加标签
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="标签编号">
        <template slot-scope="{row}">
          <span>{{ row.labelNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标签名称">
        <template slot-scope="{row}">
          <span>{{ row.labelName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标签图标">
        <template slot-scope="{row}">
          <img class="tableListIcon" :src="row.labelIcon">
        </template>
      </el-table-column>
      <el-table-column label="标签排序">
        <template slot-scope="{row}">
          <span>{{ row.sort }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="{row}">
          <span>{{ row.createTime|parseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handelAdd('edit',row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="searchForm.pageNum" :limit.sync="searchForm.pageSize" @pagination="getList" />
    <myDialog ref="myDialog" :title="title" :visible.sync="visible" :type="dialogType" @getList="getList($event)" />
  </div>
</template>

<script>
import { fetchList, deleteLabel } from '@/api/labelManage'
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
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
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
      this.title = '添加标签'
      if (e === 'edit') {
        this.title = '编辑标签'
        this.$nextTick(() => {
          this.$refs.myDialog.fetchData(row.id)
        })
      }
    },
    handleDelete(row) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const postData = { 'id': row.id, 'memberType': this.$store.getters.token.memberType }
        deleteLabel(postData).then(response => {
          this.getList()
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
.tableListIcon {
  width: 40px;
  height: 40px;
}
</style>
