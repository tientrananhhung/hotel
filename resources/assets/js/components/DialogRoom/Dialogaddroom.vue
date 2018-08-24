<template>
    <v-layout row wrap>
        <v-card-text style="position: relative">
            <v-fab-transition>
                <v-btn @click="dialog = !dialog" color="light-green darken-1" dark absolute top right="">
                    Thêm Phòng Mới
                </v-btn>
            </v-fab-transition>
        </v-card-text>

        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="600px">

                <v-card>
                    <v-card-title class="light-green darken-1">
                        <span class="headline">Thêm Phòng Mới</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="name" label="Tên Phòng" :hint="texthint" required></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field label="Kiểu Phòng" :hint="texthint" required></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-switch label="Trạng thái phòng"></v-switch>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field color="green" label="Giá phòng" :hint="texthint" required></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea color="green" type="text" name="input-5-3" label="Mô tả"></v-textarea>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" flat @click.native="dialog = false">Hủy</v-btn>
                        <v-btn color="green darken-1" flat @click.native="setinfor()">Đồng ý</v-btn>
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
      texthint: "Đây là trường bắt buộc không được để trống",
      statusroom: true,
      name: ""
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
      this.dialog = false;
    },
    addroom() {}
  },
  created() {}
};
</script>
