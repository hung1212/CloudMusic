import Vue from 'vue'
import jquery from 'jquery'
import App from './App.vue'
import './assets/iconfont/iconfont.css'
import './assets/less/base.less'
// import 'font-awesome/scss/font-awesome.scss'
window.$ = jquery
window.actions = {
  play(item, id) {
    $.get('/song/url', { id }, (res) => {
      // window.store.songinfo = res.data // eslint-disable-line
      window.store.singerData = item
      window.store.audio.src = res.data[0].url
      window.store.audio.autoplay = true
      window.store.tabplay = false
    })

    const res = localStorage.getItem('plays')
    let plays = []
    if (res) {
      plays = JSON.parse(res)
    }
    if (plays.findIndex(value => value.id === item.id) === -1) plays.push(item)
    localStorage.setItem('plays', JSON.stringify(plays))

    const getres = localStorage.getItem('plays')
    if (!getres) return
    window.store.storage.getItem = JSON.parse(getres)
  },
}
window.store = {
  singerData: null,
  songinfo: [],
  audio: null,
  tabplay: true,
  playsbox: true,
  storage: {
    gitItem: null,
  },
}

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
