<template>
  <div
    class="mian"
  >
    <router-view />
    <Audio />
  </div>
</template>

<script>
import Audio from './components/Audio.vue'

export default {
  name: 'App',
  components: {
    Audio,
  },
}
</script>

<style lang="less" scoped>
 * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }
</style>
