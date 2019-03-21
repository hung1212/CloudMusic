import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songInfo: localStorage.songInfo ? JSON.parse(localStorage.songInfo) : {},
    playList: localStorage.playList ? JSON.parse(localStorage.playList) : [],
    playRandom: [],
  },
  mutations: {
    setSongInfo(state, item, list = state.playList) {
      state.songInfo = item
      localStorage.songInfo = JSON.stringify(state.songInfo)
      const playList = list
      const index = playList.findIndex(value => value.id === item.id)
      if (index === -1) {
        playList.unshift(state.songInfo)
        localStorage.playList = JSON.stringify(list)
        if (state.playRandom.length > 0) {
          state.playRandom.unshift(state.songInfo)
        }
      }
    },
    asPlayList(state, list) {
      state.playList = list
      if (list) {
        localStorage.playList = JSON.stringify(state.playList)
      } else {
        localStorage.removeItem('playList')
      }
    },
    asSongInfo(state, item) {
      state.songInfo = item
      if (item) {
        localStorage.playList = JSON.stringify(state.songInfo)
      } else {
        localStorage.removeItem('songInfo')
      }
    },
  },
  actions: {
    songInfo({ commit }, item) {
      $.get('/song/detail', { ids: item.id }, (res) => {
        commit('setSongInfo', res.songs[0])
      })
    },
    checkMusic({ context }, item) {
      return new Promise(async (resolve) => {
        resolve()
        // Vue.prototype.$http.get('/check/music', {
        //   params: {
        //     id: item.id,
        //   },
        // }).then((res) => {
        //   if (res.data.success) {
        //     resolve(window.actions.play(item))
        //   } else {
        //     Vue.prototype.message(res.data.message)
        //   }
        // }).catch((error) => {
        //   if (!error.response.data.success) {
        //     Vue.prototype.message(error.response.data.message)
        //   }
        // })
      })
    },
  },
})
