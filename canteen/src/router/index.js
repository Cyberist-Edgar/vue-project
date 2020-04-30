import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("../components/Bar")
  },
  
  {
    path: "/origin/:id",
    component: () => import("../components/Detail")
  },
  {
    path: "/antv",
    name: "antv",
    component: () => import("../components/AntvBar")
  },
  {
    path: "/antv/:id",
    component: () => import("../components/AntvDetail")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
