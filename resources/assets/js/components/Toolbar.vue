<template>
  <v-layout row wrap id="linebar">
    <v-flex xs12>
      <v-card class="white--text light-green darken-1" flat height="auto" fixed tile>
        <v-toolbar dense class="white--text light-green darken-1">
          <v-toolbar-side-icon @click.stop="drawer = !drawer">
          </v-toolbar-side-icon>
          <v-toolbar-title>
            <router-link to="/">{{myname}}</router-link>
          </v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>grade</v-icon>
          </v-btn>

          <router-link to="/login">
            <v-btn icon>
              <v-icon>perm_identity</v-icon>
            </v-btn>
          </router-link>
          <router-link to="/about">
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </router-link>

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
            <img src="https://yt3.ggpht.com/-TyxgQYDx-lI/AAAAAAAAAAI/AAAAAAAAAAA/UwM3eRMLuKM/s88-c-k-no-mo-rj-c0xffffff/photo.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>Bùi Anh Tuấn</v-list-tile-title>
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

        <v-list-tile v-for="item in items" :key="item.title">
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
      drawer: null,
      myname: "Hotel Manager",
      mini: false,
      right: null,
      items: [
        { title: "Bảng Điều Kiển", icon: "donut_small", link: "/home" },
        { title: "Quản lý Phòng", icon: "meeting_room", link: "/" },
        {
          title: "Quản lý Nhân Viên",
          icon: "assignment_ind",
          link: "/usersmg"
        }
      ]
    };
  },
  components: {},
  methods: {},
  computed: {},
  watch: {}
};
</script>


<style>
#linebar a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

#linebar a.router-link-exact-active {
  color: whitesmoke;
}
#navigation {
  background-color: rgb(21, 75, 92);
}
</style>
