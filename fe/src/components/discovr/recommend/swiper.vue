<!-- The ref attr used to find the swiper instance -->
<template>
  <swiper
    ref="mySwiper"
    :options="swiperOption"
  >
    <!-- slides -->
    <swiper-slide>
      <img
        src="https://www.swiper.com.cn/demo/pcSlide/images/b1.jpg"
        alt=""
      >
    </swiper-slide>
    <swiper-slide>
      <img
        src="https://www.swiper.com.cn/demo/pcSlide/images/b2.jpg"
        alt=""
      >
    </swiper-slide>
    <swiper-slide>
      <img
        src="https://www.swiper.com.cn/demo/pcSlide/images/b3.jpg"
        alt=""
      >
    </swiper-slide>
    <swiper-slide>
      <img
        src="https://www.swiper.com.cn/demo/pcSlide/images/b4.jpg"
        alt=""
      >
    </swiper-slide>
    <swiper-slide>
      <img
        src="https://www.swiper.com.cn/demo/pcSlide/images/b5.jpg"
        alt=""
      >
    </swiper-slide>
    <swiper-slide>
      <img
        src="https://www.swiper.com.cn/demo/pcSlide/images/b6.jpg"
        alt=""
      >
    </swiper-slide>
    <swiper-slide>
      <img
        src="http://bbs.swiper.com.cn/forum.php?mod=viewthread&tid=1598&extra="
        alt=""
      >
    </swiper-slide>
    <!-- Optional controls -->
    <div
      slot="pagination"
      class="swiper-pagination"
    />
    <div
      slot="button-prev"
      class="swiper-button-prev"
    />
    <div
      slot="button-next"
      class="swiper-button-next"
    />
    <div
      slot="scrollbar"
      class="swiper-scrollbar"
    />
  </swiper>
</template>

<script>
export default {
  name: 'Carrousel',
  data() {
    return {
      swiperOption: {
        effect: 'coverflow',
        slidesPerView: 3,
        centeredSlides: true,
        loog: true,
        coverflowEffect: {
          rotate: 30,
          stretch: 10,
          depth: 60,
          modifier: 2,
          slideShadows: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },

    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    // console.log('this is current swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)
  },
}
</script>

<style lang="less" scoped>
    .swiper-slide {
        img {
            height: 200px;
        }
    }
</style>
