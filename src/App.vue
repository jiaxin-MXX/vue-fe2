<template>
  <div id="app">
    <el-container style="height:100%">
      <el-header style="text-align:center;line-height:.6rem;height:.6rem;background:#b3c0d1">罗技后台管理系统</el-header>
      <el-container style="display:flex;height:100%">
        <el-aside style="background:#d3dce6" width="2rem">
          <el-menu @select='handleselect'>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span>用户管理</span>
              </template>
               <el-menu-item index="1-1">管理员信息管理</el-menu-item>
               <el-menu-item index="1-2">客户信息管理</el-menu-item>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-picture"></i>
              <span slot="title">首页轮播管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main style="background:#e9eef3;width:100%;padding: .2rem .2rem 1rem">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="stylus" scoped>
#app{
  width :100%;
  height :100%
}
</style>

<script>
export default {
  methods:{
    handleselect(key,keypath) {
      if(key==2){
        this.$router.push({name:'lunboshow'})
      }
    }
  }
}
</script>


