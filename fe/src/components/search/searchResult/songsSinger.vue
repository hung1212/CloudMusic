<template>
  <div
    v-if="result"
    class="songs-singer"
  >
    <div
      v-for="item of result"
      :key="item.id"
      class="singer-item"
    >
      <img
        :src="item.img1v1Url"
        alt=""
        class="singer-img"
      >
      <p class="singer-name">
        {{ item.name }} <span v-if="item.alia">
          ( {{ item.alia[0] }} )
        </span>
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
  name: 'SongsSinger',
  props: {
    result: Array,
  },
}
</script>

<style lang="less" scoped>
    .songs-singer {
        .singer-item {
            padding: 10px;
            display: flex;
            align-items: center;
            &:hover {
                background: #f2f2f3;
            }
            &:nth-child(odd) {
                background: #f2f2f3;
            }
            .singer-img {
                width: 50px;
                height: 50px;
                margin-right: 10px;
            }
            .singer-name {
                span {
                    color:#999999;
                }
            }
        }
    }
</style>
