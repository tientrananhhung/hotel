<template>
  <!-- <Sliderimage></Sliderimage> -->
  <v-container grid-list-lg>
    <v-layout row wrap align-center justify-center>

      <v-flex v-for="i in status" :key=i.name xs3>
        <v-card dark :color=i.color>
          <v-card-text class="px-6">{{i.name}}
          </v-card-text>
          <div class="headline">{{i.num}}</div>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <list-room :usersdatas=usersdatas></list-room>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
// @ is an alias to /src
import HelloWorld from "../components/HelloWorld.vue";
import Sliderimage from "../components/Sliderimage.vue";
import ListRoom from "../components/Listroom";

import axios from "axios";

export default {
  name: "home",

  data() {
    return {
      colortxt: "light-green lighten-3",
      colorbgtitle: "green lighten-5",
      urlgetdata: "",
      usersdatas: [],
      status: [
        { name: "Phòng đã đặt", color: "red", num: 15 },
        { name: "Phòng chưa đặt", color: "green", num: 35 },
        { name: "Nhân viên đang book", color: "yellow", num: 3 }
      ]
    };
  },
  components: {
    HelloWorld,
    Sliderimage,
    ListRoom
  },
  created() {
    axios
      .get("http://hotel.test/api/user")
      .then(response => {
        this.usersdata = response.data;
        console.log(response.data);
      })
      .catch(error => console.log(error));
  },
  methods: {}
};
</script>
