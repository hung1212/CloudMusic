<template>
  <div
    v-if="playList.length > 0 && songInfo"
    class="caozuo"
  >
    <div class="like">
      <span class="iconfont icon-xihuan" />
    </div>
    <div
      class="schema"
      @click="schema"
    >
      <span
        v-if="store.audioData.schema === 1"
        class="iconfont icon-moshiqiehuan"
      />
      <span
        v-if="store.audioData.schema === 2"
        class="iconfont icon-danquxunhuan"
      />
      <span
        v-if="store.audioData.schema === 3"
        class="iconfont icon-suijibofang"
      />
      <span
        v-if="store.audioData.schema === 4"
        class="iconfont icon-bofangliebiao"
      />
    </div>
    <div
      class="volume"
    >
      <span
        class="iconfont icon-yinliang"
        @click="volume"
      />
      <div
        v-show="volumeShow"
        class="volume-box"
      >
        <span class="iconfont icon-yinliang" />
        <div
          class="dianji"
          @mousedown="down"
        >
          <div
            ref="width"
            class="width"
          >
            <div
              ref="wacthNull"
              class="wacthNull"
            >
              <div
                ref="wacth"
                class="wacth"
              >
                <div
                  ref="dian"
                  class="dian"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="playList"
    >
      <div
        class="control-plays"
        @click="playListShow"
      >
        <span
          class="iconfont icon-liebiao"
        />
        <p class="length">
          {{ playList.length }}
        </p>
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
            v-for="(item,index) of playList"
            :key="item.id"
            class="item"
            :class="{active:songInfo.id === item.id , click:currentTime === item}"
            @click="clicksong(item)"
            @dblclick="dblsong(item)"
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
              <p class="grow">
                {{ item.name }}
              </p>
              <span
                class="iconfont icon-bofang1"
                @click="dblsong(item)"
              />
              <span class="iconfont icon-yuanquananniu" />
              <span class="iconfont icon-gengduosandian" />
            </div>
            <div class="singer">
              {{ item.ar[0].name }}
            </div>
            <div class="time">
              {{ item.dt | songTime }}
            </div>
            <div class="clear">
              <span
                class="iconfont icon-yuanquan-cha"
                @click="deleteStorage(item,index)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-else
    class="caozuo"
  >
    <div class="like">
      <span class="iconfont icon-xihuan" />
    </div>
    <div
      class="schema"
      @click="schema"
    >
      <span
        v-if="store.audioData.schema === 1"
        class="iconfont icon-moshiqiehuan"
      />
      <span
        v-if="store.audioData.schema === 2"
        class="iconfont icon-danquxunhuan"
      />
      <span
        v-if="store.audioData.schema === 3"
        class="iconfont icon-suijibofang"
      />
      <span
        v-if="store.audioData.schema === 4"
        class="iconfont icon-bofangliebiao"
      />
    </div>
    <div
      class="volume"
    >
      <span
        class="iconfont icon-yinliang"
        @click="volume"
      />
      <div
        v-show="volumeShow"
        class="volume-box"
      >
        <span class="iconfont icon-yinliang" />
        <div
          class="dianji"
          @mousedown="down"
        >
          <div
            ref="width"
            class="width"
          >
            <div
              ref="wacthNull"
              class="wacthNull"
            >
              <div
                ref="wacth"
                class="wacth"
              >
                <div
                  ref="dian"
                  class="dian"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="playList"
    >
      <div
        class="control-plays"
        @click="playListShow"
      >
        <span
          class="iconfont icon-liebiao"
        />
        <p class="length">
          {{ playList.length }}
        </p>
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
            class="item"
          >
            暂无播放歌曲
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {

  name: 'Schedule',
  data() {
    return {
      store: window.store,
      playsbox: false,
      currentTime: '',
      playTime: '',
      downX: null,
      wacthWidth: null,
      volumeShow: false,
      evend: null,
    }
  },
  computed: {
    ...mapState([
      'songInfo',
      'playList',
    ]),
  },
  mounted() {
    this.wacthNull()
    document.addEventListener('mousemove', (e) => {
      this.VOmove(e)
    })
    document.addEventListener('mouseup', () => {
      this.VOup()
    })
  },
  methods: {
    ...mapMutations([
      'setSongInfo',
      'asPlayList',
      'asSongInfo',
    ]),
    // ...mapActions([
    //   'songInfo',
    // ]),
    wacthNull() {
      this.$refs.wacthNull.style.width = `${252 - 20}px`
    },
    volume() {
      this.$refs.wacth.style.width = `${this.store.audio.volume * 100}%`
      this.volumeShow = !this.volumeShow
      this.$nextTick(() => {
        this.wacthWidth = this.$refs.wacth.offsetWidth
      })
    },
    schema() {
      if (this.store.audioData.schema === 1) {
        this.store.audioData.schema += 1
        window.playMode('单曲循环')
      } else if (this.store.audioData.schema === 2) {
        this.store.audioData.schema += 1
        window.playMode('随机播放')
      } else if (this.store.audioData.schema === 3) {
        this.store.audioData.schema += 1
        window.playMode('顺序播放')
      } else if (this.store.audioData.schema === 4) {
        this.store.audioData.schema = 1
        window.playMode('列表循环')
      }
    },
    // // 操作音量
    down(e) {
      // 点击了才可以移动圈圈
      this.store.audioData.volumeMove = true
      // 点击位置
      this.downX = e.clientX - this.$refs.wacthNull.getBoundingClientRect().left
      // 如果点击的是圈圈,就不改变位置
      if (e.target === this.$refs.dian) return
      // 边界判断
      if (this.downX > this.$refs.wacthNull.offsetWidth) {
        this.$refs.wacth.style.width = `${100}%`
      } else if (this.downX < this.$refs.dian.offsetWidth / 2) {
        this.$refs.wacth.style.width = 0
      } else {
        // 点到那,音量大小的滑块就到哪
        this.$refs.wacth.style.width = `${(this.downX - this.$refs.dian.offsetWidth / 2) / (this.$refs.wacthNull.offsetWidth) * 100}%`
      }
      // audio的音量大小
      this.store.audio.volume = parseInt(this.$refs.wacth.style.width, 10) / 100
      localStorage.volume = this.store.audio.volume
      console.log(`滑块:${this.$refs.wacth.style.width},音量${this.store.audio.volume}`)
      this.wacthWidth = this.$refs.wacth.offsetWidth
    },
    VOmove(e) {
      // 没点击圈圈就不能移动
      if (!this.store.audioData.volumeMove) return
      // 移动的当前位置
      const moveX = e.clientX - this.$refs.wacthNull.getBoundingClientRect().left
      // 20是圈圈的宽度

      let sum = (this.wacthWidth + (moveX - this.downX)) / (this.$refs.wacthNull.offsetWidth)
      console.log(sum)
      // 边界判断
      if (sum >= 1) {
        sum = 1
      } else if (sum <= 0) {
        sum = 0
      }

      // 给滑动条和audio设置声音大小
      this.$refs.wacth.style.width = `${sum * 100}%`
      // audio的音量(0~1)
      this.store.audio.volume = sum
      localStorage.volume = this.store.audio.volume
      console.log(`滑块:${this.$refs.wacth.style.width},音量${this.store.audio.volume}`)
    },
    VOup() {
      // 松开鼠标,圈圈就不能移动
      this.store.audioData.volumeMove = false
      // 音量大小滑动的宽度
      this.wacthWidth = this.$refs.wacth.offsetWidth
    },
    // 切换播放列表
    playListShow() {
      this.playsbox = !this.playsbox
    },
    // 关闭播放列表
    shut() {
      this.playsbox = false
    },
    clicksong(item) {
      this.currentTime = item
    },
    dblsong(item) {
      if (!this.songInfo) return
      this.playTime = item
      window.actions.play(item)
      this.$store.dispatch('songInfo', item)
    },
    // 清除缓存
    clearSorage() {
      console.log(this.playList)
      if (!window.confirm('确定要清空播放列表')) return
      this.store.audio.pause()
      this.store.audio.src = ''
      this.store.audioData.tabplay = true
      this.asPlayList(false)
      this.asSongInfo(false)
    },
    deleteStorage(item, i) {
      if (item.id === this.songInfo.id) {
        console.log(this.store.audioData.schema)
        if (this.playList.length > 1) {
          if (this.store.audioData.schema === 1) window.actions.switchMusic('manual', 'next')
          // window.actions.play(this.playList[0])
          // this.$store.dispatch('songInfo', this.playList[0])
        } else {
          this.asPlayList([])
          this.asSongInfo(null)
          this.store.audio.src = ''
          this.store.audioData.tabplay = true
        }
      }
      window.actions.playsDelete('plays', i)
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
    .caozuo {
          width: 270px;
          display: flex;
          justify-content: space-around;
          padding: 0 10px;
          line-height: 60px;
          & > div {
              flex: 1;
              display: flex;
              justify-content: center;
          }
          > .volume {
            position: relative;
            width: 100%;
            text-align: center;
            .volume-box {
              background: #fff;
              position: absolute;
              bottom: 80px;
              left: -180px;
              border:1px solid #000;
              width: 300px;
              padding:0 10px;
              height: 40px;
              display: flex;
              align-items: center;
              &::before {
                content: "";
                width: 0;
                height: 0;
                border-width: 20px 15px 0 15px;
                border-style: dashed;
                border-color: #cdcdce transparent transparent transparent;
                position: absolute;
                bottom:-20px;
                right: 80px;
              }
              &::after {
                content: "";
                width: 0;
                height: 0;
                border-width: 20px 15px 0 15px;
                border-style: dashed;
                border-color: #fff transparent transparent transparent;
                position: absolute;
                bottom:-19px;
                right: 80px;
              }
              .dianji {
                flex: 1;
                padding: 10px 0;
                margin-left: 10px;
                .width {
                  background:#e5e5e5;
                  height: 2px;
                  width: 252px;
                  .wacthNull {
                    height: 100%;
                    .wacth {
                      width: 100%;
                      height: 100%;
                      background: #bc2f2d;
                      position: relative;
                      .dian {
                          width: 20px;
                          height: 20px;
                          border:1px solid #cccccc;
                          border-radius: 50%;
                          position: absolute;
                          top: -9px;
                          right: 0;
                          background: #fff;
                          transform: translateX(100%);
                          &::before {
                            content:'';
                            position: absolute;
                            top: 50%;
                            left:50%;
                            transform: translate(-50%,-50%);
                            width: 5px;
                            height:5px;
                            border-radius: 50%;
                            background:#bc2f2d;
                          }
                      }
                    }
                  }
                }
              }
            }
          }
          > .playList {
              .control-plays {
                  width: 100%;
                  height: 100%;
                  display:flex;
                  justify-content: center;
                   &::before {
                      position: absolute;
                      top: 50%;
                      right: 17px;
                      transform: translate(0,-50%);
                      content: '';
                      padding: 10px;
                      border-radius: 40%;
                      background:#bbbcc1;
                    }
                  .length {
                    cursor: default;
                    margin-left: 10px;
                    border-radius: 40%;
                    color: #fff;
                    position: relative;

                  }
              }
             > .playList-box {
                 position: fixed;
                 right: 0;
                 bottom: 70px;
                 width: 500px;
                 height: 550px;
                 border: 1px solid #e5e5e5;
                 background: #fff;
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
                    height: 500px;
                    overflow-x: auto;
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
                        .icon-bofang1,
                        .icon-yuanquananniu,
                        .icon-gengduosandian,
                        .icon-yuanquan-cha {
                            display: none
                        }
                        &:nth-child(odd) {
                            background: #f9f9f9;
                        }
                        &:hover {
                            background: #f2f2f3;
                        }
                        .icon {
                            visibility: hidden;
                            width: 8%;
                            text-align: center;
                        }
                        &.click {
                            background: #dedee0;
                             animation: textshake 0.5s;
                            .icon-bofang1,
                            .icon-yuanquananniu,
                            .icon-gengduosandian,
                            .icon-yuanquan-cha {
                                display: block;
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
                        }
                        .name {
                            width:47%;
                            font-size: 16px;
                            display: flex;
                            .grow {
                                .omit-sandian;
                                margin-right: 10px;
                                flex-grow: 1;
                            }
                            .iconfont {
                                margin-right: 10px;
                                font-size: 20px;
                            }
                        }
                        .singer {
                            width: 25%;
                            color: #999999;
                            font-size: 14px;
                        }
                        .time {
                            width: 8%;
                        }
                        .clear {
                            width: 12%;
                            text-align: center;
                            .iconfont {
                                font-size: 20px;
                            }

                        }
                    }
                }
              }
          }
    }
</style>
