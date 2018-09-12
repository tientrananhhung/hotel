<template>
  <v-layout column>
    <v-layout pr-4 mb-2 column>
      <v-card color="blue--text">

        <v-card-title class="align-center display-1 font-weight-bold">

          <v-toolbar flat color="white">
            <v-toolbar-title style="margin-left:-25px" class="text-xs-center blue--text display-1">
              Dịch Vụ
            </v-toolbar-title>
            <dialog-add style="margin-left: -20px"></dialog-add>
            <v-spacer></v-spacer>
            <v-btn fab flat small color="blue" @click="getData()">
              <v-icon>autorenew</v-icon>
            </v-btn>
          </v-toolbar>

          <v-flex xs12>
            <v-divider></v-divider>
            <v-layout pt-2 row wrap class="body-1">
              <v-flex xs12>
                <v-text-field v-model="pagination.keyword" color="white--text blue lighten-1" label="Tìm kiếm" append-icon="search"></v-text-field>
              </v-flex>

            </v-layout>
          </v-flex>

        </v-card-title>

        <v-card-text>
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
              <td class="text-xs-left">{{ props.item.price | currency }}</td>
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
        </v-card-text>
      </v-card>
    </v-layout>
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
  filters: {
    currency(value) {
      var formatter = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0
      });
      return formatter.format(value);
    }
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
