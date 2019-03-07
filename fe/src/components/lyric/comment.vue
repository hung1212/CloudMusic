<template>
  <div
    class="comment-box"
  >
    <div class="comment">
      <div class="title">
        评论 <span>({{ commentData.total }})</span>
      </div>
      <div class="content">
        <span class="iconfont icon-huabi" />
        <p>发表评论</p>
        <span class="iconfont icon-tiezi" />
        <span class="iconfont icon-youxiang" />
      </div>
    </div>
    <div
      v-if="loading"

      class="loading"
    >
      <img
        src="http://files.57gif.com/webgif/0/e/14/b6578a8f6e0aa313dd26b750e8dc0.gif"
        alt="加载中"
      >
    </div>
    <div v-else>
      <div
        v-if="page === 1"
        class="hotComments"
      >
        <div class="title">
          精彩评论
        </div>
        <div class="content">
          <div
            v-for="(item) of hotCommentsData"
            :key="item.commentId"
            class="a"
          >
            <div class="left">
              <img
                v-if="item.user"
                :src="item.user.avatarUrl"
                alt=""
              >
            </div>
            <div class="right">
              <div class="pl">
                <p><span>{{ item.user.nickname }}</span>: {{ item.content }}</p>
              </div>
              <div class="view">
                <div class="time">
                  {{ item.time | time }}
                </div>
                <div class="view-righ">
                  <p class="good">
                    <span class="iconfont icon-zan-copy" />
                    ({{ item.likedCount }})
                  </p>
                  <p class="bar" />
                  <a class="share">
                    分享
                  </a>
                  <p class="bar" />
                  <a class="reply">
                    回复
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="comments">
        <div class="title">
          最新评论
        </div>

        <div class="content">
          <div
            v-for="(item) of commentData.comments"
            :key="item.commentId"
            class="a"
          >
            <div class="left">
              <img
                v-if="item.user"
                :src="item.user.avatarUrl"
                alt=""
              >
            </div>
            <div
              v-if="item.beReplied.length === 0"
              class="right"
            >
              <div class="pl">
                <p><span>{{ item.user.nickname }}</span>: {{ item.content }}</p>
              </div>
              <div class="view">
                <div class="time">
                  {{ item.time | time }}
                </div>
                <div class="view-righ">
                  <p class="good">
                    <span class="iconfont icon-zan-copy" />
                    ({{ item.likedCount }})
                  </p>
                  <p class="bar" />
                  <a class="share">
                    分享
                  </a>
                  <p class="bar" />
                  <a class="reply">
                    回复
                  </a>
                </div>
              </div>
            </div>
            <div
              v-else
              class="right-else"
            >
              <div class="cur-pl">
                <span>{{ item.beReplied[0].user.nickname }}</span>: 回复
                <span>@{{ item.user.nickname }}</span>:
                {{ item.beReplied[0].content }}
              </div>
              <div class="pl">
                <p><span>@{{ item.user.nickname }}</span>: {{ item.content }}</p>
              </div>
              <div class="view">
                <div class="time">
                  {{ item.time | time }}
                </div>
                <div class="view-righ">
                  <p class="good">
                    <span class="iconfont icon-zan-copy" />
                    ({{ item.likedCount }})
                  </p>
                  <p class="bar" />
                  <a class="share">
                    分享
                  </a>
                  <p class="bar" />
                  <a class="reply">
                    回复
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="total-page">
        <button @click="tabPage(1)">
          首页
        </button>
        <button @click="tabPage(page-1)">
          上一页
        </button>
        <button
          v-for="index of totalPage"
          v-if="index>=viewPage.start&&index<=viewPage.end"
          :key="index"
          :class="{current:index === page}"
          @click="tabPage(index)"
        >
          {{ index }}
        </button>
        <button @click="tabPage(page+1,$event)">
          下一页
        </button>
        <button @click="tabPage(totalPage)">
          末页
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  filters: {
    time(value) {
      const time = new Date(value)
      const y = time.getFullYear()
      const m = time.getMonth() + 1
      const d = time.getDate()
      return `${y}-${m}-${d}`
    },
  },
  data() {
    return {
      store: window.store,
      hotCommentsData: '',
      commentData: '',
      page: 1,
      limit: 10,
      totalPage: '',
      loading: false,
    }
  },
  computed: {
    viewPage() {
      let start = 0
      let end = 0
      start = this.page - 3
      end = this.page + 3
      if (start < 1) end += 1 - start
      if (end > this.totalPage) start -= end - this.totalPage
      return {
        start,
        end,
      }
    },
  },
  watch: {
    'store.songInfo': function () {
      this.hotComment()
      this.comments(this.page)
    },
  },
  mounted() {
    this.hotComment()
    this.comments(this.page)
  },
  methods: {

    hotComment() {
      $.get('/comment/music', { id: this.store.songInfo.id }, (res) => {
        this.hotCommentsData = res.hotComments
        if (this.hotCommentsData.length > 9) this.hotCommentsData.length = 10
      })
    },
    comments(page) {
      $.get('/comment/music', { id: this.store.songInfo.id, limit: this.limit, offset: (page - 1) * this.limit }, (res) => {
        this.commentData = res
        this.totalPage = Math.ceil(res.total / this.limit)
        this.loading = false
      })
    },
    tabPage(index) {
      if (index < 1 || index > this.totalPage) return
      this.loading = true
      this.page = index
      window.scrollTo(0, 400)
      this.comments(this.page)
    },
  },
}
</script>

<style lang="less" scoped>
    .border-b {
        border-bottom: 1px solid #c0bfc1;
        font-size: 16px;
        padding: 10px 0;
    }
    .comment-right {
        margin-left: 20px;
        flex: 1;
        padding-right: 20px;
        .pl {
            line-height: 26px;;
            font-size: 12px;
            span {
                color: #477aac;
                padding: 3px;
                cursor:pointer;
                &:hover {
                    background: #dedcdd;
                }
            }
        }
        .view {
            color: #929292;
            display: flex;
            justify-content:space-between;
            font-size: 12px;
            .view-righ {
                display: flex;
                .bar {
                    width: 1px;
                    background: #bdbcbe;
                    margin: 0 10px;
                    a {
                        background: #929292;
                    }
                }
            }
        }
    }
    .comment-box {
        flex: 1;
        .comment {
            .title {
                .border-b;
                font-weight: 700;
            }
            .content {
                display: flex;
                margin: 20px 0;
                line-height: 40px;
                border: 2px solid #aeaeb1;
                width: 100%;
                background: #e9e9e8;
                p {
                    flex: 1;
                    padding-left: 5px;
                }
                span {
                    margin-left: 10px;
                    &.icon-youxiang {
                        margin-right: 10px;
                    }
                }
            }
        }
        .hotComments ,
        .comments {
            font-size: 14px;
            margin-top: 20px;
            .title {
                .border-b;
                font-weight: 700;
                font-size: 16px;
            }
            .content {
                .a {
                    display: flex;
                    .border-b;
                    .left {
                        img {
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                        }
                    }
                    .right {
                     .comment-right
                    }
                    .right-else {
                        .comment-right;
                           .cur-pl {
                             font-size: 12px;
                            span {
                                color: #477aac;
                                cursor: pointer;;
                                &:hover {
                                    background: #dedcdd;
                                }
                            }
                        }
                        .pl {
                            margin: 10px 0;
                            padding: 10px;
                            background: #d2d0d1;
                        }
                    }

                }
            }
        }
        .total-page {
            margin:20px 0 100px 0;
            display: flex;
            justify-content: center;
            button {
                padding:5px 7px;
                margin: 0 1px;
            }
            .current {
                background: #fff;
            }
        }
    }
</style>
