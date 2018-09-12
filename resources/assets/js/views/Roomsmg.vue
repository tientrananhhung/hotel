<template>
  <v-layout row wrap>
    <v-flex xs12 sm12 md7 lg7>
      <list-rooms></list-rooms>
    </v-flex>
    <v-flex xs12 sm12 md5 lg5>
      <list-services></list-services>
    </v-flex>
  </v-layout>
</template>

<script>
import ListRooms from "../components/ListRooms";
import ListServices from "../components/ListServices";

export default {
  components: {
    ListRooms,
    ListServices
  }
};
</script>
