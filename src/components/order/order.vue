<template>
  <div class="order-contain">
    <el-table
      :default-sort="{prop: 'allprice', order: 'descending'}"
      :data="tableData"
      height="90%"
      stripe
      border
      @sort-change="sortchange"
      style="width: 100%"
    >
      <el-table-column prop="user" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="product" label="商品"></el-table-column>
      <el-table-column prop="count" label="数量"></el-table-column>
      <el-table-column prop="oneprice" label="单价"></el-table-column>
      <el-table-column sortable="custom" prop="allprice" label="总价"></el-table-column>
      <el-table-column prop="shijian" label="订单时间"></el-table-column>
      <el-table-column width="230" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDetail(scope.$index)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" align="middle" class="caozuo">
      <el-col :offset="2" :span="10">
        <el-input @change='inputValue' placeholder="输入姓名或者商品查询" prefix-icon="el-icon-search" v-model="input"></el-input>
      </el-col>
      <el-col :offset="2" :span="10">
        <el-pagination
          @current-change="change"
          background
          layout="prev, pager, next"
          :page-size="page.pagesize"
          :total="total"
        ></el-pagination>
      </el-col>
    </el-row>
    <el-drawer size="500px" title="我是标题" :visible.sync="drawer" :with-header="false">
      <Detail @close="close" @get="get" :detailData="detailData" />
    </el-drawer>
  </div>
</template>

<script>
import _ from "lodash";
import { get } from "utils/http";
import Detail from "./orderDetail";
export default {
  data() {
    return {
      detailData: null,
      drawer: false,
      input: "",
      tableData: [],
      page: {
        current: 1,
        pagesize: 10
      },
      total: 0
    };
  },
  components: {
    Detail
  },
  async mounted() {
    this.tableData = await this.getdata();
  },
  methods: {
    async inputValue(value){
      let res = await get({
        url:'/api/orderselect',
        params:{
          keyword:value
        }
      })
      this.$message({
        message: res.message,
        type: 'success'
      })
      this.tableData=res.data
    },
    sortchange(column, prop, order) {
      if (column.order == "descending") {
        //降序
        this.tableData = _.sortBy(this.tableData, function(item) {
          return item.allprice;
        });
      } else if (column.order == "ascending") {
        this.tableData = _.sortBy(this.tableData, function(item) {
          return -item.allprice;
        });
      }
    },
    close(value) {
      this.drawer = value;
    },
    handleDetail(index) {
      this.detailData = this.tableData[index];
      this.drawer = true;
    },
    async handleDelete(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let data = await get({
            url: "/api/orderdelete",
            params: {
              id: this.tableData[index].id
            }
          });
          if (data.type) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.$router.go(0);
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
    async change(value) {
      this.page.current = value;
      this.tableData = await this.getdata();
      // this.tableData = await this.getdata()
    },
    async getdata() {
      let data = await get({
        url: "/api/getorder",
        params: {
          page: this.page.current,
          pagesize: 10
        }
      });
      this.total = data.tota;
      return data.data;
    },
    async get() {
      this.tableData = await this.getdata();
    }
  }
};
</script>

<style lang="stylus" scoped>
.order-contain {
  height: 100%;

  .caozuo {
    height: 10%;
  }
}
</style>