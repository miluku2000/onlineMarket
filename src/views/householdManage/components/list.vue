<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button type="primary" icon="el-icon-edit" @click="showDialog('add')">
        添加人员
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      node-key="id"
      highlight-current-row
      style="width: 100%;"
      :cell-style="cellStyle"
    >
      <el-table-column label="身份证号">
        <template slot-scope="{row}">
          <span>{{ row.idCard }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="关系">
        <template slot-scope="{row}">
          <span>{{ row.relationship|relationshipDic }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单位/职务">
        <template slot-scope="{row}">
          <span>{{ row.company+'/'+row.job }}</span>
        </template>
      </el-table-column>
      <el-table-column label="特殊身份">
        <template slot-scope="{row}">
          <span v-for="item in row.labelSOS" :key="item.id">
            <img class="tableListIcon" :src="item.labelIcon">
          </span>
        </template>
      </el-table-column>
      <el-table-column label="街道标准股">
        <template slot-scope="{row}">
          <span>{{ row.land + row.population }}</span>
        </template>
      </el-table-column>
      <el-table-column label="街道人口股">
        <template slot-scope="{row}">
          <span>{{ row.population }}</span>
        </template>
      </el-table-column>
      <el-table-column label="街道土地股">
        <template slot-scope="{row}">
          <span>{{ row.land }}</span>
        </template>
      </el-table-column>
      <el-table-column label="村内统计股">
        <template slot-scope="{row}">
          <span>{{ row.landTime + row.populationTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="村内人口股">
        <template slot-scope="{row}">
          <span>{{ row.populationTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="村内土地股">
        <template slot-scope="{row}">
          <span>{{ row.landTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="{row}">
          <span>{{ row.userStatus|statusDic }}</span>
        </template>
      </el-table-column>
    </el-table>
    <myChildDialog ref="myChildDialog" :title="title" :operate-type="operateType" :visible.sync="visible" @getList="getList($event)" />
    <yearEdit ref="yearEdit" :title="title" :visible.sync="visible2" @getList="getList($event)" />
    <setHouseholderDialog ref="setHouseholderDialog" :title="title" :visible.sync="visible1" @getList="getList($event)" />
  </div>
</template>

<script>
import { fetchDetailsList, deleteUserHousehold, evacuateUserHousehold } from '@/api/householdManage'
import MyChildDialog from './childDialog'
import YearEdit from './yearEdit'
import SetHouseholderDialog from './setHouseholderDialog'
export default {
  name: 'ComplexTable',
  components: { MyChildDialog, SetHouseholderDialog, YearEdit },
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      title: '',
      operateType: '',
      dialogType: '',
      visible: false,
      visible1: false,
      visible2: false,
      householderId: '', // 户主的id
      list: [],
      total: 0,
      listLoading: true,
      searchForm: {
        name1: '',
        page: 1,
        limit: 20
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (column.label === '村内统计股') {
        return 'background: #42b983;color:white'
      } else if (column.label === '街道标准股') {
        return 'background: #42b983;color:white'
      }
    },
    toEventManage() {
      this.$router.push({ name: 'eventManage', params: { name: this.name }})
    },
    getList() {
      const id = this.$route.params && this.$route.params.id
      this.listLoading = true
      fetchDetailsList(id).then(response => {
        this.list = response
        this.list.map(item => {
          if (item.relationship === '1') {
            this.householderId = item.id
          }
        })
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handelYear(e, row) {
      this.dialogType = e
      this.visible2 = true
      this.title = '股权录入'
      this.$nextTick(() => {
        this.$refs.yearEdit.fetchData(row.id)
      })
    },
    showDialog(e, row) {
      this.operateType = e
      this.visible = true
      this.title = '添加人员'
      if (e === 'edit') {
        this.title = '编辑人员'
        this.$nextTick(() => {
          this.$refs.myChildDialog.fetchData(row)
        })
      } else {
        this.$refs.myChildDialog.fetchData()
      }
    },
    handleDelete(e) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const postData = { householdUserId: e.id }
        deleteUserHousehold(postData).then(response => {
          this.getList()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        })
      }).catch(() => {
      })
    },
    handleMoveAway(e) {
      this.$confirm('是否确认搬离?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const postData = { householdUserId: e.id }
        evacuateUserHousehold(postData).then(response => {
          this.getList()
          this.$message({
            message: '操作成功',
            type: 'success'
          })
        })
      }).catch(() => {
      })
    },
    setHeadHousehold(row) {
      const data = { 'householdUserId': row.id, 'oldHouseholdUserId': this.householderId }
      this.$refs.setHouseholderDialog.fetchData(data)
      this.visible1 = true
    }
  }
}
</script>
<style scoped>
.tableListIcon {
  width: 15px;
  height: 15px;
}
.blue {
  color: #1890ff;
  cursor: pointer;
}
.greenClass{
    background: red;
}
</style>
