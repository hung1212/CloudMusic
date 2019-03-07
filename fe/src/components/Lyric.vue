<template>
  <div class="bg">
    <div
      v-if="store.songInfo"
      class="main"
    >
      <div class="lyric">
        <div
          class="lry-bg"
          :style="{backgroundImage: 'url('+store.songInfo.al.picUrl+')'}"
        />
        <div class="top">
          <div class="left">
            <div
              id="disk"
              ref="disk"
              class="disk"
              :class="{ diskmove:store.lrc.disk}"
            >
              <img
                :src="store.songInfo.al.picUrl"
                alt=""
              >
            </div>
          </div>
          <div
            class="right"
            :class="{thumbShow:thumbShow}"
            @mouseenter="lrcMove"
            @mouseleave="lrcOut"
          >
            <h4>{{ store.songInfo.name }}</h4>
            <div class="intro">
              <p class="album">
                专辑: <a href="##">
                  {{ store.songInfo.al.name }}
                </a>
              </p>
              <p class="album">
                歌手: <a href="##">
                  {{ store.songInfo.ar[0].name }}
                </a>
              </p>
              <p class="album">
                来源: <a href="##" />
              </p>
            </div>
            <div
              ref="lrc"
              class="lrc scrollbar"
            >
              <p
                v-for="(value , index) of store.lrc.lyric"
                :key="index"
                :class="{active:index === store.lrc.currentLrc.index}"
              >
                {{ index }}:{{ value.lrc }}:{{ store.lrc.currentLrc.index }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="bottom">
        <comment />
        <div class="right">
          <silrc class="silrc" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import comment from './lyric/comment.vue'
import silrc from './lyric/silrc.vue'

export default {
  name: 'Lyric',
  components: {
    comment,
    silrc,
  },
  data() {
    return {
      store: window.store,
      deg: 0,
      timeID: Number,
      thumbShow: false,
      timeFlag: 0,
    }
  },
  watch: {
    // eslint-disable-next-line
    'store.songInfo': function () {
      if (!window.store.songInfo) {
        this.$router.push({
          name: 'Search',
        })
      }
    },
    // eslint-disable-next-line
    'store.lrc.currentLrc': function () {
      this.$refs.lrc.scrollTop += 30
    },
    // eslint-disable-next-line
    'store.audioData.tabplay': function () {
      this.disk()
    },
  },
  mounted() {
    window.actions.lyric(this.store.songInfo)
    this.disk()
  },
  destroyed() {
    clearInterval(this.store.timeID)
  },
  methods: {
    lrcMove() {
      clearTimeout(this.timeFlag)
      this.thumbShow = true
    },
    lrcOut() {
      this.timeFlag = setTimeout(() => {
        this.thumbShow = false
      }, 10000)
    },
    disk() {
      this.$refs.disk.style.transform = `rotateZ(${this.store.lrc.sum}deg)`
      if (!this.store.audioData.tabplay) {
        this.store.timeID = setInterval(() => {
          this.store.lrc.sum += 0.05
          if (this.store.lrc.sum >= 360) this.store.lrc.sum = 0
          this.$refs.disk.style.transform = `rotateZ(${this.store.lrc.sum}deg)`
        }, 1)
      } else {
        clearInterval(this.store.timeID)
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log(to, from)
    if (window.store.songInfo) {
      next()
    } else {
      next({
        name: 'Search',
      })
    }
  },
}
</script>
<style lang="less" scoped>
.bg {
  width: 100%;
  .main {
    background: #d7d8d9;
    .lyric {
       position: relative;
      .lry-bg {
        width: 100%;
        height: 500px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        -webkit-filter:blur(120px);
        filter: blur(120px);
      }
    .top {
        width: 1000px;
        position:absolute;
        top: 10px;
        left: 50%;
        transform: translate(-50%,0);
        display: flex;
        height: 500px;
        .left {
          padding:20px;
          .disk {
            width: 322px;
            height: 322px;
            background: url("https://s2.music.126.net/style/web2/img/coverall.png?18787c7fb492ce0033964d1ce51e2e9c") no-repeat center;
            background-size:600px;
            background-position:-223px -918px;
            position: relative;
            img {
              width: 206px;
              height:206px;
              border-radius: 50%;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%)
            }
          }
        }
        .right {
          flex: 1;
          margin-left: 80px;
          h4 {
            font-size: 20px;
            color: #333333;
            font-weight: normal;
          }
          .intro {
            display: flex;
            margin: 10px 0 20px 0;
            p {
              margin-right: 20px;
              a {
                color: #1a5a99;
              }
            }

          }
          &.thumbShow .lrc::-webkit-scrollbar-thumb {
            background: rgba(120, 134, 142,.2);
          }
          .lrc {
            height: 400px;
            overflow-x: auto;
            &::-webkit-scrollbar-track {
              background: transparent;
            }
            &::-webkit-scrollbar-thumb {
              background: transparent;
            }
            p {
              font-size: 16px;
              padding: 10px 0;
              &.active {
                color: #fff;
              }
            }
          }
        }
    }
  }
  .bottom {
    width: 1000px;
    margin:0 auto;
        display: flex;
        .right {
          width: 300px;
          margin-left: 50px;
        }
    }
  }
}
</style>
