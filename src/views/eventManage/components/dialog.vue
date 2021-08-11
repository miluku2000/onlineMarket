<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :destroy-on-close="true" :before-close="closeDialog" width="40%">
      <el-row>
        <el-col :span="20">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="活动名称:" prop="name">
              <el-input v-model="form.name" placeholder="活动名称" />
            </el-form-item>
            <el-form-item label="活动时间：" prop="date">
              <el-date-picker v-model="form.date" placeholder="活动时间" />
            </el-form-item>
            <el-form-item label="活动地点：" prop="direction">
              <el-cascader v-model="form.direction" size="large" :options="options" @change="handleChange" />
            </el-form-item>
            <el-form-item v-model="form.img" label="宣传图：" prop="img">
              <el-upload
                action="/management/f/ysmall/images/uploadImage"
                :headers="headersObj"
                list-type="picture-card"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :data="dict"
              >
                <img v-if="form.img" :src="form.img" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
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
  </div>
</template>

<script>
// import { fetchDetails, insertLabel, updateLabel } from '@/api/labelManage'
import { getToken } from '@/utils/auth'
import { regionData } from 'element-china-area-data'

export default {
  name: 'MyDialog',
  components: {},
  userIndex: 0,
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
        name: '',
        date: '',
        direction: '',
        img: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ],
        direction: [
          { required: true, message: '请选择地点', trigger: 'change' }
        ],
        img: [
          { required: true, message: '上传图片', trigger: 'blur' }
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
  created() {},
  methods: {
    handleChange(value) {
      console.log(value)
      this.form.direction = value
    },
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
      this.form = {
        name: '',
        date: '',
        direction: '',
        img: ''
      }
      this.dialogVisible = false
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
