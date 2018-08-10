<template>
  <v-footer
    dark
    height="auto"
  >
    <v-card
      flat
      tile
      class="indigo lighten-1 white--text text-xs-center"
    >

      
    </v-card>
    <v-card-text class="white--text green lighten-1">
        &copy;2018 — <strong>{{make}}</strong>
      </v-card-text>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram'
      ],
      make:"Bùi Anh Tuấn"
    })
  }
</script>