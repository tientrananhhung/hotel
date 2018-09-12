<template>
  <v-layout column>
    <v-layout pl-4 pr-4 mb-1 column>

      <v-card color="blue--text">

        <v-card-title class="align-center display-1 font-weight-bold">
          <v-toolbar flat color="white">
            <v-toolbar-title style="margin-left:-25px" class="text-xs-center blue--text display-1">
              Nhân viên
            </v-toolbar-title>
            <dialog-add-user style="margin-top:-17px; margin-left:-25px" :dialoginfor="dialoginfor"></dialog-add-user>
            <v-spacer></v-spacer>

            <v-fab-transition>
              <v-tooltip dark="" color="blue lighten-1" bottom="">
                <v-btn slot="activator" flat fab color="blue lighten-1" dark @click="getData()">
                  <v-icon>autorenew</v-icon>
                </v-btn>
                <span>Tải lại dữ liệu nhân viên</span>
              </v-tooltip>
            </v-fab-transition>

          </v-toolbar>

          <v-flex xs12>
            <v-divider></v-divider>

            <v-layout row wrap class="body-1">

              <v-flex xs12 sm5 md4 lg4>
                <v-text-field @keyup.enter="pagination.keyword = search" v-model="search" color="white--text blue lighten-1" label="Tìm kiếm nhân viên" append-icon="search"></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card-title>

        <v-card-text>
          <v-data-iterator :items="users.data" :search="pagination.keyword" :pagination.sync="pagination" content-tag="v-layout" hide-actions :total-items="users.total" :loading="loading" row wrap>
            <v-flex slot="item" slot-scope="props" xs12 sm6 ma4 lg3>
              <v-card>
                <v-card-title class="align-center subheading font-weight-bold">
                  <v-list-tile-content>
                    {{ props.item.name }}
                  </v-list-tile-content>
                  <v-list-tile-content class="align-end">

                    <v-fab-transition>
                      <v-tooltip dark="" color="blue lighten-1" bottom="">
                        <v-btn style="margin-right:-2px" small @click="dialog = !dialog; infor = props.item ; date = props.item.birthday" slot="activator" flat fab color="blue lighten-1" dark>
                          <v-icon>info</v-icon>
                        </v-btn>
                        <span>Thông tin chi tiết</span>
                      </v-tooltip>
                    </v-fab-transition>

                  </v-list-tile-content>
                </v-card-title>

                <v-divider></v-divider>

                <v-list dense>
                  <v-list-tile>
                    <v-avatar ma-3 :tile="false" :size="40" color="grey lighten-4">
                      <img src="images/personx96.png" alt="avatar">
                    </v-avatar>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>Số điện Thoại :</v-list-tile-content>
                    <v-list-tile-content class="align-end font font-weight-bold ">{{ props.item.phone }}</v-list-tile-content>
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
        </v-card-text>

        <v-dialog v-model="dialog" persistent max-width="700">
          <v-card>
            <v-card-title dark class="blue--text title text-uppercase">{{dialoginfor.titleEdit}}</v-card-title>
            <v-divider></v-divider>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>

                  <v-layout wrap>
                    <v-flex xs4 md4>
                      <v-flex ma-4 xs12 sm6 md8 align-center justify-center layout>
                        <v-avatar :size="150" color="grey lighten-4">
                          <img src="images/personx96.png" alt="avatar">
                        </v-avatar>
                      </v-flex>
                    </v-flex>
                    <v-flex xs8 md8>
                      <v-layout row wrap>
                        <v-flex xs12 sm12 md12>
                          <v-text-field color="light-blue darken-1" :label="dialoginfor.name" prepend-icon="border_color" :hint="texthint" v-model="infor.name" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-text-field color="light-blue darken-1" :label="dialoginfor.phone" prepend-icon="local_phone" :hint="texthint" v-model="infor.phone" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-switch color="light-blue darken-1" v-model="dialoginfor.isadmin" :label='infor.isadmin !=0 ? "Quản lý" :"Nhân Viên" '></v-switch>
                        </v-flex>
                        <v-flex xs12 sm12 md12>
                          <v-text-field color="light-blue darken-1" :label="dialoginfor.email" prepend-icon="email" :hint="texthint" v-model="infor.email" required></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                  <v-flex xs12 sm12 md12>
                    <v-text-field color="light-blue darken-1" :label="dialoginfor.address" prepend-icon="location_on" :hint="texthint" v-model="infor.address" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-menu ref="menu1" :close-on-content-click="false" v-model="menu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                      <v-text-field color="light-blue darken-1" slot="activator" v-model="dateFormatted" label="Ngày Sinh" hint="Định dạng theo : Ngày/Tháng/Năm" persistent-hint prepend-icon="event" @blur="date = parseDate(dateFormatted)"></v-text-field>
                      <v-date-picker color="light-blue darken-1" v-model="date" no-title @input="menu = false"></v-date-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-btn @click="dialogdel = true" flat color="red accent-2">Xóa Nhân Viên</v-btn>
              <v-dialog v-model="dialogdel" max-width="350">
                <v-card>
                  <v-card-title dark class="red--text title text-uppercase">{{dialoginfor.titleDel}}</v-card-title>
                  <v-divider></v-divider>
                  <v-card-text>
                    Bạn có muốn xóa nhân viên {{infor.name}} ?
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat="flat" @click="dialogdel = false">
                      Trở Lại
                    </v-btn>
                    <v-btn color="red darken-1" flat="flat" @click="del()">
                      Xóa
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="dialog = !dialog">Đóng</v-btn>
              <v-btn color="blue darken-1" flat @click.native="update()">Cập Nhật</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-card>

    </v-layout>

  </v-layout>

</template>

<script>
import DialogAddUser from "./DialogUsers/DialogAddUser.vue";

export default {
  components: {
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
      infor: {},
      date: null,
      dateFormatted: null,
      dialog: false,
      dialogdel: false,
      texthint: "không thể bỏ trống",
      menu: false,
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
      search: "",
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
    },
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    },
    search() {
      this.search == "" ? (this.pagination.keyword = "") : null;
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
    },
    update() {
      axios
        .put("/user/" + this.infor.id, {
          name: this.infor.name,
          isadmin: this.infor.isadmin,
          email: this.infor.email,
          password: "123456",
          address: this.infor.address,
          birthday: this.date,
          phone: this.infor.phone
        })
        .then(res => {
          if (!res.data.success) {
            this.$store.commit("SNACKBAR", {
              status: true,
              content: "Cập Nhật Nhân Viên Thất Bại",
              type: "error",
              timeout: 1000
            });
          } else {
            this.$store.commit("SNACKBAR", {
              status: true,
              content: "Cập Nhật Thành Công",
              type: "success",
              timeout: 1000
            });
          }
          console.log(res.data);
        })
        .catch(error => {
          console.log(error);
        });
      this.dialog = false;
    },
    del() {
      console.log(this.infor.id);
      axios
        .delete("/user/" + this.infor.id, {})
        .then(res => {
          if (!res.data.success) {
            console.log(this.nameerror);
            this.$store.commit("SNACKBAR", {
              status: true,
              content: "Xóa Thất Bại",
              type: "error",
              timeout: 1000
            });
          } else {
            this.$store.commit("SNACKBAR", {
              status: true,
              content: "Đã xóa nhân viên : " + this.infor.name,
              type: "warning",
              timeout: 1000
            });
          }
          console.log(res.data);
        })
        .catch(error => {
          console.log(error);
        });
      this.dialogdel = false;
    },

    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },

    parseDate(date) {
      if (!date) return null;
      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  }
};
</script>