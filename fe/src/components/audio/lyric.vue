<template>
  <div
    v-if="songInfo"
    class="img"
    @click="back"
  >
    <img
      :src="songInfo.al.picUrl"
      alt="stort"
    >
  </div>
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
  computed: {
    songInfo() {
      return this.$store.state.songInfo
    },
  },
  methods: {
    back() {
      if (this.$route.name === 'Lyric') {
        this.$router.go(-1)
      } else {
        this.$router.push('/lyric')
      }
    },
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
