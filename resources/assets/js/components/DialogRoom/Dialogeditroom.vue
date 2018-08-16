<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600">
            <v-btn slot="activator" flat icon color="success">
                <v-icon>edit</v-icon>
            </v-btn>
            <v-card>
                <v-card-title class="light-green darken-1">
                    <span class="headline">Cập nhật thông tin phòng</span>
                    <p></p>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm12 md12>
                                <v-text-field color="green" label="Tên Phòng" :hint="texthint" :value="roominfor.name" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field color="green" label="Kiểu Phòng" :hint="texthint" :value="roominfor.type" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-switch color="green" v-model="roominfor.status" :label='roominfor.status !=1 ? "Phòng trống" :"Phòng đã được đặt" '></v-switch>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                                <v-text-field color="green" label="Giá phòng" :hint="texthint" :value="roominfor.price" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-textarea color="green" type="text" name="input-5-3" label="Mô tả" :value="roominfor.note"></v-textarea>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat @click="getoldroom()">Đóng</v-btn>
                    <v-btn color="green darken-1" flat @click.native="setinfor()">Cập Nhật</v-btn>
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
      inforold: {}
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
