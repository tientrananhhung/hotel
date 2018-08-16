import Vue from "vue";
import App from "./App.vue";
import "vuetify/dist/vuetify.min.css";
import Vuetify from "vuetify";
import router from "./router";
import store from "./store";

import "./axios";

Vue.use(Vuetify);
const app = new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
