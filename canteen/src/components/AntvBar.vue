<template>
  <div style=" textAlign: center; marginTop: 50px">
    <h3>上海交通大学 食堂就餐指数发布</h3>
    <h4>点击柱状图可查看详情</h4>
    <h5>距离下次更新还有 {{ count }} s</h5>
    <div style="maxWidth: 1000px; margin: auto">
      <div :id="id"></div>
    </div>
  </div>
</template>

<script>
import { Chart } from "@antv/g2";
export default {
  name: "AntvBar",
  data() {
    return {
      id: "antv",
      data: [],
      chart: "undefined",
      count: 9
    };
  },
  mounted() {
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
      this.chart = new Chart({
        container: "antv",
        height: 400,
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

      this.chart.scale("num", {
        nice: true
      });

      this.chart.on("interval:click", event => {
        let id = event.gEvent.shape.cfg.origin.data.id;
        window.location.href = "/antv/" + id;
      });

      this.chart.tooltip({
        showMarkers: false,
        shared: true
      });
      this.chart.legend({
        title: false
      });

      this.chart.interaction("active-region");

      this.chart.render();
    },
    changeData() {
      if (this.chart) {
        this.chart.changeData(this.data);
      } else {
        console.log("error");
      }
    },
    SetData() {
      return new Promise((resolve, reject) => {
        this.$axios
          .get("https://canteen.sjtu.edu.cn/CARD/Ajax/Place")
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
    }
  }
};
</script>
