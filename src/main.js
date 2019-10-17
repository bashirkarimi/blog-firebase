// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import VueRouter from "vue-router";
import VueResource from 'vue-resource';

import Routes from "./routes";

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.config.productionTip = false;

// Register routes
const router = new VueRouter({
  routes: Routes,
  mode: "history"
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>",
  router: router
});
