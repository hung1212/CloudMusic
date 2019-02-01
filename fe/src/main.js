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
  div.style.cssText = 'position: fixed;left:50%;top:50%;transform: translate(-50%,-50%);'
  + 'background-color:#545454;font-size:20px;'
  + 'color:#fff;padding:20px 100px;border-radius:10px'
  setTimeout(() => {
    document.body.removeChild(div)
  }, 2000)
}
window.actions = {
  play(item, cb) {
    $.get('/song/url', { id: item.id }, (res) => {
      window.store.audioData.src = res.data[0].url
      window.store.audio.src = window.store.audioData.src
      window.store.audio.play()
      window.store.audioData.tabplay = false
      window.store.audioData.flagAudio = true
      if (cb) {
        cb()
      }
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
  previous() {
    if (window.store.audioData.schema === 1) { // 1是列表循环
      window.store.storage.playList.forEach((ele, i, arr) => {
        if (ele.id === window.store.songInfo.id) {
          if (i === 0) {
            window.actions.play(arr[arr.length - 1])
            window.actions.songInfo(arr[arr.length - 1])
          } else {
            window.actions.play(arr[i - 1])
            window.actions.songInfo(arr[i - 1])
          }
        }
      })
    } else if (window.store.audioData.schema === 2) { // 2是单曲播放

      // window.store.audio.currentTime = 0
      // window.actions.play(window.store.songInfo)
    } else if (window.store.audioData.schema === 3) { // 3是随机播放
      window.store.storage.playList.forEach((ele, i, arr) => {
        let ran = ''
        function random() {
          ran = Math.floor(Math.random() * arr.length)
          if (i === ran) {
            random()
          }
        }
        if (ele.id === window.store.songInfo.id) {
          random()
          window.actions.play(arr[ran])
          window.actions.songInfo(arr[ran])
        }
      })
    } else if (window.store.audioData.schema === 4) { // 4是顺序播放
      window.store.storage.playList.forEach((ele, i, arr) => {
        if (ele.id === window.store.songInfo.id) {
          if (arr.length - 1 === i) return
          window.actions.play(arr[i + 1])
          window.actions.songInfo(arr[i + 1])
        }
      })
    }
  },
  next() {
    if (window.store.audioData.schema === 1) { // 1是列表循环
      window.store.storage.playList.forEach((ele, i, arr) => {
        if (ele.id === window.store.songInfo.id) {
          if (arr.length - 1 === i) {
            window.actions.play(arr[0])
            window.actions.songInfo(arr[0])
          } else {
            window.actions.play(arr[i + 1])
            window.actions.songInfo(arr[i + 1])
          }
        }
      })
    } else if (window.store.audioData.schema === 2) { // 2是单曲播放
      window.store.storage.playList.forEach((ele, i, arr) => {
        if (ele.id === window.store.songInfo.id) {
          if (i === 0) {
            window.actions.play(arr[arr.length - 1])
            window.actions.songInfo(arr[arr.length - 1])
          } else {
            window.actions.play(arr[i - 1])
            window.actions.songInfo(arr[i - 1])
          }
        }
      })
    } else if (window.store.audioData.schema === 3) { // 3是随机播放
      window.store.storage.playList.forEach((ele, i, arr) => {
        let ran = ''
        function random() {
          ran = Math.floor(Math.random() * arr.length)
          if (i === ran) {
            random()
          }
        }
        if (ele.id === window.store.songInfo.id) {
          random()
          window.actions.play(arr[ran])
          window.actions.songInfo(arr[ran])
        }
      })
    } else if (window.store.audioData.schema === 4) { // 4是顺序播放
      window.store.storage.playList.forEach((ele, i, arr) => {
        if (ele.id === window.store.songInfo.id) {
          if (arr.length - 1 === i) return
          window.actions.play(arr[i + 1])
          window.actions.songInfo(arr[i + 1])
        }
      })
    }
  },
}

window.mutations = {

}

window.store = {
  audio: null,
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
  storage: {
    playList: localStorage.playList ? JSON.parse(localStorage.playList) : [],
  },
}

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
