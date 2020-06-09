<template>
  <router-view></router-view>
</template>

<script>
import { mapState,mapGetters,mapMutations,mapActions } from 'vuex'
export default {
  name: "app",
  created(){
    console.log(this.name,this.age,this.rename)
    console.log(this.$store.state)
  },
  computed:{
    ...mapState('admin',{
      name:'name',
      age:'age'
    }),
    ...mapGetters('admin',{
      rename:'getname'
    })
  },
  methods:{
    ...mapMutations('admin',{
      changename:'changename'
    }),
    ...mapActions('admin',{
      geturlname:'geturlname'
    })
  }
};
</script>

