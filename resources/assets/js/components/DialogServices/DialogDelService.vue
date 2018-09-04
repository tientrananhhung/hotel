<template>
  <v-layout row justify-center>

    <v-btn @click.stop="dialog = true" flat icon color="orange lighten-2">
      <v-icon>cancel</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-layout class="white--text orange lighten-2" row wrap>
          <v-card-title class="headline">Xóa dịch vụ này</v-card-title>
        </v-layout>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field label="Tên dịch vụ" disabled :value="infor.name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field color="green" label="Giá" disabled :value="infor.price"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea color="green" type="text" name="input-5-3" label="Mô tả" disabled :value="infor.description"></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange lighten-2" flat="flat" @click="dialog = false">Hủy</v-btn>
          <v-btn color="orange lighten-2" flat="flat" @click="delroom()">Đồng ý</v-btn>
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
      infor: {}
    };
  },
  props: {
    room: {
      type: Object
    }
  },
  mounted() {
    this.infor = this.room;
  },
  methods: {
    delroom() {
      axios
        .delete("/service/" + this.infor.id, {})
        .then(res => {
          if (!res.data.success) {
            console.log(this.nameerror);
            this.$store.commit("SNACKBAR", {
              status: true,
              content: "Xóa Thất Bại",
              type: "error",
              timeout: 1000
            });
          } else {
            this.$store.commit("SNACKBAR", {
              status: true,
              content: "Đã xóa Dịch vụ: " + this.infor.name,
              type: "warning",
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
  }
};
</script>