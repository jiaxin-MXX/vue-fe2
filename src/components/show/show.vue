<template>
  <div style="display: flex;
    flex-direction: column;
    height: 90%;">
     <div
    style="min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;"
  >
    <v-chart :options="polar" />
  </div>
  <el-row style="    display: flex;
    justify-content: center;">
      <el-button @click="click(key)" v-for="(value,key) in type" :key='key' type="primary">{{value}}</el-button>
      <el-button @click="click('all')" type="primary">全部</el-button>
    </el-row>
  </div>
</template>

<script>
import _ from 'lodash';
import ECharts from "vue-echarts";
import { bar } from "echarts";
import { get, post } from "utils/http";
const type= {
  huawei:'华为',
  oppo:'OPPO',
  vivo:'VIVO',
  Samsung:'三星',
  mi:'小米'
}
export default {
  components: {
    "v-chart": ECharts
  },
  data() {
    return {
      type,
      polar: {
        title: {
          text: "手机销量和纯利润统计表",
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["收入", "纯利润"]
        },
        toolbox: {
          show: true,
          feature: {
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: [],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {    //重点在这一块，其余可以忽略
              interval: 0,   //这个一定要有，别忘记了
              rotate: 30,
              textStyle: {
                color: '#000',
                fontSize: 10
              }
            },
            axisLine: {
              show: true,
              interval: 0,
              lineStyle: {
                color: "RGB(210,221,217)"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "收入",
            type: "bar",
            data: [],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          },
          {
            name: "纯利润",
            type: "bar",
            data: [],
            markPoint: {
              data: [
                { name: "年最高", value: 182.2, xAxis: 7, yAxis: 183 },
                { name: "年最低", value: 2.3, xAxis: 11, yAxis: 3 }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      },
      list:[],
    };
  },
  async created(){
    let data = await get({
      url: "/api/lunbo",
      params: {
        mess:'all',
        page: 1,
        pageSize: 1000
      }
    });
    this.list = data.data
    this.change()
  },
  methods:{
    click(value){
      if(value == 'all'){
        this.change()
      }else{
        let tempdata = _.groupBy(this.list,(value)=>{
          return value.changshang
        })
        let xAxis = []
        let series0 = []
        let series1 = []
        for(let item of tempdata[value]){
          let add = 0
          let lirun = 0
          add += item.shoujia*item.xiaoliang
          lirun += (item.shoujia-item.jinjia)*item.xiaoliang
          series0.push(add)
          series1.push(lirun)
          console.log(item.name)
          xAxis.push(item.name)
        }
        this.polar.xAxis[0].data = xAxis
      this.polar.series[0].data = series0
      this.polar.series[1].data = series1
      }
    },
    change(){
      let tempdata = _.groupBy(this.list,(value)=>{
        return value.changshang
      })
      let xAxis = []
      let series0 = []
      let series1 = []
      _.forEach(tempdata,(value,key)=>{
        let add = 0
        let lirun = 0
        for(let item of value){
          add += item.shoujia*item.xiaoliang
          lirun += (item.shoujia-item.jinjia)*item.xiaoliang
        }
        series0.push(add)
        series1.push(lirun)
        xAxis.push(type[key])
      })
      this.polar.xAxis[0].data = xAxis
      this.polar.series[0].data = series0
      this.polar.series[1].data = series1
      console.log(0)
    }
  }
};
</script>