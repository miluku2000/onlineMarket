<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :destroy-on-close="true" :before-close="closeDialog" width="35%">
    <el-form ref="form" :model="form" :rules="rules" label-position="top">
      <el-form-item v-if="form.oldHouseholdUserId" label="" prop="relationship">
        <el-select v-model="form.relationship" placeholder="原户主与新户主的关系">
          <el-option label="户主" value="1" />
          <el-option label="配偶" value="2" />
          <el-option label="子女" value="3" />
          <el-option label="租客" value="4" />
          <el-option label="父母" value="5" />
          <el-option label="亲属" value="6" />
          <el-option label="对象" value="7" />
          <el-option label="朋友" value="8" />
          <el-option label="孙子女" value="9" />
          <el-option label="兄弟" value="10" />
        </el-select>
      </el-form-item>
      <div v-else>是否确认设为户主？</div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="btnLoading" @click="handeSubmit">
        确认
      </el-button>
      <el-button @click="closeDialog">
        取消
      </el-button>
    </div>
  </el-dialog>
</template>

<script>

import { deepClone } from '@/utils'
import { setHouseholder } from '@/api/householdManage'
export default {
  name: 'MyChildDialog',
  components: { },
  props: {
    title: {
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
      labelList: [],
      form: {
        oldHouseholdUserId: '',
        householdUserId: '',
        relationship: ''
      },
      rules: {
        relationship: [
          { required: true, message: '请选择原户主与新户主的关系', trigger: 'change' }
        ]
      }
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
  methods: {
    fetchData(data) {
      this.form = data
    },
    handeSubmit() {
      const formData = deepClone(this.form)
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.btnLoading = true
          setHouseholder(formData).then(response => {
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
