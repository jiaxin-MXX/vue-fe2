<template>
  <div style="height:100%" class="table-center">
    <el-table stripe height="90%" border :data="tableData">
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="type" label="权限"></el-table-column>

      <el-table-column width="230" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" align="middle" class="caozuo">
      <el-col :offset="2" :span="6">
        <el-button @click="add" type="primary">添加管理员</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { get } from "utils/http";
export default {
  data() {
    return {
      tableData: null
    };
  },
  async beforeCreate() {
    let res =await get({
      url: "/api/getuser"
    });
    if(res.type){
        this.$message({
            message: '查询成功',
            type: 'success'
        })
    }
    this.tableData = res.data
  },
  methods: {
    handleDetail(index) {
      console.log(this.tableData[index]);
    },
    handleDelete(index) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let data = await get({
            url: "/api/userdelete",
            params: {
              id: this.tableData[index].id,
            }
          });
          if (data.type) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.tableData.splice(index,1);
          } else {
            this.$message({
              type: "error",
              message: "删除失败!"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    add() {
      console.log(1);
    }
  }
};
</script>

<style lang="stylus" scoped>
.caozuo {
  height: 10%;
}
</style>