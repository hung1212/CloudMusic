<template>
  <div
    v-if="result"
    class="dj"
  >
    <div
      v-for="item of result"
      :key="item.id"
      class="item"
    >
      <img
        :src="item.picUrl"
        alt=""
      >
      <p class="name">
        {{ item.name }}
      </p>
      <p class="nickname">
        by {{ item.dj.nickname }}
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
  name: 'DjRadios',
  props: {
    result: Array,
  },
}
</script>

<style lang="less" scoped>
    .dj {
        display:  flex;
        flex-wrap: wrap;
        .item {
            background: #f2f2f3;
            width: 100px;
            margin-right: 10px;
            margin-bottom: 10px;
            &:hover {
                transition: opacity .5s;
                opacity: .5;
            }
            img {
                width: 100%;
                height: 100px;
            }
            p {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin-top: 5px;
            }
        }
    }
    .empty {
        display: flex;
        justify-content: center;
        p {
            color: #999999;
            font-weight: 700;
        }
    }
</style>
