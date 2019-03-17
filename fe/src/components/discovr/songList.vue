<template>
  <div class="songlist">
    <div
      v-if="hotTagData.length > 0"
      class="hot"
    >
      <div class="total">
        <button
          class="totalShow"
          @click="totalShow"
        >
          {{ cat }}
          <span class="iconfont icon-arrow-down" />
        </button>

        <div
          v-show="catlistShow"
          class="catlistShow"
        >
          <div
            v-if="catlistData"
            class="catlist"
          >
            <div class="total-top">
              <div
                class="all"
                :class="{active:catlistData.all.name === cat}"
                @click="(cat = catlistData.all.name,catlistShow = false)"
              >
                {{ catlistData.all.name }}
              </div>
            </div>
            <div class="total-bottom">
              <div
                v-for="(its,index) of catlistData.categories"
                :key="index"
                class="flex-itme"
              >
                <div class="categories">
                  {{ its }}
                </div>
                <div class="sub">
                  <div
                    v-for="(it,index) of subCategory[index]"
                    :key="index"
                    class="sub-it"
                    :class="{active:it.name === cat}"
                    @click="(cat = it.name,catlistShow = false)"
                  >
                    {{ it.name }}
                    <span
                      v-if="it.hot"
                      class="iconfont icon-HOT"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!catlistData">
            <img
              :src="require('@/assets/images/load.gif')"
              alt="加载中"
            >
          </div>
        </div>
      </div>
      <div
        v-for="it of hotTagData"
        :key="it.id"
        class="hot-tag"
        :class="{active:cat === it.name}"
        @click="cat = it.name"
      >
        {{ it.name }}
      </div>
    </div>
    <div
      v-if="hotListData.length === 0"
      class="loading"
    >
      <img
        :src="require('@/assets/images/load.gif')"
        alt="加载中"
      >
    </div>
    <div
      v-else
      class="hot-play-list"
    >
      <div
        v-for="it of hotListData"
        :key="it.id"
        class="item"
        @click="$router.push({name:'SongListDetails', query: {id:it.id}})"
      >
        <img
          :src="it.coverImgUrl"
          alt
        >
        <p class="name omit-text">
          {{ it.name }}
        </p>
        <p class="nickname omit-text">
          by&nbsp;{{ it.creator.nickname }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Recommend',
  data() {
    return {
      hotTagData: [],
      hotListData: [],
      cat: '全部歌单',
      catlistShow: false,
      catlistData: '',
      subCategory: [],
    }
  },
  watch: {
    cat() {
      this.getHotList()
    },
  },
  created() {
    this.getHotTag()
    this.getHotList()
  },
  methods: {
    async getHotTag() {
      const res = await this.$http.get('/playlist/hot')
      this.hotTagData = res.data.tags
    },
    async getHotList() {
      this.hotListData = []
      this.catlistShow = false
      let res = {}
      if (this.cat === '全部歌单' || !this.cat) {
        res = await this.$http.get(
          '/top/playlist?limit=50&order=hot',
        )
      } else {
        res = await this.$http.get(
          `/top/playlist?limit=50&order=hot&cat=${this.cat}`,
        )
      }

      this.hotListData = res.data.playlists
    },
    async totalShow() {
      this.subCategory = []
      this.catlistShow = !this.catlistShow
      const res = await this.$http.get('/playlist/catlist')
      if (res.data.code !== 200) return
      this.catlistData = res.data
      res.data.sub.forEach((v) => {
        if (!this.subCategory[v.category]) {
          this.subCategory[v.category] = []
        }
        this.subCategory[v.category].push(v)
      })
    },
  },
}
</script>

<style lang="less" scoped>
.songlist {
  .hot {
    display: flex;
    margin: 30px 0;
    .total {
      position: relative;
      .totalShow {
        padding: 0 10px;

        background: #fff;
        border: 1px solid #e8e8ea;
        box-shadow: 0 0 1px #e8e8ea;
      }
      .catlistShow {
        position: absolute;
        top: 30px;
        left: 10px;
        height: 400px;
        overflow: auto;
        width: 600px;
        background: #fff;
        border: 1px solid #cecfd4;
      }
      .catlist {
        color: #666666;
        .total-top {
          padding: 30px 0 30px 20px;
          border-bottom: 1px solid #666;
          .all {
            line-height: 30px;
            height: 30px;
            width: 200px;
            text-align: center;
            border: 1px solid #dcdcdf;
            &.active {
              border: 1px solid #bc2f2e;
              background: #bc2f2e;
               color:#fff;
            }
          }
        }
        .total-bottom {
          margin-top:20px;
          .flex-itme {
          display: flex;
          margin-bottom: 20px;
          .categories {
            color: #dd6760;
            width: 70px;
            text-align: center;
          }
          .sub {
            flex: 1;
            display: flex;
            flex-wrap: wrap;
            font-size: 12px;

            .sub-it {
              margin-bottom: 5px;
              margin-right: 10px;
              width: 70px;
              line-height: 30px;
              height: 30px;
              border: 1px solid #dcdcdf;
              text-align: center;
              position: relative;
              &.active {
                border: 1px solid #bc2f2e;
                background: #bc2f2e;
                color:#fff;
              }
              &:not(.active):hover {
                background: #f2f2f3;
              }
              span {
                position: absolute;
                top: -7px;
                right: -10px;
                color: #dd6760;
              }
            }
          }
        }
        }

      }
    }
    .hot-tag {
      padding: 0 20px;
      color: #666;
      border-right: 1px solid #e1e1e2;
      font-size: 14px;
      height: 18px;
      &:not(.active):hover {
        color: #000;
      }
      &:last-child {
        border-right: 0;
      }
    }
  }
  .hot-play-list {
    display: flex;
    flex-wrap: wrap;
    .item {
      margin-right: 20px;
      width: 150px;
      margin-bottom: 30px;
      &:hover {
        opacity: 0.8;
      }
      &:nth-child(6n) {
        margin-right: 0;
      }
      img {
        width: 100%;
        height: 150px;
      }
      .name {
        font-size: 15px;
        line-height: 30px;
      }
    }
  }
}
</style>
