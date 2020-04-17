<template>
  <div
    style="min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;"
  >
    <v-chart :options="polar" />
  </div>
</template>

<script>
import ECharts from "vue-echarts";
import { bar } from "echarts";

export default {
  components: {
    "v-chart": ECharts
  },
  data() {
    return {
      polar: {
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove",
          showContent: true,
          borderColor: "#ccc"
        },
        title: {
          text: "手机数据统计",
          subtext: "动态数据",
          x: "center"
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            showBackground: true,
            itemStyle: {
              normal: {
                //这里是重点
                color: function(params) {
                  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = [
                    "#c23531",
                    "#2f4554",
                    "#61a0a8",
                    "#d48265",
                    "#91c7ae",
                    "#749f83",
                    "#ca8622"
                  ];
                  return colorList[params.dataIndex];
                }
              }
            },
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0)"
            }
          }
        ]
      }
    };
  }
};
</script>