<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :destroy-on-close="true" :before-close="closeDialog">
    <el-row>
      <el-col :span="20">
        <el-form ref="form" :model="form" :rules="rules" label-width="150px">
          <el-form-item v-if="type==='add'" label="行政区域：" prop="administrativeId">
            <el-select v-model="form.administrativeId" placeholder="请选择行政区域" :disabled="type!=='add'||memberType>1" @change="toSelect()">
              <el-option v-for="item in options2" :key="item.id" :label="item.adminName" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item v-else label="行政区域：" prop="village">
            <el-input v-model="form.village" placeholder="行政区域" :disabled="true" />
          </el-form-item>
          <!-- <el-form-item v-if="form.administrativeId" label="组织类型：" prop="gridType">
            <el-select v-model="form.gridType" placeholder="请选择组织类型" :disabled="type!=='add'">
              <el-option v-if="memberType<3" label="村" :value="3" />
              <el-option label="小组" :value="4" />
            </el-select> -->
          </el-form-item>
          <el-form-item v-if="form.gridType&&form.gridType!==1" label="上级组织：" prop="pid">
            <el-select v-model="form.pid" placeholder="请选择上级组织" :disabled="type!=='add'">
              <el-option v-for="item in options" :key="item.id" :label="item.gridName" :value="item.id" />
            </el-select>
          </el-form-item>

          <el-form-item v-if="form.gridType&&form.gridType===3" label="土地股开始时间：" prop="landBegin">
            <el-date-picker
              v-model="form.landBegin"
              style="width: 170px;"
              type="date"
              placeholder="请选择日期"
              :editable="false"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
          <el-form-item v-if="form.gridType&&form.gridType===3" label="土地股结束时间：" prop="landEnd">
            <el-date-picker
              v-model="form.landEnd"
              style="width: 170px;"
              type="date"
              placeholder="请选择日期"
              :editable="false"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
          <el-form-item v-if="form.gridType&&form.gridType===3" label="人口股开始时间：" prop="populationBegin">
            <el-date-picker
              v-model="form.populationBegin"
              style="width: 170px;"
              type="date"
              placeholder="请选择日期"
              :editable="false"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
          <el-form-item v-if="form.gridType&&form.gridType===3" label="人口股结束时间：" prop="populationEnd">
            <el-date-picker
              v-model="form.populationEnd"
              style="width: 170px;"
              type="date"
              placeholder="请选择日期"
              :editable="false"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>

          <el-form-item v-if="form.gridType&&form.gridType===3" label="交易次数：" prop="transaction">
            <el-input v-model="form.transaction" placeholder="交易次数" />
          </el-form-item>
          <el-form-item label="机构代码：" prop="gridNumber">
            <el-input v-model="form.gridNumber" placeholder="机构代码" />
          </el-form-item>
          <el-form-item label="机构名称：" prop="gridName">
            <el-input v-model="form.gridName" placeholder="机构名称" maxlength="30" show-word-limit />
          </el-form-item>
          <el-form-item label="备注：" prop="remark">
            <el-input v-model="form.remark" type="textarea" maxlength="450" show-word-limit placeholder="输入备注信息" :autosize="{ minRows: 4, maxRows: 8}" />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">
        取消
      </el-button>
    </div>
  </el-dialog>
</template>

<script>

import { selectGridList, insertGrid, selectAdministrativeListByGrid } from '@/api/gridManage'
export default {
  name: 'MyDialog',
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
      btnLoading: false,
      memberType: this.$store.getters.token.memberType,
      form: {
        pid: '',
        pidName: '',
        gridType: '',
        gridNumber: '',
        memberType: this.$store.getters.token.memberType,
        administrativeId: '', // this.$store.getters.token.administrativeId,
        gridName: '',
        village: '',
        remark: '',
        assets: '',
        dividends: '',
        transaction: '',
        landBegin: '',
        landEnd: '',
        populationBegin: '',
        populationEnd: ''
      },
      rules: {
        pid: [
          { required: true, message: '请选择上级组织', trigger: 'change' }
        ],
        gridType: [
          { required: true, message: '请选择组织类型', trigger: 'change' }
        ],
        gridNumber: [
          { required: true, message: '请输入机构代码', trigger: 'blur' }
        ],
        gridName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ],
        assets: [
          { required: true, message: '请输入村资产', trigger: 'blur' }
        ],
        dividends: [
          { required: true, message: '请输入村分红', trigger: 'blur' }
        ],
        administrativeId: [
          { required: true, message: '请输入行政区域', trigger: 'change' }
        ],
        landBegin: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
        landEnd: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
        populationBegin: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ],
        populationEnd: [
          { required: true, message: '请选择日期', trigger: 'blur' }
        ]
      },
      // 数据列表
      options: [],
      options2: []
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
  watch: {
    $route(to, from) {
      this.getTreeList2()
    },
    'form.gridType'(newValue, oldValue) {
      if (this.dialogVisible && newValue !== 1) {
        if (this.type === 'add') {
          this.form.pid = ''
        }
        this.getTreeList()
      }
    }
  },
  created() {
    this.getTreeList2()
    if (this.memberType > 1) { // 如果登录得是镇管理以下,新增组织不能修改行政区域
      this.form.administrativeId = this.$store.getters.token.administrativeId
    }
  },
  methods: {
    toSelect() {
      this.form.gridType = ''
      this.form.pid = ''
      this.options = []
    },
    getTreeList2() {
      this.listLoading = true
      const postData = { administrativeId: this.$store.getters.token.administrativeId, memberType: this.$store.getters.token.memberType }
      selectAdministrativeListByGrid(postData).then(response => {
        this.options2 = response.list
      }).catch(() => {})
    },
    getTreeList() {
      this.listLoading = true
      selectGridList({ gridType: this.form.gridType, adminType: this.$store.getters.token.memberType, gridId: this.$store.getters.token.gridId, administrativeId: this.form.administrativeId }).then(response => {
        this.options = response.list
      }).catch(() => {})
    },
    fetchData(data) {
      console.log(data)
      this.form.village = data.village
      this.form.gridType = data.gridType + 1
      this.form.pid = data.id
      this.form.administrativeId = data.administrativeId
    },
    handeSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.btnLoading = true
          if (this.form.pid) {
            let obj = {}
            obj = this.options.find((item) => {
              return item.id === this.form.pid
            })
            this.form.pidName = obj.gridName
          }
          insertGrid(this.form).then(response => {
            this.btnLoading = false
            this.$emit('getList', this.form.pid)
            this.closeDialog()
            this.$message({
              message: '操作成功',
              type: 'success'
            })
          }).catch(() => {
            this.btnLoading = false
          })
        }
      })
    },
    closeDialog() {
      this.dialogVisible = false
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style scoped>
</style>
