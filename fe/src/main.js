import Vue from 'vue'
import jquery from 'jquery'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './filter'
import './assets/iconfont/iconfont.css'
import './assets/less/base.less'
import './assets/less/pack.less'
import 'swiper/dist/css/swiper.css'
// 使用axios
Vue.prototype.$http = axios
window.$ = jquery
window.playMode = function playMode(content) {
  const div = document.createElement('div')
  div.innerHTML = content
  document.body.appendChild(div)
  div.style.cssText = 'position: fixed;left:50%;top:50%;transform: translate(-50%,-50%);'
  + 'background-color:#545454;font-size:20px;'
  + 'color:#fff;padding:20px 100px;border-radius:10px'
  setTimeout(() => {
    document.body.removeChild(div)
  }, 2000)
  if (content === '随机播放') {
    // 如果之前已经排好随机顺序,就不再重新排
    if (store.state.playRandom.length > 0) return
    const arr = [...store.state.playList]
    store.state.playRandom = []
    for (let i = 0; i < arr.length;) {
      const randomIndex = Math.floor(Math.random() * arr.length)
      store.state.playRandom.push(arr.splice(randomIndex, 1)[0])
    }
  }
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
      // 没有音乐的歌词.不做切割处理
      if (!res.lrc) return
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
    store.state.playList.splice(i, 1)
    localStorage.playList = JSON.stringify(store.state.playList)
  },
  switchMusic(type, order) {
    /** type
     *  'selfMotion'代表自动播放完的逻辑
        'manual'代表手动切换的逻辑
    */
    /** order:type === 1时出现的参数
        'previous' 点击上一首
        'next' 点击下一首
    */

    // 下一首播放的歌曲索引
    console.log(type, order)
    let nextIndex = -1
    // 当前歌曲的索引
    let currentIndex = Number
    // 播放列表的长度
    const playListLength = store.state.playList.length
    // 找出当前歌曲的索引
    store.state.playList.forEach((ele, i) => {
      console.log(store.state.songInfo.id)
      if (ele.id === store.state.songInfo.id) {
        currentIndex = i
        console.log(currentIndex)
      }
    })
    // 获得当前播放歌曲的索引
    function next(judge, assign, is) {
      if (currentIndex === judge) {
        nextIndex = assign
      } else {
        // is为Boolean类型
        // ture === +
        // false === -
        nextIndex = is ? currentIndex + 1 : currentIndex - 1
      }
    }
    // 手动切换播放歌曲
    function swiper() {
      if (order === 'previous') {
        if (playListLength) {
          next(0, playListLength - 1, false)
        }
      } else {
        next(playListLength - 1, 0, true)
      }
    }
    if (window.store.audioData.schema === 1) { // 1是列表循环
      if (type === 'selfMotion') {
        next(playListLength - 1, 0, true)
      } else { swiper() }
    } else if (window.store.audioData.schema === 2) { // 2是单曲播放
      if (type === 'selfMotion') {
        nextIndex = currentIndex
      } else { swiper() }
    } else if (window.store.audioData.schema === 3) { // 3是随机播放
      store.state.playRandom.forEach((ele, i) => {
        if (ele.id === store.state.songInfo.id) {
          currentIndex = i
        }
      })
      if (type === 'selfMotion') {
        next(playListLength - 1, 0, true)
      } else {
        next(playListLength - 1, 0, true)
      }
      window.actions.play(store.state.playRandom[nextIndex])
      store.dispatch('songInfo', store.state.playRandom[nextIndex])
      nextIndex = -1
    } else if (window.store.audioData.schema === 4) { // 4是顺序播放
      if (type === 'selfMotion') {
        if (playListLength - 1 === currentIndex) return
        nextIndex = currentIndex + 1
      } else {
        swiper()
      }
    }
    if (nextIndex !== -1) {
      console.log(store.state.playList[nextIndex])
      window.actions.play(store.state.playList[nextIndex])
      store.dispatch('songInfo', store.state.playList[nextIndex])
    }
  },
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
