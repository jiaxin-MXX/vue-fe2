<template>
  <div class="about">
   <el-button @click="handleclick" type="primary" icon="el-icon-circle-plus-outline" circle>
     </el-button><router-view></router-view>
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
}
</style>