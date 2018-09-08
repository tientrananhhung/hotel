<template>
  <v-container fluid grid-list-md>
    <list-users></list-users>
  </v-container>
</template>

<script>
import ListUsers from "../components/ListUser";

export default {
  components: {
    ListUsers
  }
};
</script>

