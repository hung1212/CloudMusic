import Vue from 'vue'
import jquery from 'jquery'
import App from './App.vue'
import './assets/iconfont/iconfont.css'
import './assets/less/base.less'
// import 'font-awesome/scss/font-awesome.scss'
window.$ = jquery
window.store = {
  singerData: null,
  songinfo: [],
  audio: null,
  tabplay: true,
}

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
