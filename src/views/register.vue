<template>
  <el-row>
    <el-col :span="24">
      <div class="background">
        <el-card class="login-card" shadow="always">
          <h1 class="h1-title" style="text-align:center">用户注册</h1>
          <el-form inline :rules="rules" ref="form" :model="form">
            <el-form-item class="form-item" prop="name">
              <el-input prefix-icon="el-icon-user" placeholder="请输入用户名" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item class="form-item" prop="password">
              <el-input
                prefix-icon="el-icon-lock"
                placeholder="请输入密码"
                show-password
                v-model="form.password"
              ></el-input>
            </el-form-item>
            <el-form-item class="form-item" prop="check">
              <el-input
                prefix-icon="el-icon-lock"
                placeholder="请输再次入密码"
                show-password
                v-model="form.check"
              ></el-input>
            </el-form-item>
            <el-button class="login-button" type="primary" @click="submitForm('form')">提交</el-button>
          </el-form>
          <el-link class="card-link" @click="tologin" type="primary">已有账号，赶紧登录吧^_^</el-link>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { post } from "../utils/http";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        name: "",
        password: "",
        check: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
            message: "密码至少包含 数字和英文，长度6-20!",
            trigger: "blur"
          }
        ],
        check: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      //先进行判断
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let action = {
            url: "api/login",
            data: { ...this.form }
          };
          let {type,message} = await post(action);
          this.$message({
            message,
            type
          });
        } else {
          return false;
        }
      });
    },
    tologin(){
      this.$router.push({name:'login'})
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