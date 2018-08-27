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

    </v-layout>
  </v-container>

</template>

<script>
export default {
  data() {
    return {
      colortxt: "light-green lighten-3",
      colorbgtitle: "light-green lighten-2",
      urlgetdata: "",
      card1: true,
      card2: true,
      status: [
        { name: "Phòng đã đặt", color: "deep-orange lighten-1", num: 0 },
        { name: "Phòng chưa đặt", color: "cyan lighten-1", num: 35 },
        { name: "Nhân viên", color: "pink lighten-1", num: 3 },
        { name: "All Oder", color: "light-green lighten-1", num: 8 }
      ]
    };
  },
  computed: {},
  created() {},
  methods: {
    setStatus() {}
  }
};
</script>
