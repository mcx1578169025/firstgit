<template>
  <div id="main" style="height: 400px"></div>
</template>

<script>
//引入echarts
import * as echarts from "echarts";

export default {
  data() {
    return {
      option: {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [],
      },
    };
  },
  created() {
      this.option.series = [
      {
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ];
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    // 绘制图表
    myChart.setOption(this.option);
  },
};
</script>

<style>
</style>