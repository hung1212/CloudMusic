<template>
  <div
    class="main"
  >
    <div
      class="top scrollbar"
    >
      <Nav />
      <router-view class="box" />
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
      // margin:0 auto;
      .top {
        display: flex;
        overflow: auto;
        height: calc(100vh - 70px);
        min-width: 1200px;
      }
    }
</style>
