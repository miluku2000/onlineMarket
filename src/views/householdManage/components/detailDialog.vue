<template>
  <div class="warp">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="10">
        <el-row>
          <el-col :span="15">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
              <el-form-item label="所属组织：">
                <el-input v-model="form.gridText" placeholder="所属组织" :disabled="true" />
              </el-form-item>
              <el-form-item label="行政划分：" prop="administrativeId">
                <SelectTree
                  :props="props"
                  :options="options"
                  :value="form.administrativeId"
                  :clearable="true"
                  :accordion="true"
                  :lazy="true"
                  :only-child-choice="true"
                  :fgg-text="form.administrativeText"
                  @getSelectTreeValue="getSelectTreeValue($event)"
                  @getSelectTreetData="getSelectTreetData($event)"
                />
              </el-form-item>
              <el-form-item label="住户编号：" prop="householdNo">
                <el-input v-model="form.householdNo" placeholder="住户编号" />
              </el-form-item>
              <el-form-item label="户名：" prop="name">
                <el-input v-model="form.name" placeholder="户名" />
              </el-form-item>
              <!-- <el-form-item label="住户类型：" prop="type">
                <el-select v-model="form.type" placeholder="请选择住户类型">
                  <el-option label="自住" value="1" />
                  <el-option label="出租" value="2" />
                  <el-option label="空置" value="3" />
                  <el-option label="自住和出租都有" value="4" />
                </el-select>
              </el-form-item> -->
              <el-form-item label="备注：" prop="remarks">
                <el-input v-model="form.remarks" type="textarea" maxlength="250" show-word-limit placeholder="输入备注信息" :autosize="{ minRows: 4, maxRows: 8}" />
              </el-form-item>
              <el-form-item>
                <el-button @click="closeDialog">返回</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="户内信息" name="20">
        <myList :name="form.name" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import { fetchDetails, updateHousehold } from '@/api/householdManage'
import { fetchChidList } from '@/api/administrativeManage'
import SelectTree from '@/components/SelectTree'
import myList from './list'
export default {
  name: 'HouseholdManageEdit',
  components: { myList, SelectTree },
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
      props: { // 配置项（必选）
        value: 'id',
        label: 'adminName',
        children: 'children',
        isLeaf: function(data, node) {
          return data.adminType > 2
        }
      },
      activeName: '10',
      form: {
        gridText: '',
        administrativeText: '',
        administrativeId: '',
        householdNo: '',
        name: '',
        type: '',
        remarks: ''
      },
      searchTreeForm: {
        id: this.$store.getters.token.administrativeId,
        memberType: this.$store.getters.token.memberType
      },
      rules: {
        gridText: [
          { required: true, message: '所属组织不能为空', trigger: 'blur' }
        ],
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
      options: []
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
  },
  methods: {
    getTreeList() {
      fetchChidList(this.searchTreeForm).then(response => {
        this.options = response
        const id = this.$route.params && this.$route.params.id
        this.getDetails(id)
      }).catch(() => {})
    },
    getDetails(id) {
      fetchDetails(id).then(response => {
        response.householdId = response.id
        response.userId = this.$store.getters.token['x-ysmall-user-id']
        this.form = response
        const gridSO = response.gridSO
        if (gridSO) {
          const villageGridName = gridSO.villageGridName || ''
          const oneGridName = gridSO.oneGridName || ''
          const twoGridName = gridSO.twoGridName || ''
          this.form.gridText = villageGridName + '-' + oneGridName + '-' + twoGridName
        }
        const administrativeVillageName = response.administrativeVillageName || ''
        const administrativeBlockName = response.administrativeBlockName || ''
        this.form.administrativeText = administrativeVillageName + '-' + administrativeBlockName
      })
    },
    getSelectTreeValue(value) {
      this.form.administrativeId = value
    },
    getSelectTreetData(data) {},
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    handeSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.btnLoading = true
          updateHousehold(this.form).then(response => {
            this.btnLoading = false
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
      this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.push('/householdManage')
      // this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.warp {
  padding: 20px;
}
</style>
