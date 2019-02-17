<template>
  <div
    id="privatecontent"
    class="margin-bottom30"
  >
    <div class="discovr-title">
      <div class="left">
        <span class="iconfont icon-yinle1" />
        独家发送
      </div>
      <div class="right">
        更多
        <span class="iconfont icon-arrow-right" />
      </div>
    </div>
    <div class="content">
      <div
        v-for="item of result"
        :key="item.id"
        class="item"
      >
        <div class="img">
          <img
            :src="item.picUrl"
            alt=""
          >
        </div>
        <div class="name">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Privatecontent',
  data() {
    return {
      result: [],
    }
  },
  mounted() {
    $.get('/personalized/privatecontent', (res) => {
      if (res.code === 200) this.result = res.result
    })
  },
}
</script>

<style lang="less" scoped>
  #privatecontent {
    .title {
      font-size: 16px;
      border-bottom: 1px solid #e4e4e7;
      padding-bottom: 10px;
    }
    .content {
      margin-top: 10px;
      display: flex;
      .item {
        flex: 1;
        &:hover {
          opacity: 0.7;
        }
        &:nth-of-type(n+2) {
          margin-left: 20px;
          height: 200px;
        }
        img {
          width: 100%;
          height: 200px;
        }
        .name {
          color: #000;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 16px;
          padding: 10px 0;
        }
      }
    }
  }
</style>
