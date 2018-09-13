<template>
  <v-app>
    <router-view/>
    <v-snackbar bottom right :timeout="$store.state.snackbar.timeout" :color="$store.state.snackbar.type" v-model="$store.state.snackbar.status">
      {{$store.state.snackbar.content}}
    </v-snackbar>
  </v-app>
</template>
<script>
export default {
  created() {}
};
</script>

<style>
a {
  text-decoration: none;
}
a.router-link-exact-active {
  color: rgb(15, 66, 124);
  text-decoration-style: solid;
}
</style>
