<template>
  <v-container grid-list-xs>
    <v-toolbar class="elevation-1" flat color="light-green lighten-2">
      <v-toolbar-title>Mục Quản Lý Nhân Viên</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-text-field v-model="searchQuery" color="light-green darken-1" label="Tìm kiếm" append-outer-icon="search" style="margin-top: 20px"></v-text-field>
      <v-spacer></v-spacer>
      <dialog-add-user style="margin-top: 50px"></dialog-add-user>

    </v-toolbar>
    <v-data-table :headers="headers" :items="users" :search="searchQuery" :pagination.sync="pagination" hide-actions class="elevation-1">
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
        <td>{{ props.item.avatar }}</td>
        <td class="text-xs-right">{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.phone }}</td>
        <td class="text-xs-right">{{ props.item.email }}</td>
        <td class="text-xs-right">
          <dialog-edit-room :room="props.item"></dialog-edit-room>
        </td>
        <td class="text-xs-right">
          <dialog-del-room :room="props.item"></dialog-del-room>
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages" @input="onPageChange" circle></v-pagination>
    </div>
  </v-container>

</template>

<script>
import DialogEditRoom from "./DialogRoom/Dialogeditroom.vue";
import DialogDelRoom from "./DialogRoom/Dialogdelroom.vue";
import DialogAddUser from "./DialogUsers/DialogAddUser.vue";
import axios from "axios";
import Vue from "vue";

export default {
  components: {
    DialogEditRoom,
    DialogDelRoom,
    DialogAddUser
  },
  data() {
    return {
      searchQuery: "",
      pagination: {},
      page: 0,
      flag: true,
      arrclicked: [1],
      headers: [
        { text: "Avartar", align: "left", sortable: false, value: "avartar" },
        { text: "Họ và Tên", value: "name", align: "left" },
        { text: "Số điện thoại", value: "birthday", align: "left" },
        { text: "Địa chỉ mail", value: "address", align: "left" },
        { text: "Chỉnh sửa", align: "left" },
        { text: "Xóa", align: "left" }
      ],
      users: []
    };
  },
  created() {},
  mounted() {
    axios({
      method: "get",
      url: "/api/pusers"
    })
      .then(response => {
        this.users = response.data.data;
        this.pagination.totalItems = response.data.total;
        this.pagination.rowsPerPage = response.data.to;
      })
      .catch(error => console.log(error));
  },
  watch: {
    page() {
      this.page = this.pagination.page;
      this.onPageChange(this.page);
    }
  },
  methods: {
    onPageChange(newPage) {
      this.checkclick(newPage);
      if (this.flag) {
        axios({
          method: "get",
          url: "/api/pusers?page=" + newPage
        })
          .then(response => {
            var arr = this.users.concat(response.data.data);
            Vue.set((this.users = arr));
            this.arrclicked.push(newPage);
          })
          .catch(error => console.log(error));
      } else {
        console.log("đã load xong");
      }
    },
    checkclick(newPage) {
      this.arrclicked.forEach(i => {
        if (i === newPage) this.flag = false;
        console.log(this.flag);
      });
    }
  },
  computed: {
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;

      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    }
  }
};
</script>

