<template>
    <v-layout row justify-center>

        <v-btn @click.stop="dialog = true" flat icon color="red">
            <v-icon>delete_sweep</v-icon>
        </v-btn>

        <v-dialog v-model="dialog" max-width="600">
            <v-card>
                <v-layout class="light-green darken-1" row wrap>
                    <v-card-title class="headline">Bạn có muốn xóa phòng này ?</v-card-title>
                </v-layout>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm12 md12>
                                <v-text-field label="Tên phòng" disabled :value="roominfor.name"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field label="Kiểu Phòng" disabled :value="roominfor.type"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field label="Trạng thái phòng" disabled :value='roominfor.status !=1 ? "Phòng trống" :"Phòng đã đặt"'></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                                <v-text-field color="green" label="Giá phòng" disabled :value="roominfor.price"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-textarea color="green" type="text" name="input-5-3" label="Mô tả" disabled :value="roominfor.note"></v-textarea>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click="dialog = false">Hủy</v-btn>
                    <v-btn color="green darken-1" flat="flat" @click="dialog = false">Đồng ý</v-btn>
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
      roominfor: {}
    };
  },
  props: {
    room: {
      type: Object
    }
  },
  mounted() {
    this.roominfor = this.room;
  }
};
</script>