<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600">
      <v-btn slot="activator" flat icon color="blue lighten-1">
        <v-icon>edit</v-icon>
      </v-btn>
      <v-card>
        <v-card-title class="white--text blue lighten-1">
          <span class="headline">Cập nhật service</span>
          <p></p>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field color="blue lighten-1" v-model="infor.name" label="Tên dịch vụ" :hint="texthint" required></v-text-field>
              </v-flex>

              <v-flex xs12 sm12 md12>
                <v-text-field v-model="infor.price" color="blue lighten-1" label="Giá" :hint="texthint" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea v-model="infor.description" color="blue lighten-1" type="text" name="input-5-3" label="Mô tả"></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue lighten-1" flat @click="getoldroom()">Đóng</v-btn>
          <v-btn color="blue lighten-1" flat @click.native="setinfor()">Cập Nhật</v-btn>
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
      texthint: "Đây là trường bắt buộc không được để trống",
      infor: {},
      inforold: {},
      items: ["Phòng Đôi", "Phòng Đơn", "Phòng Gia Đình", "Phòng Vip"],
      nameerror: false
    };
  },
  props: {
    room: {
      type: Object
    }
  },
  created() {},
  mounted() {
    this.infor = this.room;
    this.inforold = this.room;
  },
  watch: {
    infor() {
      return this.room;
    }
  },
  methods: {
    setinfor() {
      axios
        .put("/service/" + this.infor.id, {
          name: this.infor.name,
          price: this.infor.price,
          description: this.infor.description
        })
        .then(res => {
          if (!res.data.success) {
            console.log(this.nameerror);
            this.$store.commit("SNACKBAR", {
              status: true,
              content: "Cập Nhật Dịch vụThất Bại",
              type: "error",
              timeout: 1000
            });
          } else {
            this.$store.commit("SNACKBAR", {
              status: true,
              content: "Cập Nhật Dịch vụ Thành Công",
              type: "success",
              timeout: 1000
            });
          }
          console.log(res.data.m);
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
