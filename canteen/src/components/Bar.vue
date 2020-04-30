<template>
  <div>
    <div :id="id" :style="{ height: '567px', width: '100%' }"></div>
    <div style="width: 100%; text-align: center">
      数据来自 canteen.sjtu.edu.cn
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "Bar",
  props: {
    id: {
      type: String,
      default() {
        return "echarts";
      }
    }
  },
  data() {
    return {
      data: []
    };
  },
  mounted() {
    // 异步执行，后面的语句不一定在axios执行之后执行，可能并行执行
    setInterval(this.show(), 1000);
  },
  methods: {
    init() {
      var echart = echarts.init(document.getElementById(this.id));
      var options = {
        title: {
          text: "上海交通大学 食堂就餐指数发布",
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
          top: 40,
          left: 100
        },
        legend: {
          show: true,
          bottom: 0
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
            itemStyle: {
              barBorderRadius: [0, 5, 5, 0]
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
            itemStyle: {
              barBorderRadius: [0, 5, 5, 0]
            }
          }
        ]
      };
      options.yAxis.data = this.data.map(x => x.Name);
      options.series[0].data = this.data.map(x => x.Seat_u);
      options.series[1].data = this.data.map(x => x.Seat_s);
      echart.setOption(options);
      echart.on("click", params => {
        window.location.href = "/origin/" + this.data[params.dataIndex].Id;
      });
      window.addEventListener("resize", function() {
        echart.resize();
      });
    },
    show() {
      this.$axios
        .get("https://canteen.sjtu.edu.cn/CARD/Ajax/Place")
        .then(res => {
          this.data = res.data;
          this.init();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
