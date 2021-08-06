<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :destroy-on-close="true" :before-close="closeDialog">
    <el-row>
      <el-col :span="20">
        <el-tree
          ref="tree"
          node-key="id"
          :data="options"
          highlight-current
          :props="defaultProps"
          @node-click="handleNodeClick"
        />
      </el-col>
    </el-row>
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

import { saveHouseholdToGrid } from '@/api/householdManage'
import { selectGridListNew } from '@/api/gridManage'
export default {
  name: 'MyDialog',
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    multipleSelection: {
      type: Array,
      default: function() { return [] }
    }
  },
  data() {
    return {
      btnLoading: false,
      valueId: '',
      defaultProps: {
        children: 'childrenSOs',
        label: 'gridName'
      },
      searchForm: {
        gridNumber: '',
        userId: this.$store.getters.token['x-ysmall-user-id']
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
    this.getList()
  },
  methods: {
    getList() {
      selectGridListNew(this.searchForm).then(response => {
        let arr = []
        if (response && response.length) { // 过滤id相同的元素
          arr = response.filter((element, index, self) => {
            return self.findIndex(el => el.id === element.id) === index
          })
        }
        this.options = arr
      }).catch(() => {
      })
    },
    loadNode(node, resolve) {
      if (node.data.id) {
        const postData = { 'pid': node.data.id }
        selectGridListNew(postData).then(response => {
          let arr = []
          if (response && response.length) { // 过滤id相同的元素
            arr = response.filter((element, index, self) => {
              return self.findIndex(el => el.id === element.id) === index
            })
          }
          resolve(arr)
        }).catch(() => {
        })
      } else {
        this.getList()
      }
    },
    handleNodeClick(data) {
      console.log(data)
      if (data.gridType !== 4) { // 设置只可选中子节点
        this.$refs.tree.setCurrentKey(null) // 设置选中
        return
      }
      this.valueId = data.id
    },
    handeSubmit() {
      if (!this.valueId) {
        this.$message.error('请选择组织节点')
      } else {
        const postData = {}
        postData.gridId = this.valueId
        const householdIds = []
        this.multipleSelection.map(item => {
          householdIds.push(item.id)
        })
        postData.householdIds = householdIds
        saveHouseholdToGrid(postData).then(response => {
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
    closeDialog() {
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
.tableListIcon {
  width: 40px;
  height: 40px;
}
.el-tree-node__label{
  font-weight: normal;
}
.el-tree >>>.is-current .el-tree-node__label{
  color: #409EFF;
  font-weight: 700;
}
.el-tree >>>.is-current .el-tree-node__children .el-tree-node__label{
  color:#606266;
  font-weight: normal;
}
</style>
