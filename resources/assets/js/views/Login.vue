<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4 lg4>
          <v-card class="elevation-1 pa-3">
            <v-card-text>
              <div class="layout column align-center">
                <img src="images/logo.png" alt="Hotel Manager App Web" width="120" height="120">
                <h1 class="flex my-4 primary--text">Hotel Manager</h1>
              </div>
              <v-form>
                <v-text-field v-model="email" :error-messages="emailErrors" append-icon="email" label="Email Đăng Nhập" required @input="$v.email.$touch()" @blur="$v.email.$touch()"></v-text-field>
                <v-text-field type="password" v-model="password" append-icon="lock" :error-messages="passErrors" label="Mật Khẩu" required @input="$v.password.$touch()" @blur="$v.password.$touch()"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn block color="primary" @click="login" :loading="loading">Đăng Nhập</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

      </v-layout>
    </v-container>

  </v-content>
</template>


<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required },
    checkbox: { required }
  },

  data: () => ({
    email: "",
    password: "",
    checkbox: false,
    loading: false
  }),

  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.required &&
        errors.push("Bạn phải nhấn đồng ý để tiếp tục");
      return errors;
    },
    emailErrors() {
      const errors = [];
      this.alert = false;
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email &&
        errors.push("Kiểu nhập vào không phải dạng email");
      !this.$v.email.required && errors.push("Bạn cần nhập email");
      return errors;
    },
    passErrors() {
      const errors = [];
      this.alert = false;
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Bạn cần nhập mật khẩu");
      return errors;
    }
  },

  methods: {
    login() {
      this.$v.$touch();
      // console.log(this.$v.email.$dirty);
      // console.log(this.$v.password.$dirty);
      if (this.$v.email.$dirty && this.$v.password.$dirty) {
        axios
          .post("/login", {
            email: this.email,
            password: this.password
          })
          .then(res => {
            console.log(res.data);

            this.$store.dispatch("setToken", res.data.success.token);
            this.$router.replace({ name: "Home" });
            localStorage.setItem("EMAIL", this.email);

            this.$store.commit("SNACKBAR", {
              status: true,
              content: "Đăng Nhập Thành Công",
              type: "success",
              timeout: 2000
            });
          })
          .catch(error => {
            this.$store.commit("SNACKBAR", {
              status: true,
              content: "Sai tên đăng nhập hoặc mật khẩu !",
              type: "error",
              timeout: 1500
            });
            console.log(error.response.status);
          });
      }
    },
    clear() {
      this.$v.$reset();
      this.email = "";
      this.password = "";
    }
  }
};
</script>
