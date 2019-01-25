<template>
  <div
    v-if="result"
    class="mvs"
  >
    <div
      v-for="item of result"
      :key="item.id"
      class="item"
    >
      <div class="item-show">
        <img
          class="item-img"
          :src="item.cover"
          alt=""
        >
        <p class="play-count">
          {{ item.playCount | ten }}
        </p>
        <!-- <p class="duration"> {{ item.duration | comTime}}</p> -->
      </div>
      <p class="name">
        {{ item.name }}
      </p>
      <p class="artistName">
        {{ item.artistName }}
      </p>
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
  name: 'SongsMV',
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
    .mvs {
        display: flex;
        flex-wrap: wrap;
        .item {
              &:not(:nth-child(4n)) {
                  margin-right: 8px;
              }
              &:hover {
                  transition: opacity  .3s;
                  opacity: 0.8;
              }
              width: 194px;
              margin-bottom: 20px;
            .item-show {
                position: relative;
                .item-img {
                    width: 100%;
                    height: 100px;
                }
                .play-count {
                    position: absolute;
                    right: 0;
                    top: 0;
                    padding: 0 5px;
                    background-color: rgba(0, 0, 0, .3);
                    color: #fff;
                }
            }
            .name {
                    font-size:14px;
                    padding: 5px 0;
                }
            .artistName {
                color:#999999;
            }
        }
    }
</style>
