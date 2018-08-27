<template>
  <v-footer dark height="auto">
    <v-card flat tile class="blue lighten-5 white--text text-xs-center">

    </v-card>
    <v-card-text class="white--text blue lighten-1">
      &copy; 2018 -
      <strong>{{make}}</strong>
    </v-card-text>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    make: "Hotel Manager"
  })
};
</script>