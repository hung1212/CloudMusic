import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from './components/Search.vue'
import Discovr from './components/Discovr.vue'
import Lyric from './components/Lyric.vue'
import MV from './components/MV.vue'
import Friend from './components/Friend.vue'
import Local from './components/Local.vue'
import Download from './components/Download.vue'
import LyLate from './components/Lately.vue'
import recommend from './components/discovr/Recommend.vue'
import songList from './components/discovr/songList.vue'
import Radios from './components/discovr/Radios.vue'
import NewSong from './components/discovr/NewSong.vue'
import singer from './components/discovr/singer.vue'

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
    {
      path: '/discovr',
      name: 'Discovr',
      component: Discovr,
      children: [
        {
          path: 'recommend',
          component: recommend,
        },
        {
          path: 'songlist',
          component: songList,
        },
        {
          path: 'radios',
          component: Radios,
        },
        {
          path: 'newsong',
          component: NewSong,
        },
        {
          path: 'singer',
          component: singer,
        },
      ],
    },
    {
      path: '/mv/',
      name: 'MV',
      component: MV,
    },
    {
      path: '/friend',
      name: 'Friend',
      component: Friend,
    },
    {
      path: '/local',
      name: 'Local',
      component: Local,
    },
    {
      path: '/download',
      name: 'Download',
      component: Download,
    },
    {
      path: '/lyLate',
      name: 'LyLate',
      component: LyLate,
    },
  ],
})
