<template>
  <div
    class="main"
  >
    <div class="top">
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
      .top {
        display: flex;
        overflow: hidden;
        height: calc(100vh - 70px)
      }
    }
</style>
