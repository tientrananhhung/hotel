<template>
  <v-carousel delimiter-icon="stop" prev-icon="mdi-arrow-left" next-icon="mdi-arrow-right">
    <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src:
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400/63964654097621.594cd09e48c41.png"
        },
        {
          src:
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400/a5180354097621.594cd09e4686c.png"
        },
        {
          src:
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400/e71a3d54097621.594cd09e49012.png"
        },
        {
          src:
            "https://mir-s3-cdn-cf.behance.net/project_modules/1400/ea912654097621.594cd09e46d07.gif"
        }
      ]
    };
  }
};
</script>