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
    <el-card v-show="show" class="login-card" shadow="always">
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
        <el-form-item>
          <el-radio-group v-model="form.type">
            <el-radio label="超级管理员"></el-radio>
            <el-radio label="普通管理员"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-button v-if="!update" class="login-button" type="primary" @click="submitForm('form')">提交</el-button>
        <el-button v-else class="login-button" type="warning" @click="updataForm('form')">修改</el-button>
      </el-form>
      <el-link class="card-link" @click="showclose" type="primary">返回^_^</el-link>
    </el-card>
  </div>
</template>

<script>
import { get, post } from "utils/http";
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
      tableData: null,
      show: false,
      update: false,
      form: {
        id:'',
        name: "",
        password: "",
        check: "",
        type: ""
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
  async created() {
    await this.get()
  },
  methods: {
    async get(){
      let res = await get({
      url: "/api/getuser"
    });
    if (res.type) {
      this.$message({
        message: "查询成功",
        type: "success"
      });
    }
    this.tableData = res.data;
    },
    updataForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let action = {
            url: "api/updatalogin",
            data: { ...this.form }
          };
          let { type, message } = await post(action);
          this.$message({
            message,
            type
          });
          await this.get()
        } else {
          return false;
        }
      });
    },
    showclose(){
      this.show = false
    },
    submitForm(formName) {
      //先进行判断
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let action = {
            url: "api/login",
            data: { ...this.form }
          };
          let { type, message } = await post(action);
          this.$message({
            message,
            type
          });
          await this.get()
        } else {
          return false;
        }
      });
    },
    handleDetail(index) {
      let { id, username, password, type } = this.tableData[index];
      (this.form.name = username),
        (this.form.password = password),
        (this.form.type = type == 1 ? "超级管理员" : "普通管理员");
        this.form.id = id
      this.show = true;
      this.update = true
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
              id: this.tableData[index].id
            }
          });
          if (data.type) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.tableData.splice(index, 1);
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
      this.show = true;
    }
  }
};
</script>

<style lang="stylus" scoped>
.caozuo {
  height: 10%;
}

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
</style>