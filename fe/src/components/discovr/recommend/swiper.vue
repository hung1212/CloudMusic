<!-- The ref attr used to find the swiper instance -->
<template>
  <swiper
    ref="mySwiper"
    :options="swiperOption"
  >
    <!-- slides -->
    <swiper-slide
      v-for="(item, index) of banner"
      :key="index"
    >
      <img
        :src="item.imageUrl"
        alt=""
      >
      <p
        class="typeTitle"
        :style="{backgroundColor:item.titleColor}"
      >
        {{ item.typeTitle }}
      </p>
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
      banner: [],
      swiperOption: {
        effect: 'coverflow',
        slidesPerView: 3,
        centeredSlides: true,
        loog: true,
        coverflowEffect: {
          rotate: 30,
          stretch: 10,
          depth: 100,
          modifier: 1,
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
    $.ajax({
      url: '/banner',
      type: 'get',
      dataType: 'json',
      success: (data) => {
        console.log(data.banners)
        this.banner = data.banners
      },
    })
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    this.swiper.slideTo(3, 1000, false)
  },
}
</script>

<style lang="less" scoped>
    .swiper-slide {
      margin-top: 50px;
      position: relative;
        img {
            height: 200px;
            width: 500px;
        }
        .typeTitle {
          position: absolute;
          right: 0;
          bottom: 10px;
          color: #fff;
          padding: 5px 40px;
          border-radius: 50px
        }
    }
</style>
