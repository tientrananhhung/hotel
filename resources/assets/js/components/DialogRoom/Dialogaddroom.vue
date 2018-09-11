<template>
    <v-layout row wrap>
        <v-card-text style="position: relative">
            <v-fab-transition>
                <v-btn @click="dialog = !dialog" fab color="white--text blue darken-1" dark absolute top>
                    <v-icon color="white">add</v-icon>
                </v-btn>
            </v-fab-transition>
        </v-card-text>

        <v-layout row justify-center>
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title class="white--text blue lighten-1">
                        <span class="headline">Thêm Phòng Mới</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="name" label="Tên Phòng" :hint="texthint" required></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-combobox v-model="type" :items="items" chips label="Loại phòng">
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
                                    <v-switch v-model="status" :label='status !=0 ? "Đã đặt" :"Đang Trống" '></v-switch>
                                </v-flex>
                                <v-flex xs12 sm12 md12>
                                    <v-text-field v-model="price" label="Giá phòng" :hint="texthint" required></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea v-model="note" type="text" name="input-5-3" label="Mô tả"></v-textarea>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click.native="dialog = false">Hủy</v-btn>
                        <v-btn color="blue darken-1" flat @click.native="addroom()">Đồng ý</v-btn>
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
      name: "",
      type: "Phòng Đơn",
      items: ["Phòng Đôi", "Phòng Đơn", "Phòng Gia Đình", "Phòng Vip"],
      status: 0,
      price: "",
      note: ""
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
    addroom() {
      axios
        .post("/room", {
          name: this.name,
          type: this.type,
          status: this.status,
          price: this.price,
          note: this.note
        })
        .then(res => {
          if (!res.data.success) {
            this.$store.commit("SNACKBAR", {
              status: true,
              content: "Thêm Phòng thất bại",
              type: "error",
              timeout: 1000
            });
          } else {
            this.$store.commit("SNACKBAR", {
              status: true,
              content: "Thành Công",
              type: "success",
              timeout: 1000
            });
          }
          console.log(res.data);
        })
        .catch(error => {
          console.log(error);
        });
      this.dialog = false;
    }
  },
  created() {}
};
</script>
