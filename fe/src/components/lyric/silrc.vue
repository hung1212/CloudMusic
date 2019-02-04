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
      >
        <div class="name">
          {{ item.name }}
        </div>
        <div
          class="nickname"
        >
          <p>
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
                .nickname {
                   p {
                       color: #9b9b9b;
                   }
                }
            }

        }
    }
</style>
