import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Login from "./views/Login.vue";
import UserMg from "./views/Usersmg.vue";
import RoomMg from "./views/Roomsmg.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/usersmg",
      name: "usersmg",
      component: UserMg
    },
    {
      path: "/roomsmg",
      name: "roomsmg",
      component: RoomMg
    }
  ]
});
