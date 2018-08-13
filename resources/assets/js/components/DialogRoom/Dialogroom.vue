<template>
    <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-btn slot="activator" flat icon color="success">
                <v-icon>edit</v-icon>
            </v-btn>
            <v-card>
                <v-card-title>
                    <span class="headline">Cập nhật thông tin phòng</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm12 md12>
                                <v-text-field label="Tên Phòng" :hint="texthint">{{detailroom.name}}</v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field label="Kiểu Phòng" :hint="texthint"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-switch v-model="room.status" label="Trạng thái phòng"></v-switch>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Mô tả" type="text" required></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="dialog = false">Đóng</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="setinfor()">Cập Nhật</v-btn>
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
      detailroom: null,
      texthint: "Đây là trường bắt buộc không được để trống",
      statusroom: true
    };
  },
  props: {
    room: {
      type: Object
    }
  },
  watch: {
    detailroom() {}
  },
  methods: {
    setinfor() {
      console.log(this.detailroom);
      this.dialog = false;
    }
  },
  created() {
    this.detailroom = this.room;
  }
};
</script>
