<template>
  <div class="silrc">
    <div class="title">
      相似歌曲
    </div>
    <div class="content">
      <div
        v-for="item of siSong"
        :key="item.id"
        class="item"
        :class="{active:currentItem === item , currentplay:currentplay === item}"
        @click="song(item,item.id)"
        @dblclick="dblsong(item,item.id )"
      >
        <div class="name">
          {{ item.name }}
        </div>

        <span
          class="iconfont icon-bofang1"
          @click="dblsong(item,item.id )"
        />
        <div class="nickname">
          <p class="omit-text">
            {{ item.artists | artists }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Silrc',
  filters: {
    artists(value) {
      if (value.length === 1) return value[0].name
      if (value.length === 2) return `${value[0].name}/${value[1].name}`
      return `${value[0].name}/${value[1].name}/...`
    },
  },
  data() {
    return {
      store: window.store,
      siSong: '',
      currentItem: null,
      currentplay: null,
    }
  },
  watch: {
    'store.songInfo': function () {
      this.silrc()
    },
  },
  mounted() {
    this.silrc()
  },
  methods: {
    silrc() {
      if (!this.store.songInfo) return
      $.get('/simi/song', { id: this.store.songInfo.id }, (res) => {
        this.siSong = res.songs
      })
    },
    song(item) {
      this.currentItem = item
    },
    dblsong(item) {
      this.currentplay = item
      window.actions.play(item)
      window.actions.songInfo(item)
    },
  },
}
</script>

<style lang="less" scoped>
.silrc {
  .title {
    border-bottom: 1px solid #bbbabd;
    font-size: 16px;
    padding: 10px 0;
    font-weight: 700;
  }
  .content {
    .item {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      line-height: 40px;
      &:first-child {
        margin-top: 15px;
      }
      &:hover {
        background: #c5c5c6;
      }
      .name {
        flex:1;
      }
      .nickname {
        width: 80px;
        text-align: right;
        p {
          color: #9b9b9b;
        }
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
        .icon-bofang1,
        .icon-gengduosandian {
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
    }
  }
}
</style>
