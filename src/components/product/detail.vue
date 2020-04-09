<template>
    <h1>你好</h1>
</template>

<script>
import {get} from 'utils/http'
import stroe from 'store'
export default {
    date(){
        return{

        }
    },
    async beforeCreate(){
        let id,flag=false
        if(this.$route.params.id){
            id=this.$route.params.id
            stroe.set('id',this.$route.params.id)
            flag = true
        }else if(stroe.get('id')){
            id=stroe.get('id')
            flag = true
        }else{
            this.$message({
                message: '没有选中信息，你要查看谁呢？',
                type: 'error'
            });
        }
        if(flag){
            let data = await get({
                url:'/api/lunboselect',
                params:{
                    id
                }
            })
        }
    }
}
</script>