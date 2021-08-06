<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :destroy-on-close="true" :before-close="closeDialog" width="80%">
    <el-form ref="form" :model="form" :rules="rules" label-position="top">
      <el-row>
        <el-col :span="10">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="姓名" />
          </el-form-item>
          <el-form-item label="身份证号" prop="idCard">
            <el-input v-model="form.idCard" placeholder="身份证号" />
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="form.mobile" placeholder="手机号" />
          </el-form-item>
          <el-form-item label="工作单位" prop="company">
            <el-input v-model="form.company" placeholder="工作单位" />
          </el-form-item>
          <el-form-item label="职务" prop="job">
            <el-input v-model="form.job" placeholder="职务" />
          </el-form-item>
          <el-form-item label="与户主关系" prop="relationship">
            <el-select v-model="form.relationship" placeholder="选择与户主关系">
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
          <el-form-item label="村内人口股" prop="populationTime">
            <el-input v-model="form.populationTime" placeholder="村内人口股" @change="changeInput" />
          </el-form-item>
          <el-form-item label="村内土地股" prop="landTime">
            <el-input v-model="form.landTime" placeholder="村内土地股" @change="changeInput2" />
          </el-form-item>
          <el-form-item label="街道人口股" prop="population">
            <el-input v-model="form.population" :disabled="true" placeholder="街道人口股" />
          </el-form-item>
          <el-form-item label="街道土地股" prop="land">
            <el-input v-model="form.land" :disabled="true" placeholder="街道土地股" />
          </el-form-item>
          <el-form-item label="状态" prop="userStatus">
            <el-select v-model="form.userStatus" placeholder="选择状态">
              <el-option label="在户" value="1" />
              <el-option label="外出务工" value="2" />
              <el-option label="搬离" value="3" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10" :offset="4">
          <el-form-item label="特殊身份：" prop="labelIds">
            <el-checkbox-group v-model="form.labelIds">
              <el-checkbox v-for="item in labelList" :key="item.id" class="fggCheckboxWarp" :label="item.id" border>
                <div class="fggCheckboxItem">
                  <img class="checkboxIcon" :src="item.labelIcon">
                  <span>{{ item.labelName }}</span>
                </div>
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
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
import { checkPhoneNumber, checkIdNum } from '@/utils/rules'
import { fetchList } from '@/api/labelManage'
import { addUserHousehold, updateUserHousehold } from '@/api/householdManage'
export default {
  name: 'MyChildDialog',
  components: { },
  props: {
    title: {
      type: String,
      default: ''
    },
    operateType: {
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
        name: '',
        idCard: '',
        mobile: '',
        company: '',
        job: '',
        relationship: '',
        userStatus: '',
        local: '',
        population: '',
        land: '',
        populationTime: '',
        landTime: '',
        labelIds: []
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        idCard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { validator: checkIdNum, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhoneNumber, trigger: 'blur' }
        ],
        populationTime: [
          { required: true, message: '请输入村内人口股', trigger: 'blur' }
        ],
        landTime: [
          { required: true, message: '请输入村内土地股', trigger: 'blur' }
        ],
        relationship: [
          { required: true, message: '请选择户主关系', trigger: 'change' }
        ],
        userStatus: [
          { required: true, message: '请选择状态', trigger: 'change' }
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
    changeInput() {
      this.form.population = (Number(this.form.populationTime) / 76).toFixed(2)
    },
    changeInput2() {
      console.log(this.form.landTime)
      this.form.land = (Number(this.form.landTime) / 34).toFixed(2)
    },
    fetchData(data) {
      const searchForm = { 'pageNum': 1, 'pageSize': 9999 }
      fetchList(searchForm).then(response => {
        this.labelList = response.list
        if (data) {
          const newData = deepClone(data)
          const labelIds = []
          if (newData.labelSOS && newData.labelSOS.length > 0) {
            newData.labelSOS.map(item => {
              labelIds.push(item.labelId)// 后台暂未添加labelId
            })
          }
          newData.labelIds = labelIds
          this.form = newData
        }
      })
    },
    getSelectTreeValue(value) {
      this.form.administrativeId = value
    },
    getSelectTreetData(data) {},
    submitForm(formData) {
      if (this.operateType === 'edit') {
        formData.householdUserId = formData.id
        formData.isExist = false
        updateUserHousehold(formData).then(response => {
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
      } else {
        const id = this.$route.params && this.$route.params.id
        formData.householdId = id
        formData.isExist = false
        addUserHousehold(formData).then(response => {
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
    },
    handeSubmit() {
      const formData = deepClone(this.form)
      formData.userId = this.$store.getters.token['x-ysmall-user-id']
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.btnLoading = true
          // checkHouseUser(formData.idCard).then(response => {
          //   formData.isExist = response.isExist
          //   if (response.isExist) {
          //     formData.otherHouseholdUserId = response.householdUserId || ''
          //     const address = response.administrativeTownName + '-' + response.administrativeVillageName + '-' + response.administrativeBlockName
          //     const messageText = '该身份证号住户已经登记于：' + address + '户内是否移入该户登记，移入后原户内状态改为搬离'
          //     this.$confirm(messageText, '提示', {
          //       confirmButtonText: '确认',
          //       cancelButtonText: '取消',
          //       type: 'warning'
          //     }).then(() => {
          //       this.submitForm(formData)
          //     }).catch(() => {
          //       this.btnLoading = false
          //     })
          //   } else {
          //     this.submitForm(formData)
          //   }
          // })
          if (this.operateType === 'edit') {
            this.submitForm(formData)
          } else {
            this.$confirm('身份证号提交后不可更改', '提示', {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.submitForm(formData)
            }).catch(() => {
              this.btnLoading = false
            })
          }
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
.fggCheckboxWarp {
  min-width: 150px;
}
.el-checkbox-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.fggCheckboxItem {
  display: flex;
  align-items: center;
}
.fggCheckboxItem .checkboxIcon {
  width: 30px;
  height: 30px;
  margin-right: 8px;
}
.el-checkbox.is-bordered.el-checkbox--medium {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-right: 0;
}
.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0;
}
</style>
