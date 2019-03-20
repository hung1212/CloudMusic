module.exports = {
  devServer: {
    proxy: 'http://localhost:3000',
  },
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
    },
  },
}
