<template>
  <div class="play-list">
    <div class="title">
      <div class="left">
        <p
          class="play-all"
          @click="playTotal"
        >
          <span class="iconfont icon-bofang1" />
          播放全部({{ playList.length }})
        </p>
        <span class="x" />
        <!-- <p><span class="iconfont icon-icon" /> 选择</p> -->
      </div>
      <div class="search">
        <input
          id=""
          type="text"
          placeholder="搜索歌单歌曲"
          name=""
        >
        <span class="iconfont icon-02" />
      </div>
    </div>
    <div class="content">
      <ul>
        <li
          v-for="(item,index) of playList"
          :key="item.id"
          :class="{active:currentItem === item , currentplay:currentplay === item}"
          @click="song(item,item.id)"
          @dblclick="dblsong(item,item.id )"
        >
          <span class="index">
            {{ index + 1 | itemIndex }}
          </span>
          <span class="like iconfont icon-xihuan" />
          <span
            v-if="songInfo && songInfo.id === item.id"
            class="iconfont icon-yinliang"
          />
          <p class="name">
            {{ item.name }}
            <span
              v-if="item.alia"
            >
              {{ item.alia[0] }}
            </span>
          </p>
          <span
            class="iconfont icon-bofang1"
            @click="dblsong(item,item.id )"
          />
          <span class="iconfont icon-gengduosandian" />
          <p class="nickname">
            {{ item.ar | artists }}
          </p>
          <p class="album">
            {{ item.al.name }}
          </p>
          <p class="time">
            {{ item.dt | songTime }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PlayList',
  filters: {
    itemIndex(i) {
      if (i > 9) return i
      return `0${String(i)}`
    },
  },
  props: {
    playList: {
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
  computed: {
    songInfo() {
      return this.$store.state.songInfo
    },
  },
  methods: {
    // 播放全部
    playTotal() {
      this.$store.state.playList = this.playList
      window.playMode('随机播放')
      const random = Math.floor(Math.random() * this.playList.length)
      this.$store.dispatch('songInfo', this.$store.state.playList[random])
      window.actions.play(this.$store.state.playList[random])
    },
    // 点击歌曲
    song(item) {
      this.currentItem = item
    },
    // 双击歌曲
    dblsong(item) {
      this.$store.state.playList = this.playList
      this.currentplay = item
      this.$store.dispatch('checkMusic', item).then(() => {
        window.actions.play(item)
      })
      this.$store.dispatch('songInfo', item)
    },
  },
}
</script>
<style lang="less" scoped>
    .play-list {
        .title {
            display: flex;
            justify-content: space-between;
            margin: 20px 0;
            .left {
                color: #000;
                display: flex;
                font-size: 16px;
                align-items: center;
                .play-all {
                    .icon-bofang1 {
                        color:#c32c2e;
                    }
                }
                .x {
                    height: 16px;
                    width: 1px;
                    background: #e5e5e9;
                    margin:0 20px;
                }
            }
            .search {
                 border: 1px solid #eaeaed;
                 border-radius:20px;
                 padding: 10px;
                 width: 250px;
                 display: flex;
                 justify-content: space-between;
                 color: #eaeaed;
            }

        }
        .content {
            >ul {
                >li {
                    display: flex;
                    padding: 15px;

                    &:nth-child(odd) {
                        background:#f4f4f6;
                    }
                    &:hover {
                        background:#f2f2f3;
                    }
                    .like {
                        margin: 0 10px;
                    }
                    .name {
                        flex: 1;
                    }
                    .nickname,
                    .album {
                        width: 200px;
                        color: #a2a2a2;
                    }
                    .time {
                        width: 100px;
                        color: #a2a2a2;
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

                }

            }

        }
    }
</style>
