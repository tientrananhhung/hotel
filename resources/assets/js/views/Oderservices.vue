<template>
  <v-layout row wrap>

  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      Oder: {}
    };
  },
  created() {
    axios
      .get("/order?limit=4", {})
      .then(result => {
        console.log(result);
      })
      .catch(err => {});
  }
};
</script>

