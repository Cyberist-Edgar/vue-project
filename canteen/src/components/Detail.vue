<template>
  <div>
    <div :id="id" :style="{ height: '600px', width: '100%' }"></div>

    <div style="width: 100%; text-align: center">
      <button @click="back" style="marginBottom: 20px">返回首页</button>
      <br />
      数据来自 canteen.sjtu.edu.cn
    </div>
  </div>
</template>

<script>
const INDEX = {
  200: "闵行第二餐厅",
  1000: "徐汇第二餐厅",
  100: "闵行第一餐厅",
  400: "闵行第四餐厅",
  500: "闵行第五餐厅",
  1100: "徐汇研究生餐厅",
  700: "闵行第七餐厅"
};

import echarts from "echarts";
export default {
  name: "Detail",
  data() {
    return {
      id: "echarts"
    };
  },
  mounted() {
    console.log(this.$route.params);
    let id = this.$route.params.id;
    let href = "https://canteen.sjtu.edu.cn/CARD/Ajax/PlaceDetails/" + id;
    this.$axios.get(href).then(res => {
      let echart = echarts.init(document.getElementById(this.id));
      let options = {
        title: {
          text: "",
          textStyle: {
            fontWeight: "normal",
            fontSize: 16
          },
          left: "center"
        },
        tooltip: {
          trigger: "axis"
        },

        grid: {
          left: 100
        },
        legend: {
          show: true,
          bottom: 20
        },

        xAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value}"
          }
        },
        yAxis: {
          type: "category",
          inverse: true,
          data: [],
          textStyle: {
            fontSize: 16,
            fontFamily: "sans-serif"
          }
        },
        series: [
          {
            name: "已占用",
            type: "bar",
            data: [],
            label: {
              show: true,
              position: "right"
            },
            barWidth: 20,
            itemStyle: {
              barBorderRadius: [0, 5, 5, 0] //（顺时针左上，右上，右下，左下）
            }
          },
          {
            name: "总开放",
            type: "bar",
            data: [],
            label: {
              show: true,
              position: "right"
            },
            barWidth: 20,
            itemStyle: {
              barBorderRadius: [0, 5, 5, 0]
            }
          }
        ]
      };
      options.yAxis.data = res.data.map(x => x.Name);
      options.series[0].data = res.data.map(x => x.Seat_u);
      options.series[1].data = res.data.map(x => x.Seat_s);
      options.title.text = INDEX[id];

      echart.setOption(options);
      window.addEventListener("resize", function() {
        echart.resize();
      });
    });
  },
  methods: {
    back() {
      window.location.href = "/";
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.index {
  margin: auto;
  left: auto;
  right: auto;
}

button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  padding: 9px 15px;
  font-size: 12px;
  border-radius: 3px;
  margin-left: 10px;
}
</style>
