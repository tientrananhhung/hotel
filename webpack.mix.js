let mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .webpackConfig({
    output: {
      chunkFilename: "js/chunks/[name].js"
    }
  })
  .js("resources/assets/js/app.js", "public/js")
  .extract(["vue", "vuex", "vue-router", "vuetify", "vue-moment"])
  // .sourceMaps()
  // .sass("resources/assets/sass/app.scss", "public/css")
  .copyDirectory("resources/assets/images", "public/images")
  .options({
    processCssUrls: false
  });
// .copyDirectory("resources/assets/fonts", "public/fonts");
