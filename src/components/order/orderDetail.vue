<template>
  <div class="orderDetail">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="收货人姓名">
        <el-input placeholder="请输入收货人姓名" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="收货人手机号">
        <el-input placeholder="请输入收货人手机号" v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="收货人地址">
        <el-input placeholder="请输入收货人地址" v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="购买产品名称">
        <el-select v-model="form.product" placeholder="请选择产品">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="购买数量">
        <el-input-number v-model="form.count" @change="handleChange" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="单价">
        <el-input placeholder="请输入单价" @change="handleChange" v-model="form.oneprice"></el-input>
      </el-form-item>
      <el-form-item label="总价">
        <el-input :disabled="true" v-model="form.allprice"></el-input>
      </el-form-item>
      <el-form-item label="下单时间">
        <el-date-picker v-model="form.time" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">立即修改</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { post } from "utils/http";
export default {
  data() {
    return {
      form: {
        name: "",
        phone: "",
        address: "",
        product: "",
        count: "",
        oneprice: "",
        allprice: "",
        time: ""
      }
    };
  },
  props: ["data"],
  mounted() {
    (this.form.name = this.data.user),
      (this.form.phone = this.data.phone),
      (this.form.address = this.data.address),
      (this.form.product = this.data.product),
      (this.form.count = this.data.count),
      (this.form.oneprice = this.data.oneprice),
      (this.form.allprice = this.data.allprice),
      (this.form.time = this.data.shijian);
  },
  methods: {
    close() {
      this.$emit("close", false);
    },
    onSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = post({
            url: "/api/orderChange",
            data: {
              id: this.data.id,
              form: this.form
            }
          });
        }
      });
    },
    handleChange(value) {
      this.form.allprice = this.form.oneprice * this.form.count;
    }
  },
  watch:{
      data(value){
          console.log(value)
      }
  }
};
</script>

<style lang="stylus" scoped>
.orderDetail {
  height: 100%;
  padding: 24px;
  overflow-y: auto;
}
</style>