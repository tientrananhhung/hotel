<template>
    <v-layout row wrap fill-height justify-center>
        <v-flex xs5 ma-4 elevation-2 class="">
            <form-login ma-3></form-login>
        </v-flex>
    </v-layout>
</template>

<script>
import FormLogin from "../components/FormLogin.vue";
export default {
  data() {
    return {};
  },
  components: {
    FormLogin
  }
};
</script>
