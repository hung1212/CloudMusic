<template>
  <div
    v-if="store.storage.playList.length > 0 && store.songInfo"
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
          class="iconfont icon-liebiao"
        />
        <p class="length">
          {{ store.storage.playList.length }}
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
            v-for="(item,index) of store.storage.playList"
            :key="item.id"
            class="item"
            :class="{active:store.songInfo.id === item.id , click:currentTime === item}"
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
              {{ item.artists[0].name }}
            </div>
            <div class="time">
              {{ item.duration | totalTime }}
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
          class="iconfont icon-liebiao"
        />
        <p class="length">
          {{ store.storage.playList.length }}
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
export default {
  name: 'Schedule',
  filters: {
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
      playsbox: false,
      currentTime: '',
      playTime: '',
    }
  },
  methods: {
    schema() {
      if (this.store.audioData.schema === 1) {
        this.store.audioData.schema += 1
        window.alert('单曲循环')
      } else if (this.store.audioData.schema === 2) {
        this.store.audioData.schema += 1
        window.alert('随机循环')
      } else if (this.store.audioData.schema === 3) {
        this.store.audioData.schema += 1
        window.alert('顺序播放')
      } else if (this.store.audioData.schema === 4) {
        this.store.audioData.schema = 1
        window.alert('列表循环')
      }
    },
    // 切换播放列表
    playList() {
      this.playsbox = !this.playsbox
    },
    // 清除缓存
    clearSorage() {
      if (!window.confirm('确定要清空播放列表')) return
      localStorage.removeItem('playList')
      this.store.audio.pause()
      this.store.storage.playList = []
      this.store.songInfo = null
      this.store.audio.src = ''
      this.store.audioData.tabplay = true
    },
    // 关闭播放列表
    shut() {
      this.playsbox = false
    },
    clicksong(item) {
      this.currentTime = item
    },
    dblsong(item) {
      if (!this.store.songInfo) return
      this.playTime = item
      window.actions.play(item)
      window.actions.songInfo(item)
    },
    deleteStorage(item, i) {
      window.actions.playsDelete('plays', i)
      if (item.id === this.store.songInfo.id) {
        if (this.store.audioData.schema === 1) window.actions.next()
        if (this.store.storage.playList.length > 0) {
          window.actions.play(this.store.storage.playList[0])
          window.actions.songInfo(this.store.storage.playList[0])
        } else {
          this.store.storage.playList = []
          this.store.songInfo = null
          this.store.audio.src = ''
          this.store.audioData.tabplay = true
        }
      }
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
