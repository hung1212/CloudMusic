<template>
  <div>
    <!-- <swiperLrc /> -->
    <nominate />
    <personalized />
    <privatecontent />
    <newsong />
    <rmvmList />
    <djprogram />
  </div>
</template>
<script>

// import swiperLrc from './recommend/swiper.vue'
import nominate from './recommend/nominate.vue'
import personalized from './recommend/personalized.vue'
import privatecontent from './recommend/privatecontent.vue'
import newsong from './recommend/newsong.vue'
import rmvmList from './recommend/mv.vue'
import djprogram from './recommend/djprogram.vue'

export default {
  name: 'Recommend',
  components: {
    // swiperLrc,
    nominate,
    personalized,
    privatecontent,
    newsong,
    rmvmList,
    djprogram,
  },
}
</script>

<style lang="less" scoped>

</style>
