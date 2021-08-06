<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :destroy-on-close="true" :before-close="closeDialog">
    <el-row>
      <el-col :span="20">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
          <!-- <el-form-item v-if="type==='add'&&!form.administrativeName" label="行政区域：" prop="administrativeId">
            <SelectTree
              :props="props"
              :options="options"
              :value="form.administrativeId"
              :clearable="true"
              :accordion="true"
              :lazy="true"
              :only-child-choice="true"
              @getSelectTreeValue="getSelectTreeValue($event)"
              @getSelectTreetData="getSelectTreetData($event)"
            />
          </el-form-item>
          <el-form-item v-else label="行政区域：" prop="administrativeName">
            <el-input v-model="form.administrativeName" :disabled="true" placeholder="行政区域" />
          </el-form-item> -->
          <el-form-item label="所属组织：" prop="gridId">
            <SelectTree
              :props="props2"
              :options="options2"
              :value="form.gridId"
              :clearable="true"
              :accordion="true"
              type="wg"
              :only-child-choice="true"
              placeholder-text="请选择组织"
              @getSelectTreeValue="getSelectTreeValue2($event)"
              @getSelectTreetData="getSelectTreetData2($event)"
            />
          </el-form-item>
          <el-form-item label="住户编号：" prop="householdNo">
            <el-input v-model="form.householdNo" placeholder="住户编号" />
          </el-form-item>
          <el-form-item label="户名：" prop="name">
            <el-input v-model="form.name" placeholder="户名" />
          </el-form-item>
          <el-form-item label="住户类型：" prop="type">
            <el-select v-model="form.type" placeholder="请选择住户类型">
              <el-option label="自住" value="1" />
              <el-option label="出租" value="2" />
              <el-option label="空置" value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="备注：" prop="remarks">
            <el-input v-model="form.remarks" type="textarea" maxlength="250" show-word-limit placeholder="输入备注信息" :autosize="{ minRows: 4, maxRows: 8}" />
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

import { addHousehold } from '@/api/householdManage'
import { fetchChidList } from '@/api/administrativeManage'
import { selectGridListNew } from '@/api/gridManage'
import SelectTree from '@/components/SelectTree'
import { deepClone } from '../../../utils'
export default {
  name: 'MyDialog',
  components: { SelectTree },
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
        administrativeId: '',
        gridId: '',
        householdNo: '',
        name: '',
        remarks: '',
        type: '',
        administrativeName: '',
        userId: this.$store.getters.token['x-ysmall-user-id']
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
        administrativeId: [
          { required: true, message: '请选择行政区域', trigger: 'change' }
        ],
        householdNo: [
          { required: true, message: '请输入住户编号', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入户名', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择住户类型', trigger: 'change' }
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
      this.form.administrativeId = ''
      this.dialogVisible = false
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style scoped>
</style>
