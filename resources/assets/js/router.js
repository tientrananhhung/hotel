import Vue from "vue";
import Router from "vue-router";
import Default from "./layouts/default";
import Home from "./views/Home";
import Login from "./views/Login.vue";
import UserMg from "./views/Usersmg.vue";
import RoomMg from "./views/Roomsmg.vue";
import Customer from "./views/Customersmg.vue";
import Booking from "./views/Booking.vue";
import Oders from "./views/Oders.vue";
import Billbook from "./views/Billbook.vue";

Vue.use(Router);

const route = new Router({
  routes: [
    {
      path: "/",
      component: Default,
      meta: {
        auth: true,
        title: "Home"
      },
      children: [
        {
          path: "/",
          name: "Home",
          component: Home,
          meta: {
            auth: true
          }
        },
        {
          path: "/usersmg",
          name: "Usersmg",
          component: UserMg,
          meta: {
            title: "Quản Lý Nhân Viên"
          }
        },
        {
          path: "/roomsmg",
          name: "Roomsmg",
          component: RoomMg,
          meta: {
            title: "Quản Lý Phòng"
          }
        },
        {
          path: "/customer",
          name: "Customer",
          component: Customer,
          meta: {
            title: "Danh Sách Khách Hàng"
          }
        },
        {
          path: "/booking",
          name: "Booking",
          component: Booking,
          meta: {
            title: "Đặt Phòng"
          }
        },
        {
          path: "/oders",
          name: "Oders",
          component: Oders,
          meta: {
            title: "Danh Sách Đơn Đặt"
          }
        },
        {
          path: "/billbook",
          name: "Billbook",
          component: Billbook,
          meta: {
            title: "Thanh Toán"
          }
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
  // console.log(to.name);
  let token = localStorage.getItem("token");
  if (to.matched[0].meta && to.matched[0].meta.auth) {
    //checktoken
    if (token) {
      next(true);
    } else {
      next(false);
    }
  } else {
    if (token && to.name === "Login") {
      // console.log(
      //   "Chuyển đến trang Home khi nhấp đến Trang Login đã lưu token"
      // );
      next(false);
    } else {
      next(true);
    }
  }
});
export default route;
