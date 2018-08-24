import Vue from "vue";
import App from "./App.vue";
import "vuetify/dist/vuetify.min.css";
import Vuetify from "vuetify";
import router from "./router";
import store from "./store";

require("./axios");
Vue.use(Vuetify);
//
store.dispatch("Init").then(is_login => {
  const app = new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App),
    created() {
      if (!is_login) {
        console.log("Chua dang nhap, chuyen den trang login");
        location.href = "#/login";
      } else {
        if (router.app.$route.name === "Login") {
          router.replace({ name: "Home" });
        }
      }
    }
  });
});
//

// Vue.component(
//   'passport-clients',
//   require('./components/passport/Clients.vue')
// );

// Vue.component(
//   'passport-authorized-clients',
//   require('./components/passport/AuthorizedClients.vue')
// );

// Vue.component(
//   'passport-personal-access-tokens',
//   require('./components/passport/PersonalAccessTokens.vue')
// );
