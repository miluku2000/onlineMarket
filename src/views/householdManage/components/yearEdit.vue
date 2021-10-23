<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :destroy-on-close="true" :before-close="closeDialog" width="50%">
    <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" @click="addRow(infiledList)">添加</el-button>
    <el-table :data="infiledList">
      <el-table-column prop="beginTime" label="落户时间" style="width: 200px;">
        <template slot-scope="scope">
          <el-date-picker
            v-model="scope.row.beginTime"
            style="width: 170px;"
            type="date"
            placeholder="请选择日期"
            :editable="false"
            value-format="yyyy-MM-dd"
          />
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="迁出时间" style="display: block;margin-left: 10%; width: 200px;">
        <template slot-scope="scope">
          <el-date-picker
            v-model="scope.row.endTime"
            style="width: 170px;"
            type="date"
            placeholder="请选择日期"
            :editable="false"
            value-format="yyyy-MM-dd"
          />
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">
        取消
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import { fetchDetails2, setShares } from '@/api/householdManage.js'
import { getToken } from '@/utils/auth'
export default {
  name: 'YearEdit',
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      headersObj: {
        'x-ysmall-session-id': getToken()['x-ysmall-session-id'],
        'x-ysmall-user-id': getToken()['x-ysmall-user-id']
      },
      btnLoading: false,
      id: '',
      infiledList: []
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val) // dialogVisible改变的时候通知父组件
      }
    }
  },
  created() {},
  methods: {
    // 可追加的模块
    deleteRow(index, rows) { // 删除改行
      rows.splice(index, 1)
    },
    addRow(tableData, event) {
      tableData.push({
        beginTime: '',
        endTime: ''
      })
    },
    fetchData(id) {
      var that = this
      that.id = id
      const postData = { 'userId': id }
      fetchDetails2(postData).then(response => {
        that.infiledList = response
      }).catch(err => {
        console.log(err)
      })
    },
    handeSubmit() {
      this.btnLoading = true
      const postData = {
        'userId': this.id,
        'time': this.infiledList
      }
      console.log(postData)
      setShares(postData).then(response => {
        this.btnLoading = false
        this.$emit('getList', null)
        this.closeDialog()
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      }).catch(() => {
        this.btnLoading = false
      })
    },
    closeDialog() {
      this.dialogVisible = false
      // this.$refs.form.resetFields()
      this.infiledList = []
    }
  }
}
</script>

