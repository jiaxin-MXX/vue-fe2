<template>
    <div>
        <el-button @click="gettype1" type="primary">GET 1</el-button>
        <el-button @click="gettype2" type="primary">GET 2</el-button>
        <el-button @click="posttype" type="primary">POST</el-button>
        <el-button @click="puttype" type="primary">PUT</el-button>
        <el-button @click="patchtype" type="primary">PATCH</el-button>
        <el-button @click="deletetype" type="primary">DELETE</el-button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    methods:{
        async gettype1(){
           let result = await axios({
                url:'/api/test/jiaxin/1',
                method:'get',
            })
        },
        async gettype2(){
           let result = await axios({
                url:'/api/test',
                method:'get',
                params:{
                    name:'jiaxin'
                }
            })
        },
        async posttype(){
           let result = await axios({
                url:'/api/test',
                method:'post',
                data:{
                    name:'jiaxin'
                },
            })
        },
        async puttype(){
           let result = await axios({
                url:'/api/test/put',
                method:'put',
                data:{
                    name:'jiaxin'
                },
                params:{
                    value:'put'
                }
            })
        },
        async patchtype(){
           let result = await axios({
                url:'/api/test/patch',
                method:'patch',
                data:{
                    name:'jiaxin'
                },
                params:{
                    value:'patch'
                }
            })
        },
        async deletetype(){
           let result = await axios({
                url:'/api/test/delete',
                method:'delete',
                data:{
                    name:'jiaxin'
                },
                params:{
                    value:'delete'
                }
            })
        },
    }
}
</script>