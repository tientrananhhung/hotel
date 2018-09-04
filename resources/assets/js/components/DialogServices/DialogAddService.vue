<template>
  <v-layout row wrap>
    <v-card-text style="position: relative">
      <v-fab-transition>
        <v-btn @click="dialog = !dialog" fab color="white--text blue darken-1" dark absolute top right="">
          <v-icon>add</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-card-text>

    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="600px">

        <v-card>
          <v-card-title class="white--text blue lighten-1">
            <span class="headline">Thêm dịch vụ</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="name" label="Dịch vụ" :hint="texthint" required></v-text-field>
                </v-flex>

                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="price" label="Giá" :hint="texthint" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea v-model="description" type="text" name="input-5-3" label="Mô tả"></v-textarea>
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
      description: ""
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
        .post("/service", {
          name: this.name,
          price: this.price,
          description: this.description
        })
        .then(res => {
          if (!res.data.success) {
            this.$store.commit("SNACKBAR", {
              status: true,
              content: "Thêm Dịch vụ thất bại",
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
