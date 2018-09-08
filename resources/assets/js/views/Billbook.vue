<template>
  <v-layout row wrap>
    <v-card>

    </v-card>
  </v-layout>
</template>

<script>
export default {
  created() {
    axios
      .get("/bill?keyword=Tuấn Anh")
      .then(result => {
        console.log("Customer :", result.data.data[0].order.customer);
        console.log("Room :", result.data.data[0].order.room);
        console.log("User :", result.data.data[0].order.user);
        console.log("Oder :", result.data.data[0].order);
        console.log("Bill :", result.data.data[0]);
      })
      .catch(err => {});
  }
};
</script>

