<template>
  <v-layout pa-3 mb-5 column>

    <v-toolbar class="elevation-1" flat color="blue--text grey lighten-3">
      <v-toolbar-title>Nhân Viên</v-toolbar-title>
      <v-btn fab flat small color="blue" @click="getData()">
        <v-icon>autorenew</v-icon>
      </v-btn>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-text-field v-model="pagination.keyword" color="white--text blue lighten-1" label="Tìm kiếm nhân viên" append-icon="search" style="margin-top: 20px"></v-text-field>
      <v-spacer></v-spacer>
      <dialog-add-user style="margin-top: 50px" :dialoginfor="dialoginfor"></dialog-add-user>
    </v-toolbar>

    <v-data-iterator mt-4 :items="users.data" :search="pagination.keyword" :pagination.sync="pagination" content-tag="v-layout" hide-actions :total-items="users.total" :loading="loading" row wrap>
      <v-flex slot="item" slot-scope="props" xs12 sm6 ma4 lg3>
        <v-card>
          <v-layout row wrap>
            <v-flex xs10>
              <v-card-title class="align-center subheading font-weight-bold">{{ props.item.name }}</v-card-title>
            </v-flex>
            <v-flex xs1>
              <dialog-edit-user :item="props.item" :dialoginfor="dialoginfor"></dialog-edit-user>
            </v-flex>

          </v-layout>

          <v-divider></v-divider>

          <v-list dense>
            <v-list-tile>
              <v-avatar ma-3 :tile="false" :size="40" color="grey lighten-4">
                <img src="images/person.png" alt="avatar">
              </v-avatar>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-content>Số điện Thoại :</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.phone }}</v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-content>Email :</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.email }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>Địa chỉ :</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.address }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-data-iterator>

    <div class="text-xs-center pt-2">
      <v-pagination color="white--text blue darken-1" v-model="pagination.page" :length="users.last_page" circle></v-pagination>
    </div>

  </v-layout>

</template>

<script>
import DialogEditUser from "./DialogUsers/DialogEditUser.vue";
import DialogAddUser from "./DialogUsers/DialogAddUser.vue";
import axios from "axios";
import Vue from "vue";

export default {
  components: {
    DialogEditUser,
    DialogAddUser
  },
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
          text: "Địa chỉ mail",
          sortable: false,
          value: "email",
          align: "right"
        },
        { text: "Thao Tác", sortable: false, align: "center" }
      ],
      users: {},
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
        .get("/user?limit=8", {
          params: withPagination ? this.pagination : null
        })
        .then(response => {
          this.users = response.data;
          this.loading = false;
          // console.log("LOG", this.users);
        });
    }
  },
  computed: {}
};
</script>

