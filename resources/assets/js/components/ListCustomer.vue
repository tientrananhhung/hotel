<template>
  <v-layout column>
    <v-layout pl-4 pr-4 mb-1 column>
      <v-card color="blue--text">

        <v-card-title class="align-center display-1 font-weight-bold">
          <v-toolbar flat color="white">
            <v-toolbar-title style="margin-left:-25px" class="text-xs-center blue--text display-1">
              Khách Hàng
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-fab-transition>
              <v-tooltip dark="" color="blue lighten-1" bottom="">
                <v-btn slot="activator" flat fab color="blue lighten-1" dark @click="getData()">
                  <v-icon>autorenew</v-icon>
                </v-btn>
                <span>Tải lại dữ liệu khách hàng</span>
              </v-tooltip>
            </v-fab-transition>

          </v-toolbar>

          <v-flex xs12>
            <v-divider></v-divider>

            <v-layout pt-2 row wrap class="body-1">

              <v-flex xs12 sm5 md4 lg4>
                <v-text-field v-model="pagination.keyword" color="white--text blue lighten-1" label="Tìm khách hàng" append-icon="search"></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card-title>

        <v-card-text>
          <v-data-table :loading="loading" :headers="headers" :items="customer.data" :search="pagination.keyword" :pagination.sync="pagination" :total-items="customer.total" hide-actions>
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
              <td>
                <v-avatar ma-3 :tile="false" :size="40" color="grey lighten-4">
                  <img src="images/customer.png" alt="avatar">
                </v-avatar>
              </td>
              <td class="text-xs-right">{{ props.item.name }}</td>
              <td class="text-xs-right">{{ props.item.phone }}</td>
              <td class="text-xs-right">{{ props.item.identity_card }}</td>
              <td class="text-xs-right">
                {{ props.item.email }}
              </td>
            </template>
          </v-data-table>
          <div class="text-xs-center pt-2">
            <v-pagination color="white--text blue darken-1" v-model="pagination.page" :length="customer.last_page" circle></v-pagination>
          </div>
        </v-card-text>

      </v-card>

    </v-layout>
  </v-layout>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      dialoginfor: {
        titlebtnadd: "Thêm Nhân Viên Mới",
        titleEdit: "Chỉnh sửa Nhân Viên",
        titleAdd: "Thêm Nhân Viên",
        titleDel: "Xóa Nhân Viên",
        name: "Điền Họ Tên Nhân Viên",
        birthday: "Ngày Sinh",
        address: "Địa Chỉ",
        phone: "Số Điện Thoại",
        avatar: "Hình Đại Diện",
        email: "Email",
        isadmin: "Quyền Nhân Viên"
      },
      headers: [
        { text: "Avartar", sortable: false, value: "avartar" },
        { text: "Họ và Tên", sortable: false, value: "name", align: "right" },
        {
          text: "Số điện thoại",
          sortable: false,
          value: "phone",
          align: "right"
        },
        {
          text: "Số CMND",
          sortable: false,
          value: "email",
          align: "right"
        },
        { text: "Email", sortable: false, align: "right" }
      ],
      customer: {},
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
        .get("/customer?limit=7", {
          params: withPagination ? this.pagination : null
        })
        .then(response => {
          this.customer = response.data;
          this.loading = false;
          // console.log("LOG", this.customer);
        });
    }
  },
  computed: {}
};
</script>

