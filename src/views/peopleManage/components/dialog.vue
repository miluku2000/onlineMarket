<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :destroy-on-close="true" :before-close="closeDialog">
    <el-row>
      <el-col :span="20">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="姓名" />
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone" placeholder="手机号" />
          </el-form-item>
          <el-form-item label="身份证号" prop="id">
            <el-input v-model="form.id" placeholder="身份证" />
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" placeholder="请选择性别">
              <el-option label="男" value="1" />
              <el-option label="女" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="地址" prop="name">
            <el-input v-model="form.address" placeholder="地址" />
          </el-form-item>
        
        </el-form>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">
        确认
      </el-button>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">
        取消
      </el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import { fetchDetails, insertLabel, updateLabel } from '@/api/labelManage'
import { getToken } from '@/utils/auth'
import { regionData } from 'element-china-area-data'

export default {
  name: 'MyDialog',
  components: {},
  userIndex:0,
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
      options: regionData,
      selectedOptions: [],
      headersObj: {
        'x-ysmall-session-id': getToken()['x-ysmall-session-id'],
        'x-ysmall-user-id': getToken()['x-ysmall-user-id']
      },
      btnLoading: false,
      dict: {
        dict: 'NORMAL_PIC'
      },
      dialogImgVisible: false,
       form: {
        phone: '',
        address: '',
        sex: '',
        id: '',
        name: ''
      },
      userIndex:0,
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        id: [
          { required: true, message: '请输入身份证号', trigger: 'blur' }
        ]
      },
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
    methods: {
      handleChange (value) {
       
        console.log(value)
      }
    },
    // fetchData(id) {
    //   const postData = { 'id': id }
    //   fetchDetails(postData).then(response => {
    //     this.form = response
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.form.labelIcon = res.fullUrl
    },

    handeSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.btnLoading = true
          this.form.memberType = this.$store.getters.token.memberType
          if (this.type === 'edit') {
            // updateLabel(this.form).then(response => {
            //   this.btnLoading = false
            //   this.$emit('getList', null)
            //   this.closeDialog()
            //   this.$message({
            //     message: '操作成功',
            //     type: 'success'
            //   })
            // }).catch(() => {
            //   this.btnLoading = false
            // })
          } else {
            // insertLabel(this.form).then(response => {
            //   this.btnLoading = false
            //   this.$emit('getList', null)
            //   this.closeDialog()
            //   this.$message({
            //     message: '操作成功',
            //     type: 'success'
            //   })
            // }).catch(() => {
            //   this.btnLoading = false
            // })
          }
        }
      })
    },
    closeDialog() {
      this.dialogVisible = false
      this.form={
        phone: '',
        address: '',
        sex: '',
        id: '',
        name: ''
      },
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style scoped>
.avatar {
  width: 144px;
  height: 144px;
}
</style>
