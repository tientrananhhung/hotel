<template>
  <v-layout pl-4 pr-4 mb-2 column>
    <v-layout class="elevation-1" row wrap>
      <v-toolbar flat color="blue--text grey lighten-3">
        <v-toolbar-title>Bảng Dịch Vụ</v-toolbar-title>
        <v-btn fab flat small color="blue" @click="getData()">
          <v-icon>autorenew</v-icon>
        </v-btn>
        <v-spacer></v-spacer>

      </v-toolbar>
      <v-toolbar flat color="blue--text grey lighten-3">
        <v-flex xs8>
          <v-text-field v-model="pagination.keyword" color="white--text blue lighten-1" label="Tìm kiếm" append-icon="search" style="margin-top: 10px"></v-text-field>
        </v-flex>
        <v-divider class="mx-3" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <dialog-add style="margin-top: -35px"></dialog-add>
      </v-toolbar>
    </v-layout>

    <v-data-table :loading="loading" :headers="headers" :items="infor.data" :search="pagination.keyword" :pagination.sync="pagination" :total-items="infor.total" hide-actions class="elevation-1">
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
        <td class="text-xs-left">{{ props.item.price }}</td>
        <td class="text-xs-right">
          <v-layout row wrap>
            <v-spacer></v-spacer>
            <dialog-edit :room="props.item"></dialog-edit>
          </v-layout>
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination color="white--text blue darken-1" v-model="pagination.page" :length="infor.last_page" circle></v-pagination>
    </div>
  </v-layout>
</template>

<script>
import DialogEdit from "./DialogServices/DialogEditService";
import DialogAdd from "./DialogServices/DialogAddService";

export default {
  components: {
    DialogEdit,
    DialogAdd
  },
  data() {
    return {
      headers: [
        {
          text: "Tên dịch vụ",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Giá ", sortable: false, value: "type", align: "left" },
        { text: "Thao tác", sortable: false, align: "center" }
      ],
      infor: {},
      pagination: {},
      loading: false
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
        .get("/service?limit=6", {
          params: withPagination ? this.pagination : null
        })
        .then(response => {
          this.infor = response.data;
          this.loading = false;
          // console.log("LOG", this.infor.data);
        });
    }
  },
  computed: {}
};
</script>
