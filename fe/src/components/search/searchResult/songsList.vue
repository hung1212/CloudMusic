<template>
  <div
    v-if="result"
    class="playlists"
  >
    <div
      v-for="item of result"
      :key="item.id"
      class="item"
    >
      <div class="left">
        <img
          class="item-img"
          :src="item.coverImgUrl"
          alt=""
        >
        <p class="name">
          {{ item.name }}
        </p>
      </div>
      <div class="right">
        <p class="track-count">
          <span>{{ item.trackCount }}</span>首
        </p>
        <p class="nickname">
          by <span>{{ item.creator.nickname }}</span>
        </p>
        <p class="play-count">
          播放:<span>{{ item.playCount | ten }}</span>
        </p>
      </div>
    </div>
  </div>
  <div
    v-else
    class="empty"
  >
    <p>暂无搜索结果</p>
  </div>
</template>

<script>
export default {
  name: 'SongsList',
  filters: {
    ten(value) {
      if (value < 10000) return value
      return `${Math.floor(value / 10000)}万`
    },
  },
  props: {
    result: Array,
  },
}
</script>

<style lang="less" scoped>
    .playlists {
        .item {
            padding: 10px;
            display: flex;
            align-items: center;
            &:nth-child(odd) {
                background: #f2f2f3;
            }
            &:hover {
                background: #f2f2f3;
            }
            .left {
                display:flex;
                width: 55%;
                align-items: center;
                .item-img {
                width: 50px;
                height: 50px;
                margin-right: 10px;
                }
            }
            .right {
                display: flex;
                width: 45%;
                color: #b4b4b5;
                .track-count,
                .nickname,
                .play-count {
                    width: 33.33%;
                }
                p {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    padding-right: 20px;
                }
            }

        }
    }
</style>
