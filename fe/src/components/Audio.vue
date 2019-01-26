<template>
  <div
    class="player"
    @mouseup="up"
    @mousemove="move"
  >
    <audio
      ref="audio"
      :src="store.songinfo"
      @timeupdate="monitorBar"
    />
    <div
      v-if="store.singerData"
      class="img"
    >
      <img
        :src="store.singerData.artists[0].img1v1Url"
        alt=""
      >
    </div>
    <div
      v-if="store.singerData"
      class="plays"
    >
      <span class="iconfont icon-48shangyishou qh" />
      <span
        ref="play"
        class="iconfont cut-paly"
        :class="{'icon-bofang':store.tabplay , 'icon-zanting':!store.tabplay}"
        @click="play"
      />
      <span
        class="iconfont icon-048caozuo_xiayishou qh
"
      />
    </div>
    <div
      v-if="store.singerData"
      class="info"
    >
      <div class="song">
        <div class="left">
          <span
            class="songname"
          >
            {{ store.singerData.name }}
          </span>
          -
          <span class="name">
            {{ store.singerData.artists[0].name }}
          </span>
        </div>
        <div class="right">
          <span class="start">
            {{ store.singerData.duration | curTime }}
          </span>
          /
          <span class="end">
            {{ store.singerData.duration | totalTime }}
          </span>
        </div>
      </div>
      <div
        class="progressPD"

        @click="clickBur"
      >
        <div
          ref="bur"
          class="progress"
        >
          <div
            ref="wacth"
            class="wacth"
            :style="{width:width}"
          >
            <div
              ref="dian"
              class="dian"
              @mousedown="down"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="store.singerData"
      class="caozuo"
    >
      <div class="like">
        <span class="iconfont icon-xihuan" />
      </div>
      <div class="schema">
        <span class="iconfont icon-moshiqiehuan" />
      </div>
      <div class="volume">
        <span class="iconfont icon-yinliang" />
      </div>
      <div
        class="playList"
      >
        <div
          class="control-plays"
          @click="playList"
        >
          <span
            class="iconfont icon-icon"
          />
        </div>
        <div
          v-if="playsbox"
          class="playList-box"
        >
          <div class="top">
            <h4>播放列表</h4>
            <p class="collect-all">
              <span class="iconfont icon-tianjiawenjian" />
              收藏全部
            </p>
            <p class="wire" />
            <p
              class="clearSorage"
              @click="clearSorage"
            >
              <span class="iconfont icon-shanchu" />
              清空
            </p>

            <div
              class="close"
              @click="shut"
            >
              ×
            </div>
          </div>
          <div

            class="bottom"
          >
            <div
              v-for="item of store.storage.getItem"
              :key="item.id"
              class="item"
              :class="{active:store.singerData.id === item.id}"
              @dblclick="dblsong(item,item.id)"
            >
              <dir
                class="icon"
              >
                <span class="iconfont icon-bofang" />
              </dir>
              <div
                class="name"
                :title="item.name"
              >
                {{ item.name }}
              </div>
              <div class="singer">
                {{ item.artists[0].name }}
              </div>
              <div class="time">
                {{ item.duration | totalTime }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div
      v-else
      class="player"
    >
      <audio
        ref="audio"
      />
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'Audio',
  filters: {
    curTime(time) {
      if (!window.store.audio.duration) return '00:00'
      const store = (time / 1000) * (window.store.audio.currentTime / window.store.audio.duration)
      const m = String(Math.floor((store / 60) / 10)) + String(Math.floor((store / 60) % 10))
      const s = String(Math.floor((store % 60) / 10)) + String(Math.floor(store % 60 % 10))
      return `${m}:${s}`
    },
    totalTime(time) {
      const store = (time / 1000)
      const m = String(Math.floor((store / 60) / 10)) + String(Math.floor((store / 60) % 10))
      const s = String(Math.floor((store % 60) / 10)) + String(Math.floor(store % 60 % 10))
      return `${m}:${s}`
    },
  },
  data() {
    return {
      store: window.store,
      width: '',
      tabplay: true,
      wacthWidth: '',
      dowmX: '',
      flag: false,
      curflag: true,
      playsbox: false,
    }
  },
  mounted() {
    window.store.audio = this.$refs.audio
  },
  methods: {
    down(e) {
      this.wacthWidth = parseInt(
        getComputedStyle(this.$refs.wacth, null).width,
        10,
      )
      this.dowmX = e.clientX - this.$refs.bur.getBoundingClientRect().left
      this.flag = true
      this.curflag = false
    },
    move(e) {
      if (!this.flag) return
      // this.wacthWidth = parseInt(getComputedStyle(this.$refs.wacth, null).width)
      // eslint-disable-next-line max-len
      const moveX = this.wacthWidth + (e.clientX - this.$refs.bur.getBoundingClientRect().left) - this.dowmX
      this.width = `${moveX / this.$refs.bur.offsetWidth * 100}%`
      const ratio = moveX / this.$refs.bur.offsetWidth

      this.store.tabplay = false
      this.store.audio.play()

      if (moveX > this.$refs.bur.offsetWidth) this.up()
      window.store.audio.currentTime = window.store.audio.duration * ratio
    },
    up() {
      this.flag = false
      this.curflag = true
    },
    play() {
      if (this.store.tabplay) {
        this.store.tabplay = false
        this.store.audio.play()
      } else {
        this.store.tabplay = true
        this.store.audio.pause()
      }
    },
    // 只要播放事件在改变,进度条就改变
    monitorBar() {
      if (!this.curflag) return
      this.width = `${this.store.audio.currentTime / this.store.audio.duration * 100}%`
    },
    // 只要进度条发生改变,当前时间也改变
    clickBur(e) {
      if (e.target === this.$refs.dian) return
        window.store.audio.currentTime = (e.clientX - this.$refs.bur.getBoundingClientRect().left) / this.$refs.bur.offsetWidth * this.store.audio.duration // eslint-disable-line
      this.store.tabplay = false
      this.store.audio.play()
    },
    // 切换播放列表
    playList() {
      this.playsbox = !this.playsbox
    },
    // 清除缓存
    clearSorage() {
      localStorage.clear('plays')
    },
    // 关闭播放列表
    shut() {
      this.playsbox = false
    },
    dblsong(item, id) {
      window.actions.play(item, id)
    },
  },
}
</script>

<style lang="less" scoped>
    .omit-sandian {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .player {
        background: #fff;
        border-top: 1px solid #ccc;
        height: 50px;
        position: fixed;
        bottom: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .img {
          height: 100%;
          width: 50px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .plays {
          display: flex;
          justify-content: space-around;
          align-items: center;
          color: #fff;
          padding: 0 20px;
          .iconfont {
            background-color:#df3b3b;
          }
          .cut-paly {
            text-align: center;
            line-height: 40px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin: 0 30px;
          }
          .qh {
            text-align: center;
            line-height: 30px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
        }
        .info {
            margin-right:30px;
          flex: 1;
          .song {
            display: flex;
            justify-content: space-between;
          }
          .progressPD {
            padding: 10px 0 ;
            width: 100%;
            .progress {
              width: 100%;
              height: 3px;
              background: #e5e5e5;
              .wacth {
                position: relative;
                width: 0;
                height: 100%;
                background:#d13c3a;
                .dian {
                  position: absolute;
                  top: 50%;
                  transform: translate(100% , -50%);
                  right: 0px;
                  width: 1px;
                  height: 1px;
                  border-radius: 50%;
                  padding: 8px;
                  border: 1px solid #ccc;
                  &::after {
                  content: "";
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50% , -50%);

                  width: 6px;
                  height: 6px;
                  background: #df3b3b;
                  border-radius: 50%;
                  }
                }
              }

            }
          }
        }
        .caozuo {
          width: 270px;
          display: flex;
          justify-content: space-around;
          line-height: 50px;
          > div {
              flex: 1;
          }
          > .playList {
              .control-plays {
                  width: 100%;
                  height: 100%
              }
             > .playList-box {
                 position: fixed;
                 right: 0;
                 bottom: 50px;
                 width: 500px;
                 height: 600px;
                 border: 1px solid #e5e5e5;
                 background: #fff;
                 overflow-x: auto;
                > .top {
                    height: 50px;
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid #ccc;
                    > h4 {
                        flex-grow: 1;
                        font-weight: 400;
                        font-size: 16px;
                        margin-left: 40px;
                    }
                    > .collect-all {
                        cursor: pointer;
                    }
                    > .wire {
                        margin: 0 20px;
                        height: 14px;
                        width: 1px;
                        background: #ccc;
                    }
                    > .clearSorage {
                        cursor: pointer;
                    }
                    > .close {
                        margin:0 27px;
                        font-size: 24px;
                        cursor: pointer;
                    }
                 }
                > .bottom {
                     >.item.active {
                         .icon,.name,.singer,.time {
                            color: #bc2f2d;
                         }
                         .icon {
                             visibility:initial
                         }
                     }
                    .item {
                        height: 50px;
                        line-height: 50px;
                        display: flex;
                        cursor: pointer;
                        &:nth-child(odd) {
                        background: #f4f4f6;
                    }
                        .icon {
                            visibility: hidden;
                            width: 8%;
                            text-align: center;
                        }
                        .name {
                            width:47%;
                            font-size: 16px;
                            padding-right: 20px;
                            .omit-sandian
                        }
                        .singer {
                            width: 30%;
                            color: #999999;
                            font-size: 14px;
                        }
                        .time {
                            width: 15px;
                        }
                    }
                }
              }
          }
        }
    }
</style>
