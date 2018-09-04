<template>
    <v-layout row wrap>
        <v-card-text style=" position: relative">
            <v-fab-transition>
                <v-btn @click="dialog = !dialog" color="blue darken-1" dark absolute top right="">
                    {{digInfor.titleAdd}}
                </v-btn>
            </v-fab-transition>
        </v-card-text>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="700">
                <v-card>
                    <v-card-title class="white--text light-blue darken-1">
                        <span class="headline">{{digInfor.titlebtnadd}}</span>
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
                                                <v-text-field v-model="name" color="light-blue darken-1" prepend-icon="border_color" :label="digInfor.name" :hint="texthint" required></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
                                                <v-text-field v-model="phone" color="light-blue darken-1" prepend-icon="local_phone" :label="digInfor.phone" :hint="texthint" required></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm6 md6>
                                                <v-switch color="light-blue darken-1" v-model="tickbox" :label='tickbox !=0 ? "Quản lý" :"Nhân Viên" '></v-switch>
                                            </v-flex>
                                            <v-flex xs12 sm12 md12>
                                                <v-text-field v-model="email" color="light-blue darken-1" :label="digInfor.email" prepend-icon="email" :hint="texthint" required></v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="address" color="light-blue darken-1" :label="digInfor.address" prepend-icon="location_on" :hint="texthint" required></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-menu ref="menu" :close-on-content-click="false" v-model="menu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
                                        <v-text-field color="light-blue darken-1" slot="activator" v-model="dateFormatted" :label="digInfor.birthday" hint="định dạng DD/MM/YYYY" persistent-hint prepend-icon="event" @blur="date = parseDate(dateFormatted)"></v-text-field>
                                        <v-date-picker color="light-blue darken-1" v-model="date" no-title @input="menu = false"></v-date-picker>
                                    </v-menu>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="light-blue darken-1" flat @click="getoldroom()">Đóng</v-btn>
                        <v-btn color="light-blue darken-1" flat @click.native="setinfor()">Cập Nhật</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </v-layout>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      titlebox: "",
      texthint: "Đây là trường bắt buộc không được để trống",
      infor: {},
      inforold: {},
      digInfor: {},
      tickbox: 0,
      date: null,
      dateFormatted: null,
      menu: false,
      name: "",
      phone: "",
      address: "",
      email: ""
    };
  },
  props: {
    dialoginfor: { type: Object }
  },
  created() {},
  mounted() {
    this.infor = this.item;
    this.digInfor = this.dialoginfor;
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
        .post("/user", {
          name: this.name,
          isadmin: this.tickbox,
          email: this.email,
          password: "123456",
          address: this.address,
          birthday: this.date,
          phone: this.phone
        })
        .then(res => {
          if (!res.data.success) {
            this.$store.commit("SNACKBAR", {
              status: true,
              content: "Thêm Nhân Viên Thất Bại",
              type: "error",
              timeout: 1000
            });
          } else {
            this.$store.commit("SNACKBAR", {
              status: true,
              content: "Thành Công",
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
