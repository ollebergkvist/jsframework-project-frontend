import Vue from "vue";
import VueRouter from "vue-router";
let auth = require("../models/auth");

Vue.use(VueRouter);

const routes = [
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/logout",
    name: "Logout",
    redirect: "/login",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: { hideNavigation: true },
    component: () => import("../views/Dashboard.vue"),
    beforeEnter: (to, from, next) => {
      console.log(from.name);
      if (!auth.token) next({ name: "Login" });
      else next();
    },
  },
  {
    path: "/deposit",
    name: "Deposit",
    meta: { hideNavigation: true },
    component: () => import("../views/Deposit.vue"),
    beforeEnter: (to, from, next) => {
      console.log(from.name);
      if (!auth.token) next({ name: "Login" });
      else next();
    },
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    meta: { hideNavigation: true },
    component: () => import("../views/Portfolio.vue"),
    beforeEnter: (to, from, next) => {
      console.log(from.name);
      if (!auth.token) next({ name: "Login" });
      else next();
    },
  },
  {
    path: "/stocks",
    name: "Stocks",
    meta: { hideNavigation: true },
    component: () => import("../views/Stocks.vue"),
    beforeEnter: (to, from, next) => {
      console.log(from.name);
      if (!auth.token) next({ name: "Login" });
      else next();
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
