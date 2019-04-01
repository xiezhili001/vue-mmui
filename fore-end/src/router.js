import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  // base: process.env.BASE_URL,
  routes: [
    {
      path: "/homepage",
      name: "homepage",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("./views/Home.vue")
    },
    {
      path: "/prizeHistory",
      name: "prizeHistory",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("./views/PrizeHistory.vue")
    },
    {
      path: "/gamblingRecord",
      name: "gamblingRecord",
      component: () => import("./views/GamblingRecord.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue")
    },
    {
      path: "/twoWeekReport",
      name: "twoWeekReport",
      component: () => import("./views/TwoWeekReport.vue")
    },
    {
      path: "/regular",
      name: "regular",
      component: () => import("./views/Regular.vue")
    },
    {
      path: '*',
      redirect: '/homepage'
    }
  ]
});
