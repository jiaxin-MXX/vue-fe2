<template>
  <div style="height:100%" class="table-center">
    <el-table stripe height="90%" border :data="tableData">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="jinjia" label="进价"></el-table-column>
      <el-table-column prop="shoujia" label="售价"></el-table-column>
      <el-table-column prop="kucun" label="库存"></el-table-column>
      <el-table-column prop="xiaoliang" label="销量"></el-table-column>
      <el-table-column prop="changshang" label="厂商"></el-table-column>
      <el-table-column prop="jinhuoriqi" label="进货日期"></el-table-column>
      <el-table-column width="230" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" align="middle" class="caozuo">
      <el-col :offset="2" :span="6">
        <el-button @click="add" type="primary">添加商品信息</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { get } from "utils/http";
export default {
  data() {
    return {
      tableData: []
    };
  },
  async beforeCreate() {
    let data = await get({
      url: "/api/lunbo",
      params: {
        mess:this.$route.params.mess,
        page: 1,
        pageSize: 10
      }
    });
    this.tableData = data;
  },
  methods: {
    add() {
      this.$router.push({ name: "add" });
    },
    handleDetail(x, y) {
      //   console.log(x,y)
      this.$router.push({
        name: "detail",
        params: {
          id: y.id
        }
      });
    },
    handleDelete(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let data = await get({
            url: "/api/lunbodelete",
            params: {
              id: this.tableData[index].id,
              name: this.tableData[index].name
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
    }
  },
  watch: {
    "$route.params.mess": async function() {
     let data = await get({
      url: "/api/lunbo",
      params: {
        mess:this.$route.params.mess,
        page: 1,
        pageSize: 1000
      }
    });
    this.tableData = data;
    }
  }
};
</script>
<style lang="stylus" scoped>
.caozuo {
  height: 10%;
}
</style>