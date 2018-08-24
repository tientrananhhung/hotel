<template>
    <v-content>
        <Toolbar></Toolbar>
        <router-view/>
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
