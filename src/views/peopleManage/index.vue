<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="searchForm" :inline="true" :model="searchForm" label-width="100px">
        <el-form-item>
          <el-button type="primary" icon="el-icon-edit" @click="handelAdd('add')">
            添加人员
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      :data="tableData"
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="姓名" prop="name">
      </el-table-column>
      <el-table-column label="手机号" prop="phone">
      </el-table-column>
      <el-table-column label="身份证号" prop="idcard">
      </el-table-column>
      <el-table-column label="性别" prop="sex">
      </el-table-column>
      <el-table-column label="地址" prop="address">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <!-- <template slot-scope="{row}"> -->
          <el-button type="primary" size="mini" @click="handelAdd('edit')">
            编辑
          </el-button>
           <el-button type="primary" size="mini" @click="handleDelete(row)">
            删除
          </el-button>
        <!-- </template> -->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        name: '王小虎',
        phone: '152454535342',
        idcard: '330105200006151329',
        sex: '男',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  }
  // ,
  // methods: {
  //   handelAdd(e) {
  //     this.dialogType = e
  //     this.visible = true
  //     this.title = '添加标签'
  //   }
  // }
}

</script>
<style lang="scss" scoped>
.tableListIcon {
  width: 40px;
  height: 40px;
}
</style>
