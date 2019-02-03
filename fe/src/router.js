import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from './components/Search.vue'
import Lyric from './components/Lyric.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Search',
      component: Search,
    },
    {
      path: '/lyric',
      name: 'Lyric',
      component: Lyric,
    },
  ],
})
