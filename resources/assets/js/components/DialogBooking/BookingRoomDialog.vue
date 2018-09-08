<template>
    <v-layout row wrap>
        <v-btn @click="checkchoosedate" flat icon color="primary" class="blue lighten-2">
            <v-icon color="white">add</v-icon>
        </v-btn>

        <v-dialog persistent v-model="dialog" max-width="900">
            <v-card>
                <v-card-title class="white--text blue lighten-1 headline">ĐƠN ĐẶT PHÒNG : {{room.name}}</v-card-title>
                <v-card-text>
                    <v-container grid-list-xs>
                        <v-layout row wrap>
                            <v-flex xs4>
                                <v-flex pr-3 xs12 sm12 md12>
                                    <v-toolbar flat color="white">
                                        <v-toolbar-title class="text-xs-center">Thông tin phòng </v-toolbar-title>
                                        <v-spacer></v-spacer>
                                    </v-toolbar>
                                    <v-divider></v-divider>
                                </v-flex>
                                <v-list dense>
                                    <v-list-tile>
                                        <v-list-tile-content>Tên phòng :</v-list-tile-content>
                                        <v-list-tile-content class="align-end"> {{room.name}}</v-list-tile-content>
                                    </v-list-tile>

                                    <v-list-tile>
                                        <v-list-tile-content>Giá phòng :</v-list-tile-content>
                                        <v-list-tile-content class="align-end"> {{room.price}}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>Kiểu Phòng :</v-list-tile-content>
                                        <v-list-tile-content class="align-end">{{room.type}}</v-list-tile-content>
                                    </v-list-tile>
                                </v-list>
                                <v-toolbar flat color="white">
                                    <v-toolbar-title class="text-xs-center">Chi tiết ngày đặt</v-toolbar-title>
                                    <v-spacer></v-spacer>
                                </v-toolbar>
                                <v-divider></v-divider>
                                <v-list dense>
                                    <v-list-tile>
                                        <v-list-tile-content>Ngày nhận :</v-list-tile-content>
                                        <v-list-tile-content class="align-end"> {{datebook.to}}</v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>Ngày trả :</v-list-tile-content>
                                        <v-list-tile-content class="align-end"> {{datebook.from}}</v-list-tile-content>
                                    </v-list-tile>
                                </v-list>

                            </v-flex>
                            <v-divider class="mx-3" inset vertical></v-divider>
                            <v-flex xs7>
                                <v-toolbar flat color="white">
                                    <v-toolbar-title class="text-xs-center">Thông tin khách đặt</v-toolbar-title>
                                    <v-btn ml-3 v-model="btnedit" :disabled="btnedit" @click="listeneditCustomer" flat small icon color="primary">
                                        <v-icon>edit</v-icon>
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                </v-toolbar>
                                <v-divider></v-divider>
                                <v-flex xs12 sm12 md12>
                                    <v-layout row wrap>
                                        <v-flex xs8>
                                            <v-text-field v-model="keyword" :label="titledit" :hint="checkhint" required></v-text-field>
                                        </v-flex>
                                        <v-flex mt-2 pr-4 xs2>

                                            <v-btn @click.stop="getDataCustomer(); dialoglist=true  " outline small color="primary">Kiểm tra thông tin</v-btn>
                                            <v-dialog persistent v-model="dialoglist" max-width="600">
                                                <v-card>
                                                    <v-card-title class="white--text blue lighten-1 headline">Danh sách khách hàng</v-card-title>
                                                    <v-card-text>
                                                        <v-data-table :headers="headers" :loading="loading" :items="customer.data" :search="keyword" :pagination.sync="pagination" :total-items="customer.total" hide-actions>
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
                                                                    <v-avatar ma-3 :tile="false" :size="35" color="grey lighten-4">
                                                                        <img src="images/manager.png" alt="avatar">
                                                                    </v-avatar>
                                                                </td>
                                                                <td>{{ props.item.name }}</td>
                                                                <td>{{ props.item.phone }}</td>
                                                                <td>
                                                                    <v-btn @click="setDataCustomer(props.item)" flat icon color="success">
                                                                        <v-icon>done</v-icon>
                                                                    </v-btn>
                                                                </td>
                                                            </template>
                                                        </v-data-table>
                                                        <div class="text-xs-center pt-2">
                                                            <v-pagination color="white--text blue darken-1" v-model="pagination.page" :length="customer.last_page" :total-visible="5" circle></v-pagination>
                                                        </div>
                                                        <v-card-text v-model="result">
                                                            {{result.name}}
                                                        </v-card-text>

                                                    </v-card-text>
                                                    <v-card-actions>
                                                        <v-spacer></v-spacer>

                                                        <v-btn color="blue darken-1" flat="flat" @click.stop="dialoglist = false; result.name = ''; customer = {}">
                                                            Đóng
                                                        </v-btn>

                                                    </v-card-actions>
                                                </v-card>
                                            </v-dialog>

                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field :disabled="result.flag" v-model="phone" color="light-blue darken-1" append-icon="local_phone" label="Số điện thoại" :hint="checkhint" required></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field :disabled="result.flag" v-model="identity_card" color="light-blue darken-1" append-icon="credit_card" label="Số chứng minh nhân dân" :hint="checkhint" required></v-text-field>
                                </v-flex>
                                <v-flex xs12 class="text-xs-center">
                                    <v-layout column align-center justify-center>
                                        <v-btn @click.stop="listenbtnupdate" v-show="btnsendupdate" flat outline color="warning">
                                            Cập nhật thông tin
                                        </v-btn>
                                        <v-btn @click="listenbtninsert" v-show="btninsert" flat outline color="success">
                                            Thêm mới khách hàng
                                        </v-btn>
                                    </v-layout>
                                </v-flex>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat="flat" @click="dialog = false">
                        Trở Lại
                    </v-btn>
                    <v-btn v-show="btnbooking" color="blue darken-1" flat="flat" @click.stop="listenbooking">
                        Đồng ý đặt Phòng
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-layout>
</template>

<script>
export default {
  data() {
    return {
      dialoglist: false,
      dialog: false,
      checkhint: "Trường không được bỏ trống",
      headers: [
        { text: "Avartar", sortable: false, value: "avartar", align: "center" },
        { text: "Họ và Tên", sortable: false, value: "name", align: "center" },
        {
          text: "Số điện thoại",
          sortable: false,
          value: "phone",
          align: "center"
        },
        {
          text: "Chọn",
          sortable: false,

          align: "center"
        }
      ],
      titledit: "Nhập Tên khách hàng",
      loading: true,
      showedit: true,
      btnedit: true,
      btnsendupdate: false,
      btninsert: false,
      btnbooking: false,
      id: null,
      keyword: "",
      phone: "",
      identity_card: "",
      customer: {},
      pagination: {},
      result: { name: "", flag: true }
    };
  },
  props: {
    room: {
      type: Object
    },
    datebook: {
      type: Object
    }
  },
  watch: {
    pagination: {
      handler() {},
      deep: true
    },
    keyword() {
      if (this.keyword == "") {
        this.phone = "";
        this.identity_card = "";
        this.btnbooking = false;
      }
    }
  },
  mounted() {},
  methods: {
    listenbooking() {
      console.log("BOOKING TO DATABASE", {
        from: this.datebook.from,
        to: this.datebook.to,
        service: [],
        customer_id: this.id,
        user_id: this.$store.state.user.id,
        room_id: this.room.id,
        status: 1
      });
      // xử lí post to server tại đây
      this.$store.commit("SNACKBAR", {
        status: true,
        content: "Thêm đơn hàng thành công",
        type: "success",
        timeout: 2000
      });
      this.dialog = false;
    },
    listenbtninsert() {
      // sự kiện thêm khách hàng mới
      axios
        .post("/customer", {
          name: this.keyword,
          phone: this.phone,
          identity_card: this.identity_card
        })
        .then(res => {
          if (!res.data.success) {
            this.$store.commit("SNACKBAR", {
              status: true,
              content: "Lỗi thêm khách hàng này",
              type: "error",
              timeout: 2000
            });
            this.btninsert = true;
            this.result.flag = false;
            console.log(res.data);
          } else {
            this.$store.commit("SNACKBAR", {
              status: true,
              content: "Thêm khách hàng mới thành công",
              type: "success",
              timeout: 2000
            });
            this.btnbooking = true;
            this.btninsert = false;
            this.result.flag = true;
            // lấy được id khách hàng thêm mới
            this.id = res.data.customer.id;
            // console.log(res.data);
            console.log("Id Customer insert ", this.id);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    listenbtnupdate() {
      // sự kiện update khách hàng khi đã sửa thông tin
      if (this.id != null) {
        axios
          .put("/customer/" + this.id, {
            name: this.keyword,
            phone: this.phone,
            identity_card: this.identity_card
          })
          .then(res => {
            if (!res.data.success) {
              console.log(this.nameerror);
              this.$store.commit("SNACKBAR", {
                status: true,
                content: "Cập Nhật Khách hàng thất bại",
                type: "error",
                timeout: 2000
              });
              // giữ nguyên nút update khi update fail
              this.btnsendupdate = true;
              // turn on edit text phone and identity_id
              this.result.flag = false;
            } else {
              this.$store.commit("SNACKBAR", {
                status: true,
                content: "Cập Nhật khách hàng " + this.keyword + " thành công",
                type: "success",
                timeout: 2000
              });
              // turn off btnupdate when update customer fail
              this.btnsendupdate = false;
              // turn on btn booking
              this.btnbooking = true;
              // turn on edit text phone and identity_id
              this.result.flag = true;

              console.log(res.data);
              // get id customer update
              this.id = res.data.customer.id;
              console.log("Id Customer update", this.id);
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        console.log("Lỗi không nhận được id người dùng cần update");
      }
    },
    listeneditCustomer() {
      // sự kiện khi click vào sửa thì sẽ cho người dùng sửa nhân viên
      this.result.flag = !this.result.flag;
      this.btnsendupdate = !this.btnsendupdate;
      this.btnbooking = false;
    },
    setDataCustomer(item) {
      this.keyword = item.name;
      this.phone = item.phone;
      this.identity_card = item.identity_card;
      // get id customer when user choose it
      this.id = item.id;
      console.log("Id Customer finded ", this.id);
      this.dialoglist = false;
    },
    getDataCustomer(withPagination = false) {
      // console.log(this.keyword);
      if (this.keyword != "") {
        this.loading = true;
        axios
          .get("/customer?limit=5&keyword=" + this.keyword, {
            params: withPagination ? this.pagination : null
          })
          .then(response => {
            // Xử lí khi đây là khách vãng lai
            if (response.data.data.length === 0 && response.data.total === 0) {
              this.result = {
                name:
                  "Không có khách hàng này trong dữ liệu được lưu, vui lòng tự nhập mới!",
                flag: false
              };
              // active btn thêm khách hàng mới
              this.btninsert = true;
              this.btnbooking = false;
              this.customer = {};
              this.phone = "";
              this.identity_card = "";
              this.loading = false;
            } else {
              // Xử lí khi có dữ liệu khách hàng
              this.result = {
                name: "",
                flag: true
              };
              this.btnedit = false;
              this.btninsert = false;
              this.btnbooking = true;
              this.customer = response.data;
              this.loading = false;
            }
          });
      } else {
        // Xử lí khi chưa nhập tên khách hàng
        this.result = {
          name: "Chưa nhập tên khách hàng !",
          flag: true
        };
        this.customer = {};
      }
    },
    checkchoosedate() {
      if (this.datebook.from == undefined && this.datebook.to == undefined) {
        this.$store.commit("SNACKBAR", {
          status: true,
          content: "Vui lòng chọn ngày đến và đi !",
          type: "error",
          timeout: 2000
        });
        this.dialog = false;
      } else {
        this.dialog = true;
      }
    }
  }
};
</script>
