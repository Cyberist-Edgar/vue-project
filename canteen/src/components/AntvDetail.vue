//
<template>
  <div style=" textAlign: center; marginTop: 50px">
    <h2 id="title"></h2>
    <h5>距离下次更新还有 {{ count }} s</h5>
    <div style="maxWidth: 1000px; margin: auto">
      <div :id="id"></div>
    </div>
    <div style="width: 100%; text-align: center; marginTop: 20px">
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

import { Chart } from "@antv/g2";
export default {
  name: "AntvDetail",
  data() {
    return {
      id: "antv",
      count: 9
    };
  },
  mounted() {
    document.getElementById("title").innerHTML = INDEX[this.$route.params.id];
    this.SetData().then(() => {
      this.init();
    });
    setInterval(() => {
      if (this.count === 0) {
        this.SetData().then(() => {
          this.chart.render();
          this.count = 9;
        });
      } else {
        this.count--;
      }
    }, 1000);
  },
  methods: {
    init() {
      let height = this.data.length * 30;
      this.chart = new Chart({
        container: "antv",
        height: height,
        autoFit: true
      });
      this.chart.data(this.data);
      this.chart.coordinate().transpose();

      this.chart.tooltip({
        showMarkers: false,
        shared: true
      });

      this.chart
        .interval()
        .adjust("stack")
        .position("name*num")
        .color("type");

      this.chart.tooltip({
        showMarkers: false,
        shared: true
      });
      this.chart.legend({
        title: false
      });

      this.chart.scale("num", {
        nice: true
      });

      this.chart.interaction("active-region");

      this.chart.render();
    },
    SetData() {
      return new Promise((resolve, reject) => {
        this.$axios
          .get(
            "https://canteen.sjtu.edu.cn/CARD/Ajax/PlaceDetails/" +
              this.$route.params.id
          )
          .then(res => {
            this.data = [];
            this.data.push(
              ...res.data.map(el => ({
                id: el.Id,
                name: el.Name,
                num: el.Seat_u,
                type: "已使用"
              }))
            );
            this.data.push(
              ...res.data.map(el => ({
                id: el.Id,
                name: el.Name,
                num: el.Seat_s,
                type: "空闲"
              }))
            );
            // {
            //   id: res.data.map(el => el.Id),
            //   name: res.data.map(el => el.Name),
            //   seat_u: res.data.map(el => el.Seat_u),
            //   seat_s: res.data.map(el => el.Seat_s),
            //   px: res.data.map(el => el.Id)
            // };
            resolve(this.data);
          })
          .catch(err => {
            console.log(err);
            reject();
          });
      });
    },
    back() {
      window.location.href = "/antv";
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
