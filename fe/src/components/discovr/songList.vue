<template>
  <div class="songlist">
    <div class="hot">
      <div class="total">
        全部歌单
        <span class="iconfont icon-arrow-down" />
      </div>
      <div
        v-for="it of hotTagData"
        :key="it.id"
        class="hot-tag"
        :class="{active:cat === it.name}"
        @click="getHotList(it.name)"
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
          alt=""
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
      cat: '',
    }
  },
  created() {
    this.getHotTag()
    this.getHotList('华语')
  },
  methods: {
    async getHotTag() {
      const res = await this.$http.get('/playlist/hot')
      this.hotTagData = res.data.tags
    },
    async getHotList(cat) {
      this.hotListData = []
      this.cat = cat
      const res = await this.$http.get(`top/playlist?limit=50&order=hot&cat=${cat}`)
      this.hotListData = res.data.playlists
    },
  },
}
</script>

<style lang="less" scoped>
  .songlist {
    .hot {
      display: flex;
      margin: 30px 0 ;
      .total {
        padding:  2px 10px;
        background:#fff;
        border: 1px solid #e8e8ea;
        box-shadow: 0 0 1px #e8e8ea;
      }
      .hot-tag {
        padding: 0 20px;
        color:#666;
        border-right:1px solid #e1e1e2;
        font-size: 14px;
        height: 18px;
        &:not(.active):hover {
          color: #000;
        }
        &:last-child {
          border-right:0;
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
          opacity: 0.8
        }
        &:nth-child(6n){
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
