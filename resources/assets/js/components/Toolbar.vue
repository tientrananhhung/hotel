<template>
  <v-layout row wrap id="linebar">
    <v-flex xs12>
      <v-card id="hearbar" class="white--text" flat fixed tile>
        <v-toolbar class="white--text blue lighten-1">
          <v-toolbar-side-icon @click.stop="drawer = !drawer">
          </v-toolbar-side-icon>
          <v-toolbar-title color="white--text">
            <router-link to="/">{{$store.state.user.isadmin ? "Quản lý : "+$store.state.user.name : "Nhân viên : "+$store.state.user.name}}</router-link>
          </v-toolbar-title>
          <v-spacer></v-spacer>

          <router-link to="login">
            <v-btn icon>
              <v-icon color="white">perm_identity</v-icon>
            </v-btn>
          </router-link>
          <v-btn icon @click="dialog = true">
            <v-icon color="white">power_settings_new</v-icon>
          </v-btn>
          <v-dialog v-model="dialog" max-width="350">
            <v-card>
              <v-card-title class="white--text blue lighten-1 headline">Thoát Ứng Dụng</v-card-title>
              <v-card-text>
                Bạn có muốn đăng xuất khỏi tài khoản này ?
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat="flat" @click="dialog = false">
                  Trở Lại
                </v-btn>
                <v-btn color="blue darken-1" flat="flat" @click="logout()">
                  Đăng Xuất
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </v-card>
    </v-flex>
    <v-navigation-drawer v-model="drawer" :mini-variant="mini" absolute temporary color="primary">
      <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>

        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="images/person.png">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{$store.state.user.name}}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider light></v-divider>

        <v-list-tile v-for="item in items" :key="item.title" v-if="item.role.includes(is_admin)">
          <router-link :to=item.link>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
          </router-link>
          <router-link :to=item.link>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </router-link>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      userlogin: "Admin",
      drawer: null,
      myname: "Hotel Manager",
      mini: false,
      right: null,
      items: [
        {
          title: "Bảng Điều Kiển",
          icon: "donut_small",
          link: "/",
          role: ["admin", "user"]
        },
        {
          title: "Phòng và Dịch Vụ",
          icon: "meeting_room",
          link: "/roomsmg",
          role: ["admin"]
        },
        {
          title: "Nhân Viên",
          icon: "assignment_ind",
          link: "/usersmg",
          role: ["admin"]
        },
        {
          title: "Khách Hàng",
          icon: "supervisor_account",
          link: "/customer",
          role: ["admin", "user"]
        },
        {
          title: "Đặt Phòng",
          icon: "book",
          link: "/booking",
          role: ["admin", "user"]
        },
        {
          title: "Thanh Toán",
          icon: "payment",
          link: "/billbook",
          role: ["admin", "user"]
        }
      ],
      dialog: false
    };
  },
  components: {},
  methods: {
    logout() {
      this.$store.dispatch("signOut");
      this.dialog = false;
      this.$store.commit("SNACKBAR", {
        status: true,
        content: "Đã Đăng Xuất Khỏi Ứng Dụng",
        type: "warning",
        timeout: 2000
      });
    }
  },
  computed: {
    is_admin() {
      return this.$store.state.user.isadmin ? "admin" : "user";
    }
  },
  watch: {}
};
</script>


<style>
#linebar a {
  font-weight: bold;
  color: #494949;
  text-decoration: none;
}
#hearbar a {
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
}

#linebar a.router-link-exact-active {
  color: rgb(0, 41, 155);
}
#navigation {
  background-color: rgb(21, 75, 92);
}
</style>
