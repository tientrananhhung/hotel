<template>
  <v-expansion-panel>
    <v-expansion-panel-content v-for="i in rooms" :key="i.id" expand-icon="mdi-menu-down">
      <div @click="roominfor(i)" slot="header">{{i.name}}</div>
      <v-card>
        <v-card-text class="grey lighten-3">
          Kiểu phòng là : {{i.type}} | Địa chỉ là : {{i.price}} .
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  data() {
    return {
      arr: []
    };
  },
  props: {},
  computed: {
    rooms() {
      return this.$store.state.arrrooms;
    }
  },
  methods: {
    roominfor(item) {
      var id = item.id;
      var name = item.name;
      var note = item.note;
      var price = item.price;
      var status = item.status;
      var type = item.type;

      alert("id :" + id + " \n" + "name :" + name + "\n" + "giá :" + price);
    }
  },
  created() {
    console.log(this.rooms);
  }
};
</script>
