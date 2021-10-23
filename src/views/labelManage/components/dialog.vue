<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" :destroy-on-close="true" :before-close="closeDialog" width="40%">
      <el-row>
        <el-col :span="20">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="标签编号：" prop="labelNumber">
              <el-input v-model="form.labelNumber" placeholder="标签编号" />
            </el-form-item>
            <el-form-item label="标签名称：" prop="labelName">
              <el-input v-model="form.labelName" placeholder="标签名称" />
            </el-form-item>
            <el-form-item label="标签图标：" prop="labelIcon">
              <el-upload
                action="/management/f/ysmall/images/uploadImage"
                :headers="headersObj"
                list-type="picture-card"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :data="dict"
              >
                <img v-if="form.labelIcon" :src="form.labelIcon" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
            <el-form-item label="标签排序：" prop="sort">
              <el-input v-model="form.sort" placeholder="标签排序" />
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
    <el-dialog :visible.sync="dialogImgVisible">
      <img width="100%" :src="form.labelIcon" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { fetchDetails, insertLabel, updateLabel } from '@/api/labelManage'
import { getToken } from '@/utils/auth'
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
        labelNumber: '',
        labelName: '',
        labelIcon: '',
        sort: ''
      },
      rules: {
        labelNumber: [
          { required: true, message: '请输入标签编号', trigger: 'blur' }
        ],
        labelName: [
          { required: true, message: '请输入标签名称', trigger: 'blur' }
        ],
        labelIcon: [
          { required: true, message: '请上传标签图标', trigger: 'change' }
        ],
        sort: [
          { required: true, message: '请输入标签排序', trigger: 'blur' }
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
    fetchData(id) {
      const postData = { 'id': id }
      fetchDetails(postData).then(response => {
        this.form = response
      }).catch(err => {
        console.log(err)
      })
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.form.labelIcon = res.fullUrl
    },
    // handleRemove(file, fileList) {
    //   this.form.labelIcon = ''
    // },
    // handlePictureCardPreview(file) {
    //   this.form.labelIcon = file.url
    //   this.dialogImgVisible = true
    // },
    handeSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.btnLoading = true
          this.form.memberType = this.$store.getters.token.memberType
          if (this.type === 'edit') {
            updateLabel(this.form).then(response => {
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
            insertLabel(this.form).then(response => {
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
.avatar {
  width: 144px;
  height: 144px;
}
</style>
