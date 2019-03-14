import Vue from 'vue'

// 计算歌曲的总时间
Vue.filter('songTime', (time) => {
  if (!time) return '00:00'
  const timets = Math.floor(time / 1000)
  const m = String(Math.floor(timets / 60 / 10))
          + String(Math.floor(timets / 60) % 10)
  const s = String(Math.floor((timets % 60) / 10))
          + String(Math.floor(timets % 60) % 10)
  return `${m}:${s}`
})

// 计算播放次数
Vue.filter('playCount', (value) => {
  if (value < 10000) return value
  return `${Math.floor(value / 10000)}万`
})

// 歌手最多出现两个
Vue.filter('artists', (value) => {
  if (value.length === 1) return value[0].name
  if (value.length === 2) return `${value[0].name}/${value[1].name}`
  return `${value[0].name}/${value[1].name}/...`
})

// 歌曲的创建时间
Vue.filter('createTime', (t) => {
  function ten(v) {
    if (v > 9) return v
    return `0${String(v)}`
  }
  const y = new Date(t).getFullYear()
  const m = ten(new Date(t).getMonth())
  const d = ten(new Date(t).getDate())
  return `${y}-${m}-${d}`
})
