<template>
  <section class="chartPage">
    <!-- <div class="chartHeader">
      <h1>chart Page</h1>
    </div> -->
    <div class="chartListContent">
      <div class="useChart">
        <div id="dailyUse"></div>
        <span>硬件一周使用量统计</span>
      </div>
      <div class="rateChart">
        <div id="dailyRate"></div>
        <span>一天内硬件使用时间统计</span>
      </div>
      <div class="scatterChart">
        <div id="dailyStatus"></div>
        <span>用户一月内活跃状态</span>
      </div>
    </div>
  </section>
</template>

<script>
// import echarts from 'echarts'
import * as echarts from "echarts"
export default {
  data: function () {
    return {}
  },
  mounted() {
    let chartDom = document.getElementById("dailyUse")
    let chartDom1 = document.getElementById("dailyRate")
    let chartDom2 = document.getElementById("dailyStatus")
    let myChart = echarts.init(chartDom)
    let myChart1 = echarts.init(chartDom1)
    let myChart2 = echarts.init(chartDom2)
    let option = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      legend: {
        top: "10%",
        left: "center",
      },
      grid: {
        top: "10%",
        left: "9%",
        right: "9%",
        bottom: "18%",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["Window", "Light", "Fan"],
      },
      series: [
        {
          name: "Window",
          data: [23, 32, 23, 45, 50, 13, 50],
          type: "line",
          smooth: true,
        },
        {
          name: "Light",
          data: [30, 45, 24, 4, 43, 30, 10],
          type: "line",
          smooth: true,
        },
        {
          name: "Fan",
          data: [20, 62, 31, 54, 20, 10, 10],
          type: "line",
          smooth: true,
        },
      ],
    }
    let option1 = {
      legend: {
        top: "8%",
        left: "center",
      },
      // toolbox: {
      //   show: true,
      //     saveAsImage: { show: true },
      // },
      tooltip: {
        trigger: "item",
        formatter: "{b} : {c} ({d}%)",
      },
      series: [
        {
          name: "Nightingale Chart",
          type: "pie",
          radius: [15, 85],
          center: ["50%", "62%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 3,
          },
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: false,
            },
          },
          data: [
            { value: 40, name: "Window" },
            { value: 38, name: "Fan" },
            { value: 32, name: "Light" },
            { value: 30, name: "Wet" },
            { value: 28, name: "Curtain" },
          ],
        },
      ],
    }
    let option2 = {
      xAxis: {},
      yAxis: {},
      grid: {
        top: "10%",
        left: "5%",
        right: "5%",
        bottom: "14%",
      },
      series: [
        {
          symbolSize: 15,
          data: [
            [10.0, 8.04],
            [8.07, 6.95],
            [13.0, 7.58],
            [9.05, 8.81],
            [11.0, 8.33],
            [14.0, 7.66],
            [13.4, 6.81],
            [10.0, 6.33],
            [14.0, 8.96],
            [12.5, 6.82],
            [9.15, 7.2],
            [11.5, 7.2],
            [3.03, 4.23],
            [12.2, 7.83],
            [2.02, 4.47],
            [1.05, 3.33],
            [4.05, 4.96],
            [6.03, 7.24],
            [12.0, 6.26],
            [12.0, 8.84],
            [7.08, 5.82],
            [5.02, 5.68],
          ],
          type: "scatter",
        },
      ],
    }
    option && myChart.setOption(option)
    option1 && myChart1.setOption(option1)
    option2 && myChart2.setOption(option2)
  },
}
</script>

<style lang="less">
/*图表页面*/
/*---------------------------------------------------------*/
.chartPage {
  width: 100%;
  height: 100%;
  padding: 1em;
}
.chartListContent {
  width: 100%;
  height: 100%;
  background: var(--bgcolor);
  box-shadow: var(--bgshadow1);
  border-radius: 25px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  .useChart > span,
  .rateChart > span,
  .scatterChart > span {
    width: 100%;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(51, 51, 51, 0.7);
    font-size: 12px;
    text-align: center;
  }
  .useChart {
    width: 70%;
    height: 60%;
    position: relative;
  }
  .rateChart {
    width: 30%;
    height: 60%;
    position: relative;
  }
  .scatterChart {
    width: 100%;
    height: 40%;
    position: relative;
  }
}
/*遮罩*/
.cover {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: rgba(51, 51, 51, 0.4);
  z-index: 65;
  /*display: none;*/
}
#dailyUse {
  width: 100%;
  height: 100%;
  border-right: 0.2px solid rgba(51, 51, 51, 0.2);
  border-bottom: 0.2px solid rgba(51, 51, 51, 0.2);
}
#dailyRate {
  width: 100%;
  height: 100%;
  border-bottom: 0.2px solid rgba(51, 51, 51, 0.2);
}
#dailyStatus {
  width: 100%;
  height: 100%;
}
</style>