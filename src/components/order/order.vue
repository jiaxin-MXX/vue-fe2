<template>
  <div class="order-contain">
    <el-table
      :default-sort="{prop: 'allprice', order: 'descending'}"
      :data="tableData"
      height="90%"
      stripe
      border
      style="width: 100%"
    >
      <el-table-column prop="user" label="姓名"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="product" label="商品"></el-table-column>
      <el-table-column prop="count" label="数量"></el-table-column>
      <el-table-column prop="oneprice" label="单价"></el-table-column>
      <el-table-column sortable prop="allprice" label="总价"></el-table-column>
      <el-table-column prop="shijian" label="订单时间"></el-table-column>
    </el-table>
    <el-row type="flex" align="middle" class="caozuo">
      <el-col :offset="2" :span="10">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input"></el-input>
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
  </div>
</template>

<script>
import { get } from "utils/http";
export default {
  data() {
    return {
      input: "",
      tableData: [],
      page: {
        current: 1,
        pagesize: 10
      },
      total: 0
    };
  },
  async mounted() {
    this.tableData = await this.getdata()
  },
  methods: {
    async change(value) {
      this.page.current = value;
      this.tableData = await this.getdata()
      // this.tableData = await this.getdata()
    },
    async getdata() {
      let data = await get({
        url: "/api/getorder",
        params: {
          page: this.page.current,
          pagesize: 10
        }
      })
      this.total = data.tota
      return data.data
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