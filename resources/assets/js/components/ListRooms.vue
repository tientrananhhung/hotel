<template>
  <v-layout pl-4 pr-4 mb-2 column>
    <v-layout class="elevation-1" row wrap>
      <v-toolbar flat color="blue--text grey lighten-3">
        <v-toolbar-title>Bảng Phòng</v-toolbar-title>
        <v-btn fab flat small color="blue" @click="getData()">
          <v-icon>autorenew</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-toolbar flat color="blue--text grey lighten-3">
        <v-flex xs5>
          <v-text-field v-model="pagination.keyword" color="white--text blue lighten-1" label="Tìm kiếm" append-icon="search" style="margin-top: 10px"></v-text-field>
        </v-flex>
        <v-divider class="mx-3" inset vertical></v-divider>
        <v-flex xs4>
          <v-combobox v-model="pagination.keyword" :items="items" chips label="Loại phòng">
            <template slot="selection" slot-scope="data">
              <v-chip :selected="data.selected" :disabled="data.disabled" :key="JSON.stringify(data.item)" class="v-chip--select-multi " @input="data.parent.selectItem(data.item)">
                <v-avatar class="accent white--text">
                  {{ data.item.slice(0, 1).toUpperCase() }}
                </v-avatar>
                {{ data.item }}
              </v-chip>
            </template>
          </v-combobox>
        </v-flex>
        <v-spacer></v-spacer>
        <dialog-add-room style="margin-top: -35px"></dialog-add-room>
      </v-toolbar>
    </v-layout>

    <v-data-table :loading="loading" :headers="headers" :items="rooms.data" :search="pagination.keyword" :pagination.sync="pagination" :total-items="rooms.total" class="elevation-1" hide-actions>
      <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
          <span slot="activator">
            {{ props.header.text }}
          </span>
          <span>
            {{ props.header.text }}
          </span>
        </v-tooltip>
      </template>
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.type }}</td>
        <td class="text-xs-left">{{ props.item.price }}</td>
        <td class="text-xs-right">
          <v-layout row wrap>
            <v-spacer></v-spacer>
            <dialog-edit-room :room="props.item"></dialog-edit-room>
          </v-layout>
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination color="white--text blue darken-1" v-model="pagination.page" :length="rooms.last_page" circle></v-pagination>
    </div>
  </v-layout>
</template>

<script>
import DialogEditRoom from "./DialogRoom/Dialogeditroom.vue";
import DialogAddRoom from "./DialogRoom/Dialogaddroom.vue";

export default {
  components: {
    DialogEditRoom,
    DialogAddRoom
  },
  data() {
    return {
      headers: [
        {
          text: "Tên Phòng",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Loại Phòng", sortable: false, value: "type", align: "left" },
        { text: "Giá phòng", sortable: false, value: "price", align: "left" },
        { text: "Thao tác", sortable: false, align: "center" }
      ],
      rooms: {},
      pagination: {},
      loading: false,
      items: ["Phòng Đôi", "Phòng Đơn", "Phòng Gia Đình", "Phòng Vip"]
    };
  },
  created() {
    this.getData();
  },
  mounted() {},
  watch: {
    pagination: {
      handler() {
        this.getData(true);
      },
      deep: true
    }
  },
  methods: {
    getData(withPagination = false) {
      this.loading = true;
      axios
        .get("/room?limit=6", {
          params: withPagination ? this.pagination : null
        })
        .then(response => {
          this.rooms = response.data;
          this.loading = false;
          // console.log("LOG", this.rooms.data);
        });
    }
  },
  computed: {}
};
</script>
