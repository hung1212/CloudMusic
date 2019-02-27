<template>
  <div class="rank-list">
    <p>现在可以根据个人喜好,自由调整首页栏目顺序啦~</p>
    <div class="rank">
      调整栏目顺序
    </div>
    <div
      ref="orderBox"
      class="order-box"
    >
      <div class="title">
        <div class="left">
          调整栏目顺序
        </div>
        <div
          class="right"
          @click="slose"
        >
          <span class="iconfont icon-guanbi-copy" />
        </div>
      </div>
      <div class="content">
        <p class="hint">
          <span class="iconfont icon-tishi" />
          想调整首页栏目的顺序?按往右边的按钮拖动即可
        </p>
        <div class="order-list">
          <div
            v-for="(item,index) of rankList"
            :key="index"
            class="item"
          >
            <p>{{ item }}</p>
            <span class="iconfont icon--liebiao" />
          </div>
        </div>
        <div class="default">
          恢复默认排序
        </div>
        <div class="confirm">
          确定
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RankList',
  props: {
    ranklist: Array,
  },
}
</script>
<style lang="less" scoped>
.rank-list {
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .rank {
      color: #df3b3b;
      border: 1px solid #df3b3b;
      padding: 10px 20px;
      margin: 30px 0 50px 0;
      &:hover {
        background: #df3b3b;
        color: #fff;
      }
    }
    .order-box {
        display: none;
      box-shadow: 0 0 1px #000;
      border: 1px solid #000;
      width: 350px;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      color: #000;
      background: #fff;
      .title {
        font-size: 16px;
        line-height: 40px;
        padding-left: 20px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e8e8ea;
      }
      .content {
        .hint {
          color: #999999;
          margin: 10px 0;
        }
        .order-list {
          padding: 0 30px;
          .item {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #f4f4f5;
            line-height: 50px;
            font-size: 16px;
            .iconfont {
              color: #999999;
            }
          }
        }
        .default {
           line-height: 60px;
           color: #999999;
           border-bottom: 1px solid #f4f4f5;
        }
        .confirm {
          background: #bc2f2d;
          color: #fff;
          width: 100px;
          font-size: 16px;
          line-height: 30px;
          margin:  20px auto;
        }
      }
    }
  }
</style>
