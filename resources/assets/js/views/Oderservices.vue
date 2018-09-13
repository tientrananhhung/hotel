<template>
  <v-container fluid grid-list-md>
    <v-layout column>
      <v-layout pl-4 pr-4 mb-1 row wrap>
        <v-flex d-flex xs12 sm6 md6>
          <v-card color="blue--text">
            <v-card-title class="align-center headline font-weight-bold">
              <v-list-tile-content>
                Tìm kiếm đơn đặt
              </v-list-tile-content>
              <v-list-tile-content class="align-end">
                <v-fab-transition>
                  <v-tooltip dark="" color="blue lighten-1" bottom="">
                    <v-btn @click.stop="getData" slot="activator" flat fab color="blue lighten-1" dark>
                      <v-icon>autorenew</v-icon>
                    </v-btn>
                    <span>Tải lại dữ liệu</span>
                  </v-tooltip>
                </v-fab-transition>
              </v-list-tile-content>
            </v-card-title>

            <v-divider></v-divider>
            <v-card-text>
              <v-text-field class="align-center" v-model="search" @keyup.enter="pagination.keyword = search" color="white--text blue lighten-1" label="Nhập tên khách hàng cần thanh toán" append-icon="search"></v-text-field>
              <v-data-table :loading="loading" :headers="headers" :items="infor.data" :search="pagination.keyword" :pagination.sync="pagination" :total-items="infor.total" hide-actions>
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
                  <td class="text-xs-left">{{ props.item.customer.name }}</td>
                  <td class="text-xs-left">{{ props.item.from.split(" ")[0] }}</td>
                  <td class="text-xs-center">
                    <v-btn @click.stop="order=props.item ;getservice(props.item)" flat icon color="primary">
                      <v-icon>info</v-icon>
                    </v-btn>
                  </td>
                </template>
              </v-data-table>
              <div class="text-xs-center pt-2">
                <v-pagination color="white--text blue darken-1" v-model="pagination.page" :length="infor.last_page" circle></v-pagination>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 sm6 md6>

          <v-layout row wrap>

            <v-flex xs12>

              <v-card color="blue--text">
                <v-card-title class="align-center headline font-weight-bold">
                  Chi tiết đơn đặt :
                </v-card-title>
                <v-divider></v-divider>

                <v-card-text>
                  <v-list dense>
                    <v-list-tile-title class="blue--text">
                      Thông tin Khách hàng :
                    </v-list-tile-title>
                    <v-divider></v-divider>
                    <v-list-tile>
                      <v-list-tile-content>Tên khách hàng :</v-list-tile-content>
                      <v-list-tile-content v-model="order.customer.name" class="blue--text align-end  body-2 font-weight-bold">{{order.customer.name}}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>Số điện thoại :</v-list-tile-content>
                      <v-list-tile-content v-model="order.customer.phone" class="align-end">{{order.customer.phone}}</v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile>
                      <v-list-tile-content>Phòng đang thuê :</v-list-tile-content>
                      <v-list-tile-content v-model="order.room.name" class="blue--text align-end  body-2 font-weight-bold">{{order.room.name}}</v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile-title class="blue--text">
                      Dịch vụ đang sử dụng :
                    </v-list-tile-title>

                    <v-divider></v-divider>

                    <v-data-table :headers="headers1" :items="order.data.services" :total-items="infor.total" hide-actions class="elevation-1">
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
                      </template>
                    </v-data-table>

                  </v-list>
                </v-card-text>

                <v-card-actions>
                  <v-flex xs12>
                    <v-layout align-center justify-center row wrap>

                      <v-btn @click="" color="primary" dark>
                        Đồng ý Thêm dịch vụ
                        <v-icon right dark>add</v-icon>
                        <!-- Remove if don't want to use icon. -->
                      </v-btn>
                    </v-layout>

                  </v-flex>
                </v-card-actions>
              </v-card>
            </v-flex>

            <v-flex xs12>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-card color="blue--text" justify-center>
                    <v-card-title class="align-center  headline font-weight-bold">
                      Dịch vụ hiện có:
                    </v-card-title>

                    <v-divider></v-divider>
                    <v-card-text>

                    </v-card-text>

                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>

          </v-layout>

        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      Oder: {},
      search: "",
      infor: {},
      pagination: {},
      loading: false,
      headers: [
        {
          text: "Tên khách hàng",
          align: "left",
          sortable: false,
          value: "name"
        },
        {
          text: "Đặt phòng ngày",
          sortable: false,
          value: "type",
          align: "left"
        },
        { text: "Thông tin thêm", sortable: false, align: "center" }
      ],
      order: {
        customer: {
          name: "-",
          phone: "-"
        },
        room: {
          name: "-",
          price: "-"
        },
        user: {
          name: "-",
          phone: "-"
        },
        from: "-",
        to: "-",
        totaldate: "-",
        totalservice: "-",
        data: {
          services: []
        }
      },
      headers1: [
        {
          text: "Tên dịch vụ",
          align: "left",
          sortable: false,
          value: "name"
        },
        {
          text: "Giá tiền",
          sortable: false,
          value: "type",
          align: "left"
        }
      ],
      infor: {}
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
  watch: {
    pagination: {
      handler() {
        this.getData(true);
      },
      deep: true
    },
    search() {
      if (this.search == "") {
        this.pagination.keyword = "";
      }
    }
  },
  methods: {
    getservice(object) {
      console.log(object);
      console.log(this.order);
    },
    payment() {
      console.log("Xử lí thanh toán");
    },
    getData(withPagination = false) {
      this.loading = true;
      axios
        .get("/order?limit=4", {
          params: withPagination ? this.pagination : null
        })
        .then(response => {
          this.infor = response.data;
          this.loading = false;
        });
    }
  },
  created() {
    this.getData();

    axios
      .get("/order?limit=4", {})
      .then(result => {
        console.log(result);
      })
      .catch(err => {});
  }
};
</script>

