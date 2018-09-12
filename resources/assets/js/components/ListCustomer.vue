<template>
  <v-layout pa-3 mb-5 column>
    <v-toolbar class="elevation-1" flat color="blue--text grey lighten-3">
      <v-toolbar-title>Danh Sách Khách Hàng</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-text-field v-model="pagination.keyword" color="blue--text blue lighten-1" label="Tìm kiếm" append-outer-icon="search" style="margin-top: 20px"></v-text-field>
      <v-spacer></v-spacer>
      <v-btn fab flat small color="blue" @click="getData()">
        <v-icon>autorenew</v-icon>
      </v-btn>
    </v-toolbar>
    <v-data-table :loading="loading" :headers="headers" :items="customer.data" :search="pagination.keyword" :pagination.sync="pagination" :total-items="customer.total" class="elevation-1" hide-actions>
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

