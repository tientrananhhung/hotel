<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="700">
      <v-btn slot="activator" flat icon color="blue darken-1">
        <v-icon>edit</v-icon>
      </v-btn>
      <v-card>
        <v-card-title class="light-blue darken-1">
          <span class="headline">{{digInfor.titleEdit}}</span>
          <p></p>
        </v-card-title>
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
                      <v-text-field color="light-blue darken-1" :label="digInfor.name" prepend-icon="border_color" :hint="texthint" v-model="infor.name" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-text-field color="light-blue darken-1" :label="digInfor.phone" prepend-icon="local_phone" :hint="texthint" v-model="infor.phone" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md6>
                      <v-switch color="light-blue darken-1" v-model="infor.isadmin" :label='infor.isadmin !=0 ? "Quản lý" :"Nhân Viên" '></v-switch>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field color="light-blue darken-1" :label="digInfor.email" prepend-icon="email" :hint="texthint" v-model="infor.email" required></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-flex xs12 sm12 md12>
                <v-text-field color="light-blue darken-1" :label="digInfor.address" prepend-icon="location_on" :hint="texthint" v-model="infor.address" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-menu ref="menu1" :close-on-content-click="false" v-model="menu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                  <v-text-field color="light-blue darken-1" slot="activator" v-model="dateFormatted" label="Ngày Sinh" hint="Định dạng theo : Ngày/Tháng/Năm" persistent-hint prepend-icon="event" @blur="date = parseDate(dateFormatted)"></v-text-field>
                  <v-date-picker color="light-blue darken-1" v-model="infor.date" no-title @input="menu = false"></v-date-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialogdel = true" flat color="red accent-2">Xóa Nhân Viên</v-btn>
          <v-dialog v-model="dialogdel" max-width="350">
            <v-card>
              <v-card-title class="white--text blue lighten-1 headline">Xóa Nhân Viên</v-card-title>
              <v-card-text>
                Bạn có muốn xóa nhân viên {{infor.name}} ?
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat="flat" @click="dialogdel = false">
                  Trở Lại
                </v-btn>
                <v-btn color="blue darken-1" flat="flat" @click="deluser()">
                  Xóa
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="getoldroom()">Đóng</v-btn>
          <v-btn color="blue darken-1" flat @click.native="setinfor()">Cập Nhật Chỉnh Sửa</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      dialogdel: false,
      titlebox: "",
      texthint: "Đây là trường bắt buộc không được để trống",
      infor: {},
      inforold: {},
      digInfor: {},
      isadmin: 0,
      date: null,
      dateFormatted: null,
      menu: false
    };
  },
  props: {
    item: {
      type: Object
    },
    dialoginfor: { type: Object }
  },
  created() {},
  mounted() {
    this.infor = this.item;
    this.digInfor = this.dialoginfor;
    this.date = this.item.birthday;
    // this.inforold = this.room;
  },
  watch: {
    roominfor() {
      return this.room;
    },
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    }
  },
  methods: {
    setinfor() {
      axios
        .put("/user/" + this.infor.id, {
          name: this.infor.name,
          isadmin: this.infor.isadmin,
          email: this.infor.email,
          password: "123456",
          address: this.infor.address,
          birthday: this.infor.date,
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
    deluser() {
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
    // xử lí lấy lịch sử phòng để chèn lại khi đóng nút hủy
    getoldroom() {
      this.inforold = this.detailroom;
      this.dialog = false;
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
