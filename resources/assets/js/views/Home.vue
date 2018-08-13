<template>
  <!-- <Sliderimage></Sliderimage> -->
  <v-container grid-list-lg>
    <v-layout row wrap align-center justify-center>

      <v-flex v-for="i in status" :key=i.name xs3>
        <v-card dark :color=i.color>
          <v-card-actions @click.stop="card1 = !card1">
            <v-card-text class="px-6">{{i.name}}
            </v-card-text>
          </v-card-actions>
          <p class="headline">{{i.num}}</p>
        </v-card>

      </v-flex>
      <v-flex xs12>
        <v-flex elevation-2 xs12 class="light-green lighten-2">
          <v-layout row wrap>
            <v-flex xs7>
              <v-card-text class="headline">Danh sách phòng chưa đặt</v-card-text>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs5>

              <v-text-field label="Tìm kiếm" append-outer-icon="search"></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-container elevation-2 id="scroll-target" style="max-height: 350px" class="scroll-y">
          <v-layout v-scroll:#scroll-target="onScroll" column align-center justify-center style="height: 1000px">
            <list-room v-show="card1"></list-room>
          </v-layout>
        </v-container>

      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
// @ is an alias to /src
import ListRoom from "../components/Listroom.vue";
import HelloWorld from "../components/HelloWorld.vue";
import Sliderimage from "../components/Sliderimage.vue";

import axios from "axios";
import Vue from "vue";

export default {
  components: {
    HelloWorld,
    Sliderimage,
    ListRoom
  },
  data() {
    return {
      colortxt: "light-green lighten-3",
      colorbgtitle: "light-green lighten-2",
      urlgetdata: "",
      card1: true,
      card2: true,
      status: [
        { name: "Phòng đã đặt", color: "deep-orange lighten-1", num: 15 },
        { name: "Phòng chưa đặt", color: "light-green lighten-2", num: 35 },
        { name: "Nhân viên", color: "cyan lighten-3", num: 3 },
        { name: "All Oder", color: "indigo lighten-2", num: 8 }
      ]
    };
  },
  created() {
    // get rooms
    axios
      .get("http://hotel.test/api/room")
      .then(response => {
        this.$store.state.arrrooms = response.data;
        console.log("home");
        console.log(this.$store.state.arrrooms);
      })
      .catch(error => console.log(error));
  },
  methods: {
    setStatus() {}
  }
};
</script>
