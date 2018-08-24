import Vue from "vue";
import Router from "vue-router";
import Default from "./layouts/default";
import Home from "./views/Home";
import About from "./views/About.vue";
import Login from "./views/Login.vue";
import UserMg from "./views/Usersmg.vue";
import RoomMg from "./views/Roomsmg.vue";

Vue.use(Router);

const route = new Router({
  routes: [
    {
      path: "/",
      component: Default,
      meta: {
        auth: true
      },
      children: [
        {
          path: "/",
          name: "Home",
          component: Home
        },
        {
          path: "/about",
          name: "about",
          component: About
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
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ]
});
route.beforeEach((to, from, next) => {
  if (to.matched[0].meta && to.matched[0].meta.auth) {
    //checktoken
    let token = localStorage.getItem("token");
    if (token) {
      next(true);
      // set chuyển trang về login thì out về home
    } else {
      next(false);
    }
  } else {
    next(true);
  }
});
export default route;
