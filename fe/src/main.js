import Vue from 'vue'
import jquery from 'jquery'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/iconfont/iconfont.css'
import './assets/less/base.less'
import './assets/less/pack.less'
import 'swiper/dist/css/swiper.css'
// import VueRouter from 'vue-router'
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
      // 获取歌曲url
      window.store.audioData.src = res.data[0].url
      window.store.audio.src = window.store.audioData.src
      window.store.audio.play()
      window.store.audioData.tabplay = false
      window.store.audioData.flagAudio = true
      if (cb) {
        cb()
      }
    })
    window.actions.lyric(item)
  },
  lyric(item) {
    // 获取歌曲歌词
    $.get('/lyric', { id: item.id }, (res) => {
      function timeMsec(a) {
        const min = a.slice(1, 3) * 60000
        const sec = a.slice(4, 6) * 1000
        const msec = a.slice(7) * 1
        const time = min + sec + msec
        return time
      }
      const lyric = res.lrc.lyric.split('\n')
      window.store.lrc.lyric = []
      lyric.forEach((ele) => {
        const a = ele.split(']')
        const time = timeMsec(a[0])
        if (a[1]) {
          const obj = {}
          obj.time = time
          obj.lrc = a[1]
          obj.index = window.store.lrc.lyric.length
          window.store.lrc.lyric.push(obj)
        }
      })
    })
  },
  playsDelete(arr, i) {
    window.store.storage.playList.splice(i, 1)
    localStorage.playList = JSON.stringify(window.store.storage.playList)
  },
  // songInfo(item) {
  //   $.get('/song/detail', { ids: item.id }, (res) => {
  //     window.store.songInfo = res.songs[0]
  //     localStorage.songInfo = JSON.stringify(window.store.songInfo)
  //     const playList = window.store.storage.playList
  //     const index = playList.findIndex(value => value.id === item.id)
  //     if (index === -1) {
  //       playList.unshift(window.store.songInfo)
  //     }
  //     localStorage.playList = JSON.stringify(window.store.storage.playList)
  //   })
  // },
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
  actions: window.actions,
  audio: null,
  // singerData: null,
  // songInfo: localStorage.songInfo ? JSON.parse(localStorage.songInfo) : null,

  lrc: {
    lyric: null, // 歌词
    currentLrc: {}, // 当前显示的一句歌词
    disk: false, // 歌词的圆盘动画效果
    diskFalse: true,
    sum: 0,
  },
  audioData: {
    curflag: true,
    width: null,
    src: null,
    autoplay: null,
    tabplay: true,
    schema: 1,
    flagAudio: false,
    volumeMove: false,
    // playsbox: true,
  },
  storage: {
    playList: [],
  },
  user: {
    profile: null,
    userLogin: null,

    // 登陆用户
    status(fn) {
      $.get('/login/status', (res) => {
        if (res.code === 200) {
          window.store.user.userLogin = res.profile
          window.store.user.detail()
          window.store.user.subcount()
          fn()
        }
      })
    },
    // 获取用户详情
    detail() {
      $.get({
        url: '/user/detail',
        data: { uid: window.store.user.userLogin.userId },
        success: (res) => {
          window.store.user.profile = res.profile
        },
      })
    },
    subcount() {
      $.get('/user/subcount', (res) => {
        console.log(res)
      })
    },
  },
}

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
