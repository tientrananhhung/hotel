<template>
  <v-layout row wrap>
    <v-data-table :headers="headers" :items="room0s" hide-actions class="elevation-2">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.type }}</td>
        <td class="text-xs-right">{{ props.item.price }}</td>
        <td class="text-xs-right">
          <dialog-room :room="props.item"></dialog-room>
        </td>
        <td class="text-xs-right">
          <dialog-del-room></dialog-del-room>
        </td>
      </template>
    </v-data-table>
  </v-layout>
</template>

<script>
import DialogRoom from "./DialogRoom/Dialogroom.vue";
import DialogDelRoom from "./DialogRoom/Dialogdelroom.vue";
export default {
  components: {
    DialogRoom,
    DialogDelRoom
  },
  data() {
    return {
      arr: [],
      flagdialog: false,
      headers: [
        {
          text: "Tên Phòng",
          align: "left",
          sortable: false,
          value: "name"
        },

        { text: "Loại Phòng", sortable: false },
        { text: "Giá phòng", sortable: false },
        { text: "Chỉnh sửa", sortable: false },
        { text: "Xóa Phòng", sortable: false }
      ]
    };
  },
  props: {},
  computed: {
    room0s() {
      return this.$store.state.arrrooms;
    },
    room1s() {
      var rooms = this.$store.state.arrrooms.filter(t => !t.status);
      return rooms;
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
    }
  },
  created() {}
};
</script>
