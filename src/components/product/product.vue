<template>
    <div style="height:100%" class="table-center">
          <el-table stripe height="90%" border :data="tableData">
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="jinjia" label="进价"></el-table-column>
            <el-table-column prop="shoujia" label="售价"></el-table-column>
            <el-table-column prop="kucun" label="库存"></el-table-column>
            <el-table-column prop="xiaoliang" label="销量"></el-table-column>
            <el-table-column prop="changshang" label="厂商"></el-table-column>
            <el-table-column prop="jinhuoriqi" label="进货日期"></el-table-column>
            <el-table-column width='230' label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <el-row type='flex' align='middle' class="caozuo">
            <el-col :offset='2' :span="6">   
                <el-button @click="add" type="primary">添加商品信息</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {get} from 'utils/http'
export default {
  data() {
    return {
      tableData:[],
    };
  },
  async beforeCreate(){
      let data =await get({
          url:'/api/lunbo',
          params:{
              page:1,
              pageSize:10,
          }
      })
      this.tableData=data
  },
  methods:{
      add(){
          this.$router.push({name:'add'})
      },
      handleDetail(x,y){
        //   console.log(x,y)
        this.$router.push({
            name:'detail',
            params:{
                id:y.id
            }
        })
      },
      handleDelete(x,y){
          console.log(x,y)
      }

  }
};
</script>
<style lang="stylus" scoped>
.caozuo{
    height:10%;
}
</style>