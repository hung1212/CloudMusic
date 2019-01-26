<template>
  <div
    v-if="result"
    class="user"
  >
    <div
      v-for="item of result"
      :key="item.id"
      class="item"
    >
      <div class="left">
        <img
          :src="item.avatarUrl"
          alt
        >
        <p class="name">
          {{ item.nickname }}
        </p>
        <p
          v-if="item.gender == 1"
          class="gender"
        >
          ♂
        </p>
        <p
          v-else
          class="gender"
        >
          ♀
        </p>
      </div>
      <div :class="{right: item.signature}">
        <p>{{ item.signature }}</p>
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
  name: 'SongsUser',
  props: {
    result: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>

<style lang="less" scoped>
.user {
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:nth-child(odd) {
      background-color: #f2f2f3;
    }
    padding: 10px;
    .left {
      display: flex;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .gender {
        color: #4491dd;
        margin-left: 3px;
      }
    }
    .right {
      border: 1px solid #cdcdce;
      border-radius: 5px;
      padding: 10px;
      color: #cdcdce;
      position: relative;
      background: #fff;
      max-width: 500px;
      p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
          &:before {
          content: "";
          width: 0;
          height: 0;
          border-width: 5px 10px 5px 0;
          border-style: dashed;
          border-color: transparent #cdcdce transparent transparent ;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: -10px;
        }
        &:after {
          content: "";
          width: 0;
          height: 0;
          border-width: 5px 10px 5px 0;
          border-style: dashed;
          border-color: transparent #fff transparent transparent ;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: -9px;
        }
    }
  }
}
</style>
