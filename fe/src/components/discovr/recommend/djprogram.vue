<template>
  <div
    id="djprogram"
    class="margin-bottom30"
  >
    <div class="discovr-title">
      <div class="left">
        <span class="iconfont icon-guangbodiantai" />
        主播电台
      </div>
      <div class="right">
        更多
        <span class="iconfont icon-arrow-right" />
      </div>
    </div>
    <div class="content">
      <div
        v-for="item of djprogram"
        :key="item.id"
        class="item"
      >
        <div class="img">
          <img
            :src="item.picUrl"
            alt=""
          >
          <div class="yuan">
            <span class="iconfont icon-tubiaoku-" />
          </div>
        </div>

        <div class="text">
          <div class="name">
            {{ item.name }}
          </div>
          <div class="nickname">
            {{ item.program.radio.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Djprogram',
  data() {
    return {
      djprogram: [],
    }
  },
  mounted() {
    $.get('/personalized/djprogram', (res) => {
      if (res.code !== 200) return
      this.djprogram = res.result
    })
  },
}
</script>

<style lang="less" scoped>
    #djprogram {
      .content {
        display: flex;
        flex-wrap: wrap;
        .item {
          width: 50%;
          display: flex;
          align-items: center;
          height: 140px;
          border-bottom: 1px solid #e8e8eb;
          &:hover {
            opacity: 0.8;
          }
          .img {
            width: 100px;
            height: 100px;
            position: relative;
            .yuan {
              position: absolute;
              bottom: 10px;
              right: 10px;
              background: rgba(0, 0, 0, 0.5);
              width: 20px;
              height: 20px;
              border-radius:50%;
              display: flex;
              justify-content: center;
              align-items: center;
              .iconfont {
                font-size: 12px;
                color:#fff;
              }
            }
            img {
              widows: 100%;
              height: 100%;
            }
          }
          .text {
            height: 100px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            margin-left: 10px;
            .name {
              font-size: 16px;
            }
            .nickname {
              color: #acacac;
            }
          }
        }
      }
    }
</style>
