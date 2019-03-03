<template>
  <div
    id="personalized"
    class="margin-bottom30"
  >
    <div class="discovr-title">
      <div class="left">
        <span class="iconfont icon-rili" />
        推荐歌单
      </div>
      <div class="right">
        更多
        <span class="iconfont icon-arrow-right" />
      </div>
    </div>
    <div class="content">
      <div
        v-for="(page,index) of personalized"
        :key="index"
        class="items"
      >
        <div
          v-for="item of page"
          :key="item.id"
          class="item"
          @click="$router.push({name:'SongListDetails', query: {id:item.id}})"
        >
          <div class="img">
            <img
              :src="item.picUrl"
              alt=""
            >
            <p>
              {{ item.playCount | playCount }}
            </p>
          </div>
          <div class="text">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Personalized',
  filters: {
    playCount(value) {
      if (value < 10000) return value
      const sum = Math.floor(value / 10000)
      return `${sum}万`
    },
  },
  data() {
    return {
      personalized: [],
    }
  },
  mounted() {
    this.pages()
  },
  methods: {
    pages() {
      const arr = []
      $.get('/personalized', (res) => {
        if (res.code === 200) {
          const pages = res.result
          pages.length = 10
          pages.forEach((ele, index) => {
            const page = Math.floor(index / 5)
            if (!arr[page]) {
              arr[page] = []
            }
            arr[page].push(ele)
          })
          this.personalized = arr
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
  #personalized {
    .title {
      font-size: 16px;
      border-bottom: 1px solid #e4e4e7;
      padding-bottom: 10px;
    }
    .content {
      margin-top: 12px;
      .items {
        display: flex;
        justify-content: space-between;
        &:nth-of-type(n+2) {
          margin-top: 30px;
        }
        .item {
          width: 180px;
          &:hover .img{
            transition: all 0.5s;
            opacity: .7;
          }
        }
        .img {
          position: relative;
          img {
            width: 100%;
            height: 100%;
          }
          p {
            position: absolute;
            top: 0;
            right: 5px;
            color:#fff;
          }
        }
        .text {
          margin: 10px 0 0 0;
          font-size: 16px;
          font-weight: 700;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
</style>
