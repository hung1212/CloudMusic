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
          v-for="(item, i) of page"
          :key="item.id"
          class="item"
          :class="{active:currentItem === item , currentplay:currentplay === item}"
          @click="song(item,item.id)"
          @dblclick="dblsong(item,item.id )"
        >
          <span
            v-if="store.songInfo && store.songInfo.id === item.id"
            class="i"
          >
            <span class="iconfont icon-yinliang" />
          </span>
          <span
            v-else
            class="i"
          >
            {{ (index*5) + i +1 | index }}
          </span>
          <img
            :src="item.song.album.blurPicUrl"
            alt
          >
          <div class="text">
            <p class="name">
              {{ item.name }}
            </p>
            <p class="ger">
              {{ item.song.artists[0].name }}
            </p>
          </div>
          <span
            class="iconfont icon-bofang1"
            @click="dblsong(item,item.id )"
          />
          <span class="iconfont icon-gengduosandian" />
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
      store: window.store,
      newsong: [],
      currentItem: null,
      currentplay: null,
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
    song(item) {
      this.currentItem = item
    },
    dblsong(item) {
      this.currentplay = item
      window.actions.play(item)
      console.log(this.$store)
      this.$store.dispatch('songInfo', item)
      // window.actions.songInfo(item)
    },
  },
}
</script>

<style lang="less" scoped>
#newsong {
  .content {
    margin-top: 20px;
    display: flex;
    .items {
      flex: 1;
      &:first-of-type {
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
        &.active {
          background: #ceced6;
          div {
            p {
              animation: textshake 1s;
            }
          }
          @keyframes textshake {
            0% {
              transform: translateX(0px);
            }
            50% {
              transform: translateX(3px);
            }
            100% {
              transform: translateX(0px);
            }
          }
          .icon-bofang1 {
            display: block;
          }
        }
        .icon-bofang1,
        .icon-gengduosandian,{
          display: none;
          font-size: 18px;
          margin-right: 10px;
          width: 20px;
        }
        .icon-yinliang {
          color: #c32d2e;
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
          flex:1;
          .name {
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>
