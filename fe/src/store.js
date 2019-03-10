import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songInfo: localStorage.songInfo ? JSON.parse(localStorage.songInfo) : [],
    playList: localStorage.playList ? JSON.parse(localStorage.playList) : [],
  },
  mutations: {
    setSongInfo(state, item) {
      state.songInfo = item
      localStorage.songInfo = JSON.stringify(window.store.songInfo)
      // const playList = window.store.storage.playList
      // const index = playList.findIndex(value => value.id === item.id)
      // if (index === -1) {
      //   playList.unshift(window.store.songInfo)
      //   localStorage.playList = JSON.stringify(window.store.storage.playList)
      // }
    },
  },
  actions: {
    songInfo({ commit }, item) {
      $.get('/song/detail', { ids: item.id }, (res) => {
        commit('setSongInfo', res.songs[0])
      })
    },
  },
})