<template>
  <!-- <Sliderimage></Sliderimage> -->
  <v-layout row align-center justify-center>
    <!-- <v-flex xs8>
      <v-list-tile avatar :color=colortxt :class=colorbgtitle>
        Bảng Nhân Viên
      </v-list-tile>
      <listroom></listroom>
    </v-flex> -->

    <v-flex md2 class="green">

    </v-flex>

  </v-layout>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "../components/HelloWorld.vue";
import Sliderimage from "../components/Sliderimage.vue";
import Listroom from "../components/Listroom";

import axios from "axios";

export default {
  name: "home",

  data() {
    return {
      colortxt: "light-green lighten-3",
      colorbgtitle: "green lighten-5",
      usersdata: []
    };
  },
  components: {
    HelloWorld,
    Sliderimage,
    Listroom
  },
  created() {
    axios
      .get("http://hotel.test/api/user")
      .then(response => {
        this.usersdata = response.data;
        console.log(this.usersdata);
      })
      .catch(error => console.log(error));
  },
  methods: {}
};
</script>
