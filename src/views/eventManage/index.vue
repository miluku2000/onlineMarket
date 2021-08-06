<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="searchForm" :inline="true" :model="searchForm" label-width="100px">
        <el-form-item>
          <el-button type="primary" icon="el-icon-edit" @click="handelAdd('add')">
            添加活动
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      :data="tableData"
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="活动名称" prop="name">
      </el-table-column>
      <el-table-column label="时间" prop="date">
      </el-table-column>
      <el-table-column label="地点" prop="direction">
      </el-table-column>
      <el-table-column label="宣传图" prop="pic">
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
import oneChecked_url from "@/assets/404_images/404.png";
export default {
  data() {
    return {
      tableData: [{
        name: '营销',
        direction:'上海市普陀区金沙江路',
        date: '2021/3/4',
        pic: oneChecked_url
      }]
    }
  }
}

</script>
<style lang="scss" scoped>
.tableListIcon {
  width: 40px;
  height: 40px;
}
</style>
