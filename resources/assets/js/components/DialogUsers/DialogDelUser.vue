<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="700">
            <v-btn slot="activator" flat icon color="orange lighten-2">
                <v-icon>cancel</v-icon>
            </v-btn>
            <v-card>
                <v-card-title class="orange lighten-2">
                    <span class="headline">{{digInfor.titleDel}}</span>
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
                                            <v-text-field color="light-blue darken-1" disabled :label="digInfor.name" :hint="texthint" :value="infor.name" required></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md6>
                                            <v-text-field color="light-blue darken-1" disabled :label="digInfor.phone" :hint="texthint" :value="infor.phone" required></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm6 md6>
                                            <v-text-field color="light-blue darken-1" disabled :value='infor.isadmin !=0 ? "Quản lý" :"Nhân Viên" '></v-text-field>
                                        </v-flex>
                                        <v-flex xs12 sm12 md12>
                                            <v-text-field color="light-blue darken-1" disabled :label="digInfor.email" :hint="texthint" :value="infor.email" required></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                            <v-flex xs12 sm12 md12>
                                <v-text-field color="light-blue darken-1" disabled :label="digInfor.address" :hint="texthint" :value="infor.address" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field color="light-blue darken-1" disabled :label="digInfor.birthday" type="text" name="input-5-3" :value="infor.birthday"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="orange lighten-2" flat @click="getoldroom()">Hủy</v-btn>
                    <v-btn color="orange lighten-2" flat @click.native="deluser()">Đồng ý</v-btn>
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
      titlebox: "",
      texthint: "Đây là trường bắt buộc không được để trống",
      infor: {},
      inforold: {},
      digInfor: {}
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
    // this.inforold = this.room;
  },
  watch: {
    roominfor() {
      return this.room;
    }
  },
  methods: {
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
      this.dialog = false;
    },
    // xử lí lấy lịch sử phòng để chèn lại khi đóng nút hủy
    getoldroom() {
      this.inforold = this.detailroom;
      this.dialog = false;
    }
  }
};
</script>
