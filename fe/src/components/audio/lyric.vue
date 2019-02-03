<template>
  <router-link
    v-if="store.storage.playList.length > 0 && store.songInfo"
    to="/Lyric"
    class="img"
  >
    <img
      :src="store.songInfo.al.picUrl"
      alt="stort"
    >
  </router-link>
  <div
    v-else
    class="img-hidde img"
  >
    <span class="iconfont icon-tuoyuan" />
  </div>
</template>

<script>
export default {
  name: 'Lyric',
  data() {
    return {
      store: window.store,
    }
  },
}
</script>


<style lang="less" scoped>
     .img-hidde {
       background: #dee0e1;
       text-align: center;
       .icon-tuoyuan {
         font-size: 50px;
       }
     }
    .img {
        height: 100%;
        width: 70px;
        padding: 3px;
        img {
        width: 100%;
        height: 100%;
        }
    }
</style>
