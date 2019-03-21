import Vue from 'vue'
import VueRouter from 'vue-router'
// import Search from './components/Search.vue'
// import Discovr from './components/Discovr.vue'
// import SongListDetails from './components/SongListDetails.vue'
// import Lyric from './components/Lyric.vue'
// import MV from './components/MV.vue'
// import Friend from './components/Friend.vue'
// import Local from './components/Local.vue'
// import Download from './components/Download.vue'
// import LyLate from './components/Lately.vue'
// import recommend from './components/discovr/Recommend.vue'
// import songList from './components/discovr/songList.vue'
// import Radios from './components/discovr/Radios.vue'
// import NewSong from './components/discovr/NewSong.vue'
// import singer from './components/discovr/singer.vue'

const Search = () => import('./components/Search.vue')
const Discovr = () => import('./components/Discovr.vue')
const SongListDetails = () => import('./components/SongListDetails.vue')
const Lyric = () => import('./components/Lyric.vue')
const MV = () => import('./components/MV.vue')
const MVSift = () => import('./components/mv/sift.vue')
const MVList = () => import('./components/mv/list.vue')
const MVTotal = () => import('./components/mv/total.vue')
const Friend = () => import('./components/Friend.vue')
const Local = () => import('./components/Local.vue')
const Download = () => import('./components/Download.vue')
const LyLate = () => import('./components/Lately.vue')
const recommend = () => import('./components/discovr/Recommend.vue')
const songList = () => import('./components/discovr/songList.vue')
const Radios = () => import('./components/discovr/Radios.vue')
const NewSong = () => import('./components/discovr/NewSong.vue')
const singer = () => import('./components/discovr/singer.vue')

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
      path: '/songlistdetails',
      name: 'SongListDetails',
      component: SongListDetails,
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
      children: [
        {
          path: '',
          redirect: 'sift',
        },
        {
          path: 'sift',
          name: 'MVSift',
          component: MVSift,
        },
        {
          path: 'list',
          name: 'MVList',
          component: MVList,
        },
        {
          path: 'total',
          name: 'MVTotal',
          component: MVTotal,
        },
      ],
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
