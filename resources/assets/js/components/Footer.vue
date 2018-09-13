<template>
  <v-footer dark height="auto">
    <v-card-text class="text-xs-center white--text blue lighten-1">
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