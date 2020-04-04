<template>
  <div class="contain">
    <div class="grid grid-left">
        <div class="switch">
            <el-switch
  v-model="open"
  :active-text="text"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
        </div>
      <el-menu
        :collapse="!open"
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="grid grid-right"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: true,
    };
  },
  computed:{
      text(){
          return this.open?'折叠':''
      }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  }
};
</script>

<style lang="stylus" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}
.contain {
  display: flex;
  height: 100vh;

  overflow hidden
  .switch{
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

    >>>.el-menu {
      border: none;
    }
    .el-none{
        width:auto
    }
  }

  .grid-right {
    background: #d3dce6;
  }
}
</style>