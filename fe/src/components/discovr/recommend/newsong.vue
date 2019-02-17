<template>
  <div
    id="newsong"
    class="margin-bottom30"
  >
    <div class="discovr-title">
      <div class="left">
        <span class="iconfont icon-zuixin" />
        最新音乐
      </div>
      <div class="right">
        更多
        <span class="iconfont icon-arrow-right" />
      </div>
    </div>
    <div class="content">
      <div
        v-for="(page,index) of newsong"
        :key="index"
        class="items"
      >
        <div
          v-for="item of page"
          :key="item.id"
          class="item"
        >
          <span class="i">
            01
          </span>
          <img
            :src="item.song.album.blurPicUrl"
            alt=""
          >
          <div class="text">
            <p class="name">
              {{ item.name }}
            </p>
            <p class="ger">
              富二代
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Newsong',
  data() {
    return {
      newsong: [],
    }
  },
  mounted() {
    this.getnewsong()
  },
  methods: {
    getnewsong() {
      $.get('/personalized/newsong', (res) => {
        if (res.code !== 200) return
        const the = []
        let page = null
        for (let i = 0; i < 10; i += 1) {
          page = Math.floor(i / 5)
          if (!the[page]) the[page] = []
          the[page].push(res.result[i])
        }
        this.newsong = the
      })
    },
  },
}
</script>

<style lang="less" scoped>
   #newsong {
     .content {
       margin-top: 20px;
       display:flex;
       .items {
        flex: 1;
        &:first-of-type{
          border-right: 1px solid #d7d7da;
        }
        .item {
          height: 70px;
          display: flex;
          align-items: center;
          &:nth-child(odd) {
            background: #f4f4f6;
          }
          &:hover {
            background: #ececed;
          }
          .i {
            padding: 0 10px;
          }
          img {
            width: 50px;
            height: 50px;
          }
          .text {
            margin-left: 10px;
            .name {
              font-size: 16px;
            }
          }
        }

       }
     }
   }
</style>
