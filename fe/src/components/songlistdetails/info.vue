<template>
  <div
    v-if="info && info.creator"
    class="info-outer"
  >
    <div
      class="bg"
      :style="{backgroundImage:'url('+info.coverImgUrl+')'}"
    />
    <div class="info-box">
      <div class="gd">
        <p>歌单</p>
      </div>
      <div
        class="info"
      >
        <div class="left">
          <img
            :src="info.coverImgUrl"
          >
          <p><span class="iconfont icon-tinggeliang" />{{ info.playCount | playCount }}</p>
        </div>
        <div class="right">
          <h4>{{ info.name }}</h4>
          <div class="creator">
            <div class="creatorImg">
              <img :src="info.creator.avatarUrl">
            </div>
            <p class="creatorName">
              {{ info.creator.nickname }}
            </p>
            <p class="creatorTime">
              {{ info.createTime | createTime }}&nbsp;创建
            </p>
          </div>
          <div class="handle">
            <button>
              收藏({{ info.subscribedCount }})
            </button>
            <button>
              评论({{ info.commentCount }})
            </button>
            <button>
              分享({{ info.shareCount }})
            </button>
            <button>
              下载全部
            </button>
            <button>
              ...更多
            </button>
          </div>
          <div
            v-if="info.tags.length > 0"
            class="labels"
          >
            标签: <span
              v-for="(tags,index) of info.tags"
              :key="index"
              class="label"
            >
              <span class="label-name">
                {{ tags }}
              </span>
              <span v-if="(index+1) !== info.tags.length">
                /
              </span>
            </span>
          </div>
          <div
            v-else
            class="labels"
          >
            标签:暂无标签
          </div>
          <div
            v-if="info.description"
            class="intro"
            :class="{active:intro}"
          >
            <p
              v-for="(item,index) of info.description.split('\n')"
              :key="index"
            >
              <span v-if="index === 0">
                介绍:
              </span>
              {{ item }}
            </p>
            <span
              class="xiala iconfont icon-arrow-down"
              @click="intro = ! intro"
            />
          </div>
          <div
            v-else
            class="intro"
            :class="{active:intro}"
          >
            <p>
              介绍:暂无介绍
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Info',
  filters: {
    playCount(count) {
      if (count < 10000) return count
      return `${Math.floor(count / 10000)}万`
    },
    createTime(t) {
      function ten(v) {
        if (v > 9) return v
        return `0${String(v)}`
      }
      const y = new Date(t).getFullYear()
      const m = ten(new Date(t).getMonth())
      const d = ten(new Date(t).getDate())
      return `${y}-${m}-${d}`
    },
  },
  props: {
    info: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      intro: true,
    }
  },
}
</script>

<style lang="less" scoped>
    .info-outer {
       position:relative;
      .bg {
          height: 600px;
          width: 100%;
          position:absolute;
          top: 0;
          left: 0;
          background-size:100% 100px;
          background-repeat: no-repeat;
          background-position-y: 0;
          -webkit-filter: blur(100px);
          filter: blur(100px);
          pointer-events: none;
      }
      .info-box {
          position: relative;
          width: 100%;
        .gd {
            width: 100%;
          >p {
              padding-bottom: 20px ;
          }
         }
        .info {
            display: flex;
            width: 100%;
            .left {
                position: relative;
                >img {
                    width: 180px;
                    height:190px;
                }
                >p {
                    position:absolute;
                    top:0;
                    right: 0;
                    background: linear-gradient(to right,rgba(0,0,0,0.1),rgba(0,0,0,0.5));
                    color: #fff;
                    width: 100%;
                    text-align: right;
                    padding-right: 5px;
                    line-height: 20px;
                    > span {
                        font-size: 12px;
                        margin-right: 5px;
                    }
                }
            }
            .right {
                margin-left:20px;
                flex: 1;
                h4 {
                    font-size: 22px;
                }
                .creator {
                    display: flex;
                    align-items: center;
                    margin: 10px 0;
                    .creatorImg {
                        img {
                            widows: 30px;
                            height: 30px;
                            border-radius: 50%;
                        }
                    }
                    .creatorName {
                        padding: 0 10px;
                    }
                }
                .handle {
                    margin: 10px 0;
                    >button {
                        padding: 5px;
                        margin-right: 10px;
                        font-size: 12px;
                        background: #f4f5f7;
                    }
                }
                >.labels {
                    line-height: 24px;
                    .label {
                        .label-name {
                            color:#1a5a99;
                        }
                    }
                }
                >.intro {
                    position: relative;
                    &.active {
                        overflow: hidden;
                        height: 50px;
                    }
                    >p {
                        line-height: 24px;
                        color: #969696;
                        > span{
                            color: #000;
                        }
                    }
                    .xiala {
                        position: absolute;
                        right: 0;
                        bottom: 0;
                    }
                }
            }
        }
      }
    }
</style>
