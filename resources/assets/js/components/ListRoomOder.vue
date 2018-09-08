<template>
  <v-layout pl-4 pr-4 mb-2 column>
    <v-layout class="elevation-1" row wrap>
      <v-toolbar flat color="blue--text grey lighten-3">
        <v-toolbar-title>Danh sách phòng đặt</v-toolbar-title>
        <v-btn fab flat small color="blue" @click="getData()">
          <v-icon>autorenew</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-toolbar flat color="blue--text grey lighten-3">
        <v-flex xs4>
          <v-combobox v-model="itemchoose" :items="items" chips>
            <template slot="selection" slot-scope="data">
              <v-chip :selected="data.selected" :disabled="data.disabled" :key="JSON.stringify(data.item)" class="v-chip--select-multi " @input="data.parent.selectItem(data.item)">
                <v-avatar class="accent white--text">
                  {{ data.item.slice(0, 1).toUpperCase() }}
                </v-avatar>
                {{ data.item }}
              </v-chip>
            </template>
          </v-combobox>
          <!-- <v-text-field v-model="pagination.keyword" color="white--text blue lighten-1" label="Tìm kiếm" append-icon="search" style="margin-top: 10px"></v-text-field> -->
        </v-flex>

        <v-divider class="mx-3" inset vertical></v-divider>
        <v-flex xs5>
          <v-menu style="margin-top: 10px" ref="menu" :close-on-content-click="false" v-model="menu" :nudge-right="40" :return-value.sync="dates" lazy transition="scale-transition" offset-y full-width min-width="290px">
            <v-combobox slot="activator" color="blue" v-model="dates" multiple chips small-chips label="Ngày khách chọn đặt" append-icon="event" readonly></v-combobox>
            <v-date-picker v-model="dates" :min="today" multiple no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="datecancel(menu); $refs.menu.save(dates)">Xóa</v-btn>
              <v-btn flat color="primary" @click="menu = false">Trở lại</v-btn>
              <v-btn flat color="primary" @click="$refs.menu.save(dates); gettofrom()">Chọn</v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
      </v-toolbar>
    </v-layout>

    <v-data-table :loading="loading" :headers="headers" :items="rooms.data" :search="pagination.keyword" :pagination.sync="pagination" :total-items="rooms.total" class="elevation-1" hide-actions>
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
        <td class="text-xs-left">{{ props.item.type }}</td>
        <td class="text-xs-left">{{ props.item.price }}</td>
        <td class="text-xs-right">
          <v-layout row wrap>
            <v-spacer></v-spacer>
            <dialog-booking :datebook="datebook" :room="props.item"></dialog-booking>
          </v-layout>
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination color="white--text blue darken-1" v-model="pagination.page" :length="rooms.last_page" circle></v-pagination>
    </div>
  </v-layout>
</template>

<script>
import DialogBooking from "./DialogBooking/BookingRoomDialog";
export default {
  components: {
    DialogBooking
  },
  data() {
    return {
      headers: [
        {
          text: "Tên Phòng",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Loại Phòng", sortable: false, value: "type", align: "left" },
        { text: "Giá phòng", sortable: false, value: "price", align: "left" },
        { text: "Đặt Phòng", sortable: false, align: "center" }
      ],
      rooms: {},
      pagination: {},
      loading: false,
      items: ["Phòng Đôi", "Phòng Đơn", "Phòng Gia Đình", "Phòng Vip"],
      itemchoose: "Phòng Đôi",
      dates: [],
      menu: false,
      today: null,
      datebook: {}
    };
  },
  created() {
    //console.log(this.today);

    this.getData();
  },
  mounted() {
    var today = new Date();
    //  console.log(today);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; // vì tháng 1 ko thể bằng 0
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    this.today = today.getFullYear() + "-" + mm + "-" + dd;
    //console.log(this.today);
  },
  watch: {
    pagination: {
      handler() {
        this.getData(true);
      },
      deep: true
    },
    dates() {
      this.datebook.to = null;
      this.datebook.from = null;
      //   this.dates[0] = this.formatDate(this.dates[0]);
      //   this.dates[1] = this.formatDate(this.dates[1]);
      if (this.dates.length == 2) {
        var to = this.dates[0].split("-");
        var from = this.dates[1].split("-");
        if (from[1] - to[1] < 0) {
          // chọn ngày khác tháng mà số tháng tới nhở hơn hơn tháng đi
          this.$store.commit("SNACKBAR", {
            status: true,
            content: "Lỗi chọn ngày không hợp lí!",
            type: "warning",
            timeout: 2000
          });
          this.dates = [];
          this.datebook.to = null;
          this.datebook.from = null;
        } else if (from[1] - to[1] === 0) {
          // chọn ngày cùng tháng
          if (from[2] - to[2] < 0) {
            this.$store.commit("SNACKBAR", {
              status: true,
              content: "Lỗi chọn ngày không hợp lí!",
              type: "warning",
              timeout: 2000
            });
            this.dates = [];
            this.datebook.to = null;
            this.datebook.from = null;
          } else {
            // ngày to
            this.datebook.to = this.dates[0];
            // ngày from
            this.datebook.from = this.dates[1];
          }
        } else {
          // ngày to
          this.datebook.to = this.dates[0];
          // ngày from
          this.datebook.from = this.dates[1];
        }

        //console.log(this.datebook);
      } else if (this.dates.length == 3) {
        this.dates = [];
        this.datebook.to = null;
        this.datebook.from = null;
      }
    }
  },
  methods: {
    getData(withPagination = false) {
      this.loading = true;
      /// tìm phòng theo kiểu phòng và ngày trong tương lai phòng trống để đặt phòng
      axios
        .get("/room?limit=6", {
          params: withPagination ? this.pagination : null
        })
        .then(response => {
          this.rooms = response.data;
          this.loading = false;
          // console.log("LOG", this.rooms.data);
        });
    },
    gettofrom() {
      if (this.dates.length == 2) {
        // ngày to
        // console.log(this.dates[0]);
        // ngày from
        // console.log(this.dates[1]);
        // xử lí lấy phòng theo ngày
      } else {
        this.$store.commit("SNACKBAR", {
          status: true,
          content: "Chọn ngày không hợp lí!",
          type: "error",
          timeout: 2000
        });
      }
    },
    gotoBookroom() {
      this.$router.replace({ name: "Bookinginfor" });
    },

    datecancel(menu) {
      menu = false;
      this.dates = [];
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

