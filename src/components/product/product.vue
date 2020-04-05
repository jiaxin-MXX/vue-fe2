<template>
    <div style="height:100%" class="table-center">
          <el-table stripe height="85%" border :data="tableData" style="width: 100%">
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
                @click="handleDelete(scope.$index, scope.row)">详情</el-button>
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <div class='caozuo'>
            <el-button @click="add" type="primary">添加商品信息</el-button>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
         {
              name:'华为p30',
              jinjia:1900,
              shoujia:2000,
              tupian:[],
              kucun:'库存',
              title:'',
              
              xiaoliang:13,
              changshang:'huawei',
              jinhuoriqi:'进货日期'
          },
          {
              name:'华为p30',
              jinjia:1900,
              shoujia:2000,
              tupian:[],
              kucun:'库存',
              title:'',
              
              xiaoliang:13,
              changshang:'huawei',
              jinhuoriqi:'进货日期'
          },
          {
              name:'华为p30',
              jinjia:1900,
              shoujia:2000,
              tupian:[],
              kucun:'库存',
              title:'',
              
              xiaoliang:13,
              changshang:'huawei',
              jinhuoriqi:'进货日期'
          },
          {
              name:'华为p30',
              jinjia:1900,
              shoujia:2000,
              tupian:[],
              kucun:'库存',
              title:'',
              
              xiaoliang:13,
              changshang:'huawei',
              jinhuoriqi:'进货日期'
          },
          {
              name:'华为p30',
              jinjia:1900,
              shoujia:2000,
              tupian:[],
              kucun:'库存',
              title:'',
              
              xiaoliang:13,
              changshang:'huawei',
              jinhuoriqi:'进货日期'
          },
          {
              name:'华为p30',
              jinjia:1900,
              shoujia:2000,
              tupian:[],
              kucun:'库存',
              title:'',
              
              xiaoliang:13,
              changshang:'huawei',
              jinhuoriqi:'进货日期'
          },
          {
              name:'华为p30',
              jinjia:1900,
              shoujia:2000,
              tupian:[],
              kucun:'库存',
              title:'',
              
              xiaoliang:13,
              changshang:'huawei',
              jinhuoriqi:'进货日期'
          },
          {
              name:'华为p30',
              jinjia:1900,
              shoujia:2000,
              tupian:[],
              kucun:'库存',
              title:'',
              
              xiaoliang:13,
              changshang:'huawei',
              jinhuoriqi:'进货日期'
          },
          {
              name:'华为p30',
              jinjia:1900,
              shoujia:2000,
              tupian:[],
              kucun:'库存',
              title:'',
              
              xiaoliang:13,
              changshang:'huawei',
              jinhuoriqi:'进货日期'
          },
          {
              name:'华为p30',
              jinjia:1900,
              shoujia:2000,
              tupian:[],
              kucun:'库存',
              title:'',
              
              xiaoliang:13,
              changshang:'huawei',
              jinhuoriqi:'进货日期'
          },
          {
              name:'华为p30',
              jinjia:1900,
              shoujia:2000,
              tupian:[],
              kucun:'库存',
              title:'',
              
              xiaoliang:13,
              changshang:'huawei',
              jinhuoriqi:'进货日期'
          },
          {
              name:'华为p30',
              jinjia:1900,
              shoujia:2000,
              tupian:[],
              kucun:'库存',
              title:'',
              
              xiaoliang:13,
              changshang:'huawei',
              jinhuoriqi:'进货日期'
          },
          {
              name:'华为p30',
              jinjia:1900,
              shoujia:2000,
              tupian:[],
              kucun:'库存',
              title:'',
              
              xiaoliang:13,
              changshang:'huawei',
              jinhuoriqi:'进货日期'
          },
          {
              name:'华为p30',
              jinjia:1900,
              shoujia:2000,
              tupian:[],
              kucun:'库存',
              title:'',
              
              xiaoliang:13,
              changshang:'huawei',
              jinhuoriqi:'进货日期'
          },
          {
              name:'华为p30',
              jinjia:1900,
              shoujia:2000,
              tupian:[],
              kucun:'库存',
              title:'',
              
              xiaoliang:13,
              changshang:'huawei',
              jinhuoriqi:'进货日期'
          },
          {
              name:'华为p30',
              jinjia:1900,
              shoujia:2000,
              tupian:[],
              kucun:'库存',
              title:'',
              
              xiaoliang:13,
              changshang:'huawei',
              jinhuoriqi:'进货日期'
          },
          {
              name:'华为p30',
              jinjia:1900,
              shoujia:2000,
              tupian:[],
              kucun:'库存',
              title:'',
              
              xiaoliang:13,
              changshang:'huawei',
              jinhuoriqi:'进货日期'
          },
          {
              name:'华为p30',
              jinjia:1900,
              shoujia:2000,
              tupian:[],
              kucun:'库存',
              title:'',
              
              xiaoliang:13,
              changshang:'huawei',
              jinhuoriqi:'进货日期'
          },
          {
              name:'华为p30',
              jinjia:1900,
              shoujia:2000,
              tupian:[],
              kucun:'库存',
              title:'',
              
              xiaoliang:13,
              changshang:'huawei',
              jinhuoriqi:'进货日期'
          },
          {
              name:'华为p30',
              jinjia:1900,
              shoujia:2000,
              tupian:[],
              kucun:'库存',
              title:'',
              
              xiaoliang:13,
              changshang:'huawei',
              jinhuoriqi:'进货日期'
          },
      ],
    };
  },
  methods:{
      add(){
          this.$router.push({name:'add'})
      }
  }
};
</script>
<style lang="stylus" scoped>
.caozuo{
    height:15%;
    background:blue
}
</style>