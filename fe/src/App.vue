<template>
  <div
    class="main"
  >
    <div
      class="top"
      :style="{ height: $route.name === 'Lyric'? 'auto' :'calc(100vh - 70px)' }"
    >
      <Nav />
      <router-view />
    </div>
    <Audio />
  </div>
</template>

<script>
import Audio from './components/Audio.vue'
import Nav from './components/Nav.vue'

export default {
  name: 'App',
  components: {
    Audio,
    Nav,
  },
}
</script>

<style lang="less" scoped>
 * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }
    .main {
      display: flex;
      flex-direction: column;
      // width:1200px;
      // margin:0 auto;
      .top {
        display: flex;
        background:#fafafc
      }
    }
</style>
