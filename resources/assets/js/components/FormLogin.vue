<template>
  <v-card width="400">
    <v-card-text>
      <form>
        <v-text-field v-model="email" :error-messages="emailErrors" label="Email Đăng Nhập" required @input="$v.email.$touch()" @blur="$v.email.$touch()"></v-text-field>
        <v-text-field type="password" v-model="password" :error-messages="passErrors" label="Mật Khẩu" required @input="$v.password.$touch()" @blur="$v.password.$touch()"></v-text-field>
        <v-checkbox v-model="checkbox" :error-messages="checkboxErrors" label="Nhớ tên đăng nhập và mật khẩu ?" required @change="$v.checkbox.$touch()" @blur="$v.checkbox.$touch()"></v-checkbox>

        <v-btn color="error" @click="clear">Quên Mật Khẩu</v-btn>
        <v-btn color="success" @click="login">Dang nhap</v-btn>
      </form>
    </v-card-text>
  </v-card>

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
    checkbox: false
  }),

  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.required && errors.push("You must agree to continue!");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email &&
        errors.push("Kiểu nhập vào không phải dạng email");
      !this.$v.email.required && errors.push("Bạn cần nhập email");
      return errors;
    },
    passErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Bạn cần nhập mật khẩu");
      return errors;
    }
  },

  methods: {
    login() {
      // this.$v.$touch();

      // var email = "Mail của bạn là :" + this.email;
      // if (this.$v.name.$dirty || this.$v.email.$dirty) {
      //   alert(str + "\n" + email);
      // }
      axios
        .post("/login", {
          email: "admin@gmail.com",
          password: "123456"
        })
        .then(res => {
          console.log(res.data);
          this.$store.dispatch("setToken", res.data.success.token);
          this.$router.replace({ name: "Home" });
        });
    },
    clear() {
      this.$v.$reset();
      this.email = "";
      this.select = null;
      this.checkbox = false;
    }
  }
};
</script>