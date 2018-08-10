<template>
  <v-container 
  ma-5
  >
        <form >
        <v-text-field
          v-model="name"
          :error-messages="nameErrors"
          :counter="10"
          label="Họ và tên"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="Địa chỉ mail của bạn"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-select
          v-model="select"
          :items="items"
          :error-messages="selectErrors"
          label="Hoa quả"
          required
          @change="$v.select.$touch()"
          @blur="$v.select.$touch()"
        ></v-select>
        <v-checkbox
          v-model="checkbox"
          :error-messages="checkboxErrors"
          label="Bạn đồng ý chứ?"
          required
          @change="$v.checkbox.$touch()"
          @blur="$v.checkbox.$touch()"
        ></v-checkbox>

        <v-btn color="success" @click="submit">Đồng ý</v-btn>
        <v-btn color="error" @click="clear">Xóa</v-btn>
      </form>
  </v-container>
  
</template>


<script>
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  email
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(20) },
    email: { required, email },
    select: { required },
    checkbox: { required }
  },

  data: () => ({
    name: "",
    email: "",
    select: null,
    items: ["Chuối", "Táo", "Cam", "Quýt", "Lê", "Bơ", "Mít"],
    checkbox: false
  }),

  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.required && errors.push("You must agree to continue!");
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Vui lòng chọn hoa quả");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    }
  },

  methods: {
    submit() {
      this.$v.$touch();
      var str = "Tên của bạn là :" + this.name;
      var email = "Mail của bạn là :"+this.email;

      if(this.$v.name.$dirty || this.$v.email.$dirty) {
        alert(str+"\n"+email);
      } 
      
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = false;
    }
  }
};
</script>