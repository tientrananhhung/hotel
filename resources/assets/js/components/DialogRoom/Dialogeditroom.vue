<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600">
            <v-btn slot="activator" flat icon color="blue lighten-1">
                <v-icon>edit</v-icon>
            </v-btn>
            <v-card>
                <v-card-title class="white--text blue lighten-1">
                    <span class="headline">Cập nhật thông tin phòng</span>
                    <p></p>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm12 md12>
                                <v-text-field color="blue lighten-1" label="Tên Phòng" :hint="texthint" v-model="roominfor.name" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-combobox v-model="roominfor.type" :items="items" chips label="Loại phòng">
                                    <template slot="selection" slot-scope="data">
                                        <v-chip :selected="data.selected" :disabled="data.disabled" :key="JSON.stringify(data.item)" class="v-chip--select-multi " @input="data.parent.selectItem(data.item)">
                                            <v-avatar class="accent white--text">
                                                {{ data.item.slice(0, 1).toUpperCase() }}
                                            </v-avatar>
                                            {{ data.item }}
                                        </v-chip>
                                    </template>
                                </v-combobox>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-switch v-model="roominfor.status" :label='roominfor.status !=1 ? "Đang trống" :"Đã đặt" '></v-switch>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                                <v-text-field v-model="roominfor.price" color="blue lighten-1" label="Giá phòng" :hint="texthint" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-textarea v-model="roominfor.note" color="blue lighten-1" type="text" name="input-5-3" label="Mô tả"></v-textarea>
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
      roominfor: {},
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
    this.roominfor = this.room;
    this.inforold = this.room;
  },
  watch: {
    roominfor() {
      return this.room;
    }
  },
  methods: {
    setinfor() {
      axios
        .put("/room/" + this.roominfor.id, {
          name: this.roominfor.name,
          type: this.roominfor.type,
          status: this.roominfor.status,
          price: this.roominfor.price,
          note: this.roominfor.note
        })
        .then(res => {
          if (!res.data.success) {
            console.log(this.nameerror);
            this.$store.commit("SNACKBAR", {
              status: true,
              content: "Cập Nhật Phòng Thất Bại",
              type: "error",
              timeout: 1000
            });
          } else {
            this.$store.commit("SNACKBAR", {
              status: true,
              content: "Cập Nhật Phòng Thành Công",
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
