<template>
  <div
    class="mian"
  >
    <search />
    <Audio />
  </div>
</template>

<script>
import search from './components/Search.vue'
import Audio from './components/Audio.vue'

export default {
  name: 'App',
  components: {
    search,
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
