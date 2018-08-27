<template>
  <v-content>
    <Toolbar></Toolbar>
    <router-view height="500" />
    <Footer></Footer>
  </v-content>
</template>

<script>
import Toolbar from "../components/Toolbar.vue";
import Footer from "../components/Footer.vue";
export default {
  components: {
    Toolbar,
    Footer
  }
};
</script>

<style>
</style>
