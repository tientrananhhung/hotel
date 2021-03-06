import Vue from "vue";
import App from "./App.vue";
import "vuetify/dist/vuetify.min.css";
import Vuetify from "vuetify";
import router from "./router";
import store from "./store";

import axios from "./axios";

Vue.use(Vuetify);
const app = new Vue({
  el: "#app",
  router,
  store,
  axios,
  render: h => h(App)
});

Vue.component(
  'passport-clients',
  require('./components/passport/Clients.vue')
);

Vue.component(
  'passport-authorized-clients',
  require('./components/passport/AuthorizedClients.vue')
);

Vue.component(
  'passport-personal-access-tokens',
  require('./components/passport/PersonalAccessTokens.vue')
);