<template>
  <el-row>
    <el-col :span="24">
      <div class="background">
        <el-card class="login-card" shadow="always">
          <h1 class="h1-title" style="text-align:center">手机管理系统</h1>
          <el-form inline ref="form" :model="form">
            <el-form-item class="form-item">
              <el-input prefix-icon="el-icon-user" placeholder="请输入用户名" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item class="form-item">
              <el-input
                prefix-icon="el-icon-lock"
                placeholder="请输入密码"
                show-password
                v-model="form.password"
              ></el-input>
            </el-form-item>
            <div class="login-from">
              <el-checkbox v-model="form.remember">记住密码</el-checkbox>
            </div>
            <el-button class="login-button" type="primary" @click="submitForm('form')">提交</el-button>
          </el-form>
          <el-link class="card-link" @click="toregister" type="primary">还没有账号，赶紧注册一个吧^_^</el-link>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { get } from "../utils/http";
import store from 'store'
export default {
  data() {
    return {
      form: {
        name: "",
        password: "",
        remember: true
      },
    };
  },
  methods: {
    async submitForm(formName) {
      //登录不需要判断
      let action = {
            url: "api/login",
            params: { ...this.form }
          };
       let {type,message}=await get(action);
          this.$message({
            message,
            type
          });
          if(type=='success'&& this.form.remember){
            this.$router.push({name:'home'})
            store.set('user', this.form)
            this.$store.commit('changeuser',{
              user:this.form.name
            })
          }
    },
    toregister(){
      this.$router.push({name:'register'})
    }
  }
};
</script>

<style lang="stylus" scoped>
.background {
  background: url('../assets/background.jpg') no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  min-height: 100vh;
  position: relative;

  .login-card {
    position: absolute;
    width: 300px;
    margin: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .h1-title, .login-from {
      margin-bottom: 20px;
    }

    .form-item {
      width: 100%;

      >>>.el-form-item__content {
        width: 100%;
      }
    }

    .login-button {
      width: 100%;
    }

    .card-link {
      padding: 20px 0 0;
    }
  }
}
</style>