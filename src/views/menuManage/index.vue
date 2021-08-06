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
      <el-table-column label="菜单名称" prop="name">
      </el-table-column>
      <el-table-column label="菜单id" prop="id">
      </el-table-column>
      <el-table-column label="菜单介绍" prop="intro">
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
        name: '西红柿炒蛋',
        id: '211',
        intro: '食材：西红柿、鸡蛋',
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
