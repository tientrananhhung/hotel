<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-flex elevation-2 xs12 class="light-green lighten-2">
        <v-layout row wrap>
          <v-flex xs7>
            <v-card-text class="headline">Danh sách phòng chưa đặt</v-card-text>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs5>
            <v-text-field v-model="searchQuery" color="light-green darken-1" label="Tìm kiếm" append-outer-icon="search"></v-text-field>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-container elevation-2 id="scroll-target" style="max-height: 350px" class="scroll-y">
        <v-layout md12 column align-center justify-center style="height: auto; width: 100%">

          <v-layout row wrap>
            <v-data-table :headers="headers" :items="arrrooms" hide-actions class="elevation-2">
              <template slot="items" slot-scope="props">
                <td class="text-xs-left">{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.type }}</td>
                <td class="text-xs-left">{{ props.item.price }}</td>
                <td class="text-xs-right">
                  <dialog-edit-room :room="props.item"></dialog-edit-room>
                </td>
                <td class="text-xs-right">
                  <dialog-del-room :room="props.item"></dialog-del-room>
                </td>
              </template>
            </v-data-table>
          </v-layout>

        </v-layout>
      </v-container>
      <dialog-add-room></dialog-add-room>
    </v-flex>
  </v-layout>

</template>

<script>
import DialogEditRoom from "./DialogRoom/Dialogeditroom.vue";
import DialogDelRoom from "./DialogRoom/Dialogdelroom.vue";
import DialogAddRoom from "./DialogRoom/Dialogaddroom.vue";
import axios from "axios";
export default {
  components: {
    DialogEditRoom,
    DialogDelRoom,
    DialogAddRoom
  },
  data() {
    return {
      arrrooms: [],
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
      ],
      searchQuery: ""
    };
  },
  props: {},
  watch: {},
  computed: {
    // rooms() {
    //   return this.$store.state.arrrooms;
    // },
    // room1s() {
    //   var rooms = this.$store.state.arrrooms.filter(t => !t.status);
    //   return rooms;
    // }
  },
  methods: {},
  created() {
    axios({
      method: "get",
      url: "/api/room"
    })
      .then(response => {
        this.arrrooms = response.data;
      })
      .catch(error => console.log(error));
  },
  mounted() {}
};
</script>
