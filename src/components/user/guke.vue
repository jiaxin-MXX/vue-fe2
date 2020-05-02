<template>
  <div style="height:100%" class="table-center">
    <el-table stripe height="90%" border :data="tableData">
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="user" label="用户名"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column width="230" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" align="middle" class="caozuo">
      <el-col :offset="2" :span="10">
        <el-input
          @change="inputValue"
          placeholder="输入姓名或者商品查询"
          prefix-icon="el-icon-search"
          v-model="input"
        ></el-input>
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
    <el-drawer class="drawer" :visible.sync="drawer" :with-header="false">
      <h1 class="h1-title" style="text-align:center">顾客信息</h1>
      <el-form inline ref="form" :model="form">
        <el-form-item class="form-item" prop="name">
          <el-input prefix-icon="el-icon-user" placeholder="请输入用户名" v-model="form.user"></el-input>
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
          <el-input prefix-icon="el-icon-user" placeholder="请输入手机号" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item class="form-item">
          <el-input type="textarea" :rows="2" placeholder="请输入收货地址" v-model="form.address"></el-input>
        </el-form-item>
        <el-button class="login-button" type="warning" @click="updataForm('form')">修改</el-button>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { get, post } from "utils/http";
export default {
  data() {
    return {
      tableData: null,
      page: {
        current: 1,
        pagesize: 10
      },
      input:"",
      total: 0,
      drawer: false,
      form: {
        id: "",
        user: "",
        password: "",
        phone: "",
        address: ""
      }
    };
  },
  async created() {
    await this.get();
  },
  methods: {
    async inputValue(value) {
      let res = await get({
        url: "/api/gukeselect",
        params: {
          keyword: value
        }
      });
      this.$message({
        message: res.message,
        type: "success"
      });
      this.tableData = res.data;
    },
    async change(value) {
      this.page.current = value;
      await this.get();
    },
    async get() {
      let res = await get({
        url: "/api/getguke",
        params: this.page
      });
      if (res.type) {
        this.$message({
          message: "查询成功",
          type: "success"
        });
      }
      this.tableData = res.data;
      this.total = res.total;
    },
    handleDetail(index) {
      this.drawer = true;
      let { id, user, password, phone, address } = this.tableData[index];
      this.form.user = user;
      this.form.password = password;
      this.form.phone = phone;
      this.form.address = address;
      this.form.id = id;
    },
    handleDelete(index) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let data = await get({
            url: "/api/gukedelete",
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
    updataForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let action = {
            url: "api/updataguke",
            data: { ...this.form }
          };
          let { type, message } = await post(action);
          this.$message({
            message,
            type
          });
          await this.get();
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.caozuo {
  height: 10%;
}

.drawer {
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