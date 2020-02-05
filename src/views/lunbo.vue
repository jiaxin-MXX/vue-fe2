<template>
  <div class="about">
    <el-container style="height:100%">
      <el-header style="height:.4rem">
        <el-button @click="handleclick" type="primary" icon="el-icon-circle-plus-outline" circle></el-button>
      </el-header>
      <el-main style="height:100%">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  methods:{
    handleclick(){
      this.$router.push({name:'lunboadd'})
    }
  }
}
</script>
<style lang="stylus" scoped>
.about{
  height :100%
}
</style>