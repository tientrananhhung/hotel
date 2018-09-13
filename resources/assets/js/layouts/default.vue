<template>
  <div class="fill-height">
    <Toolbar></Toolbar>
    <v-content class="fill-height">
      <v-breadcrumbs pl-3>
        <v-icon slot="divider">chevron_right</v-icon>
        <v-breadcrumbs-item v-for="(item,index) in $route.matched" v-if="item.meta" :to="'/'+item.path" :key="index+'bread'">
          {{ item.meta.title }}
        </v-breadcrumbs-item>
      </v-breadcrumbs>
      <router-view height="500" />
    </v-content>
    <Footer></Footer>
  </div>
</template>

<script>
import Toolbar from "../components/Toolbar.vue";
import Footer from "../components/Footer.vue";
export default {
  data() {
    return {
      items: [
        {
          text: "Home",
          disabled: false
        },
        {
          text: "Quản lý Phòng",
          disabled: false
        }
      ]
    };
  },
  components: {
    Toolbar,
    Footer
  }
};
</script>

<style>
</style>
