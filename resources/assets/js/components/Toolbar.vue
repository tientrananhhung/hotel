<template>
  <v-layout row wrap id="linebar">
    <v-flex xs12>
      <v-card class="white--text light-green darken-1" flat height="auto" fixed tile>
        <v-toolbar dense class="white--text light-green darken-1">
          <v-toolbar-side-icon @click.stop="flag = !flag">
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
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      flag: null,
      msg: "Ứng dụng đầu tiên với Vue Js",
      myname: "Hotel Manager",
      mini: false,
      right: null
    };
  },
  methods: {},
  computed: {},
  watch: {
    flag() {
      this.$store.state.drawer = this.flag;
      console.log(this.$store.state.drawer);
    }
  }
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
