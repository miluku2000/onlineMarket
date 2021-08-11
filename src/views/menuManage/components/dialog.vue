<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :destroy-on-close="true" :before-close="closeDialog">
    <el-row>
      <el-col :span="20">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="form.name" placeholder="菜单名称" />
          </el-form-item>
          <el-form-item label="菜单id" prop="phone">
            <el-input v-model="form.id" placeholder="菜单id" />
          </el-form-item>
          <el-form-item label="菜单介绍" prop="idcard">
            <el-input v-model="form.intro" placeholder="菜单介绍" />
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
</template>
<script>

import { addHousehold } from '@/api/householdManage'
import { fetchChidList } from '@/api/administrativeManage'
import { selectGridListNew } from '@/api/gridManage'
import { deepClone } from '../../../utils'
export default {
  name: 'MyDialog',
  props: {
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    intro: {
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
      props: { // 配置项（必选）
        value: 'id',
        label: 'adminName',
        children: 'children',
        isLeaf: function(data, node) {
          return data.adminType > 2
        }
      },
      props2: { // 配置项（必选）
        value: 'id',
        label: 'gridName',
        children: 'childrenSOs'
      },
      form: {
        name: '',
        if: '',
        intro: ''
      },
      searchTreeForm: {
        memberType: this.$store.getters.token.memberType,
        id: this.$store.getters.token.administrativeId
      },
      searchTreeForm2: {
        gridNumber: '',
        userId: this.$store.getters.token['x-ysmall-user-id']
      },
      rules: {
        name: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ],
        id: [
          { required: true, message: '请输入菜单id', trigger: 'blur' }
        ],
        intro: [
          { required: true, message: '请输入菜单介绍', trigger: 'blur' }
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
  created() {
    this.getTreeList()
    this.getTreeList2()
  },
  methods: {
    getTreeList2() {
      selectGridListNew(this.searchTreeForm2).then(response => {
        let arr = []
        if (response && response.length) { // 过滤id相同的元素
          arr = response.filter((element, index, self) => {
            return self.findIndex(el => el.id === element.id) === index
          })
        }
        this.options2 = arr
      }).catch(() => {
      })
    },
    fetchData(row) {
      this.form.administrativeId = row.id
      this.form.administrativeName = row.village + '-' + row.building
    },
    setMyData(data) {
      const myData = deepClone(data)
      this.form.administrativeId = myData.id
      this.form.administrativeName = myData.village + '-' + myData.building
    },
    getTreeList() {
      fetchChidList(this.searchTreeForm).then(response => {
        this.options = response
      }).catch(() => {})
    },
    getSelectTreeValue(value) {
      this.form.administrativeId = value
    },
    getSelectTreetData(data) {},
    getSelectTreeValue2(value) {
      this.form.gridId = value
    },
    getSelectTreetData2(data) {},
    handeSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.btnLoading = true
          addHousehold(this.form).then(response => {
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
      console.log(this.form)
      this.form = {
        name: '',
        if: '',
        intro: ''
      }
      this.form.administrativeId = ''
      this.dialogVisible = false
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style scoped>
</style>
