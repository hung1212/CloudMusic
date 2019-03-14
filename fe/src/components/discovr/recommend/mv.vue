<template>
  <div
    id="mv"
    class="margin-bottom30"
  >
    <div class="discovr-title">
      <div class="left">
        <span class="iconfont icon-mv1" />
        推荐MV
      </div>
      <div class="right">
        更多
        <span class="iconfont icon-arrow-right" />
      </div>
    </div>
    <div class="content">
      <div
        v-for="item of mv"
        :key="item.id"
        class="item"
      >
        <div class="img">
          <img
            :src="item.picUrl"
            alt=""
          >
          <p class="w">
            <span class="iconfont icon-touyingyi" />
            {{ item.playCount | playCount }}
          </p>
        </div>
        <div class="name">
          {{ item.name }}
        </div>
        <div class="artist-name">
          {{ item.artistName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mv',
  data() {
    return {
      mv: null,
    }
  },
  mounted() {
    $.get('/personalized/mv', (res) => {
      if (!res.code === 200) return
      this.mv = res.result
      this.mv.length = 3
    })
  },
}
</script>

<style lang="less" scoped>
  #mv {
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
        .img {
          border: 1px solid #ccc;
          position: relative;

          img {
            width: 100%;
            height: 200px;
          }
          .w {
            position: absolute;
            top: 0;
            right: 0px;
            padding:0 10px;
            background: rgba(0, 0, 0, .3);
            color: #fff;
          }
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
