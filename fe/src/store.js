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
      console.log(item)
      $.get('/song/detail', { ids: item.id }, (res) => {
        commit('setSongInfo', res.songs[0])
      })
    },
  },
})
