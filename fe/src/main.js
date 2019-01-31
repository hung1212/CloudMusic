import Vue from 'vue'
import jquery from 'jquery'
import App from './App.vue'
import './assets/iconfont/iconfont.css'
import './assets/less/base.less'
// import 'font-awesome/scss/font-awesome.scss'
window.$ = jquery
window.alert = function alert(content) {
  const div = document.createElement('div')
  div.innerHTML = content
  document.body.appendChild(div)
  div.style.cssText = 'position: fixed;left:50%;top50%;transform: translate(-50%,-50%);'
  + 'background-color:#545454;font-size:20px;'
  + 'color:#fff;padding:20px 100px;border-radius:10px'
  setTimeout(() => {
    document.body.removeChild(div)
  }, 2000)
}
window.actions = {
  play(item) {
    $.get('/song/url', { id: item.id }, (res) => {
      window.store.audioData.src = res.data[0].url
      window.store.audioData.tabplay = false
      window.store.audioData.flagAudio = true
    })
    const playList = window.store.storage.playList
    if (playList.findIndex(value => value.id === item.id) === -1) {
      playList.unshift(item)
    }
    localStorage.playList = JSON.stringify(window.store.storage.playList)
  },
  playsDelete(arr, i) {
    window.store.storage.playList.splice(i, 1)
    localStorage.playList = JSON.stringify(window.store.storage.playList)
  },
  songInfo(item) {
    $.get('/song/detail', { ids: item.id }, (res) => {
      window.store.songInfo = res.songs[0]
      localStorage.songInfo = JSON.stringify(window.store.songInfo)
    })
  },
}

window.mutations = {

}

window.store = {
  // singerData: null,
  songInfo: localStorage.songInfo ? JSON.parse(localStorage.songInfo) : null,
  audioData: {
    curflag: true,
    width: null,
    src: null,
    autoplay: null,
    tabplay: true,
    schema: 1,
    flagAudio: false,
    // playsbox: true,
  },
  audio: null,
  storage: {
    playList: localStorage.playList ? JSON.parse(localStorage.playList) : [],
  },
}

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
