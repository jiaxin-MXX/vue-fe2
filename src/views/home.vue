<template>
  <div class="contain">
    <div class="grid grid-left">
      <div class="switch">
        <el-switch
          v-model="open"
          :active-text="text"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
      </div>
      <el-menu
        :default-active="deActive"
        :collapse="!open"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="selectone"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>查看仓库</span>
          </template>
          <el-menu-item index="product/all">全部产品</el-menu-item>
          <el-menu-item index="detail">产品详情</el-menu-item>
          <el-submenu index="1-2">
            <template slot="title">产品分类</template>
            <el-menu-item index="product/huawei">华为</el-menu-item>
            <el-menu-item index="product/oppo">OPPO</el-menu-item>
            <el-menu-item index="product/vivo">ViVO</el-menu-item>
            <el-menu-item index="product/Samsung">三星</el-menu-item>
            <el-menu-item index="product/mi">小米</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="order">
          <i class="el-icon-s-order"></i>
          <span slot="title">查看订单</span>
        </el-menu-item>
        <el-menu-item index="tongji">
          <i class="el-icon-data-line"></i>
          <span slot="title">销量统计</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item index="user">管理员管理</el-menu-item>
          <el-menu-item index="guke">顾客信息管理</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="grid grid-right" style="display: flex;flex-direction: column;height:100vh">
      <el-row type="flex" class="header">
        <el-col :span="12" :offset="6">
          <div class="grid-content bg-purple title">手机商城管理系统</div>
        </el-col>
        <el-col :span="3" :offset="3">
          <div class="grid-content bg-purple user">
            <el-popover placement="bottom" :title="$store.state.user" trigger="manual" v-model="visible">
              <div style="border-top:1px solid #ccc" @click="tuichu">退出</div>
              <el-button
                circle
                type="info"
                icon="el-icon-user"
                slot="reference"
                @click="visible = !visible"
              ></el-button>
            </el-popover>
          </div>
        </el-col>
      </el-row>
      <div style="flex:1;overflow:auto">
        <router-view></router-view>
      </div>
      <div class="bottom">CREATED BY 贾鑫</div>
    </div>
  </div>
</template>

<script>
import store from 'store'
export default {
  data() {
    return {
      open: true,
      visible: false,
      user:null,
    };
  },
  created(){
    this.user = store.get('user').name
  },
  computed: {
    text() {
      return this.open ? "折叠" : "";
    },
    deActive() {
      let path = this.$route.path.substring(1);
      return path;
    }
  },
  methods: {
    selectone(index) {
      let [name, mess] = index.split("/");
      this.$router.push({ name, params: { mess } });
    },
    tuichu() {
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

.contain {
  display: flex;
  justify-content: center;

  .switch {
    height: 56px;
    padding: 0 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .grid {
    min-height: 100vh;
  }

  .grid-left {
    background-color: #545c64;
    margin-right: 1px;

    >>>.el-menu {
      border: none;
    }

    .el-none {
      width: auto;
    }
  }

  .grid-right {
    width: 100%;
    background: white;
    flex: 1;
    overflow: hidden;

    .header {
      height: 50px;
      width: 100%;
      align-items: center;
      background: #545c64;

      .grid-content {
        border-radius: 4px;
        min-height: 36px;
      }

      .title {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        background: linear-gradient(to left, #c973ff, #aebaf8);
        -webkit-background-clip: text;
        color: transparent;
      }

      .user {
        display: flex;
        justify-content: center;
      }
    }
  }

  .bottom {
    background: #545c64;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
  }
}
</style>