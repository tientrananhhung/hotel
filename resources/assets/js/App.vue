<template>
  <v-app>
    <!-- <Toolbar></Toolbar> -->
    <router-view/>
    <!-- <Footer></Footer> -->
    <v-snackbar bottom right :timeout="$store.state.snackbar.timeout" :color="$store.state.snackbar.type" v-model="$store.state.snackbar.status">
      {{$store.state.snackbar.content}}
      <!-- <v-btn flat color="primary" @click.native="value = false">Close</v-btn> -->
    </v-snackbar>
  </v-app>
</template>
<script>
export default {
  created() {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
