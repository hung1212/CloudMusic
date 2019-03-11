<template>
  <div
    v-if="result"
    class="search-result-content"
  >
    <div class="best">
      <div class="best-title">
        最佳匹配
      </div>
      <div
        v-for="item of artist"
        :key="item.id"
        class="best-content"
      >
        <img
          :src="item.picUrl"
          alt
        >
        <p>
          歌手:
          <span>{{ item.name }}</span>
        </p>
      </div>
    </div>
    <div class="off" />
    <div
      ref="songs"
      class="song"
    >
      <ul>
        <li
          v-for="item of result"
          :key="item.id"
          ref="song"
          :class="{active:currentItem === item , currentplay:currentplay === item}"
          @click="song(item,item.id)"
          @dblclick="dblsong(item,item.id )"
        >
          <div>
            <p class="name">
              <span
                v-if="$store.state.songInfo && $store.state.songInfo.id === item.id"
                class="iconfont icon-yinliang"
              />
              <span
                class="songname"
                :title="item.name"
              >
                {{ item.name }}
              </span>
              <span
                class="iconfont icon-bofang1"
                @click="dblsong(item,item.id )"
              />
              <span class="iconfont icon-gengduosandian" />
            </p>
            <p class="artistsName">
              <span>{{ item.artists[0].name }}</span>
            </p>
            <p class="albumName">
              <span>{{ item.album.name }}</span>
            </p>
            <p class="time">
              <span>{{ item.duration | songTime }}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div
    v-else
    class="empty"
  >
    <p>暂无搜索结果</p>
  </div>
</template>

<script>
export default {
  name: 'GongsSingle',
  filters: {
    songTime(time) {
      const store = Math.floor(time / 1000)
      const m = String(Math.floor(store / 60 / 10))
        + String(Math.floor(store / 60) % 10)
      const s = String(Math.floor((store % 60) / 10))
        + String(Math.floor(store % 60) % 10)
      return `${m}:${s}`
    },
  },
  props: {
    result: {
      type: Array,
      default() {
        return []
      },
    },
    artist: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      store: window.store,
      currentItem: null,
      currentplay: null,
    }
  },
  mounted() {
    // this.songHeight()
  },
  methods: {
    song(item) {
      this.currentItem = item
    },
    dblsong(item) {
      this.currentplay = item
      window.actions.play(item)
      this.$store.dispatch('songInfo', item)
    },
    // songHeight() {
    //   const song = this.$refs.song
    //   const songsHeight = this.$refs.songs
    //   songsHeight.style.height = `${song[0].offsetHeight * song.length}px`
    // },

  },
}
</script>

<style lang="less" scoped>
.wrap {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 20px;
}

.search-result-content {
  .best {
    .best-title {
      color: #ccc;
      padding-bottom: 10px;
    }
    .best-content {
      display: flex;
      padding: 10px;
      background-color: #f4f4f6;
      img {
        width: 50px;
        height: 55px;
      }
      p {
        align-self: center;
        padding: 0 5px;
        span {
          color: #477aac;
        }
      }
    }
  }
  .off {
    width: 100%;
    height: 1px;
    background-color: #ccc;
    margin: 20px 0;
  }
  .song {
    li {
      padding: 10px 15px;
      font-size: 12px;
      cursor: pointer;
      &:hover,
      &:nth-child(odd):hover {
        background: #878796;
      }
      &:nth-child(odd) {
        background: #f4f4f6;
      }
      &.currentplay .icon-yinliang {
        display: block;
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
            transform: translateX(0px)
          }
          50% {
            transform: translateX(3px)
          }
          100% {
            transform: translateX(0px)
          }
        }
        .icon-bofang1,
        .icon-gengduosandian,
        {
          display: block;
        }
      }
      .icon-bofang1,
      .icon-gengduosandian{
         display: none;
         font-size: 18px;
           margin-right: 10px;
           width: 20px;
       }
       .icon-yinliang {
         color: #c32d2e;
         font-size: 18px;
          margin-right: 10px;
          width: 20px;
       }
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          width: 20%;
          .wrap;
        }
        .name {
          width: 40%;
          font-size: 15px;
          display: flex;
          .songname {
            flex-grow: 1;
            .wrap;
          }
          .wrap;
        }
      }
    }
  }
}
</style>
