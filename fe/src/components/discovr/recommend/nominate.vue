<template>
  <div id="nominate">
    <div class="FM">
      <div class="left">
        <span class="iconfont icon-FM" />
      </div>
      <div class="right">
        <p class="title">
          私人FM
        </p>
        <p class="text">
          享受你的音乐专属推荐
        </p>
      </div>
    </div>
    <div class="FM">
      <div class="left">
        <span class="iconfont icon-gequ" />
      </div>
      <div class="right">
        <p class="title">
          每日歌曲推荐
        </p>
        <p class="text">
          根据你的口味生成
        </p>
      </div>
    </div>
    <div class="FM">
      <div class="left">
        <span class="iconfont icon-wujiaoxing" />
      </div>
      <div class="right">
        <p class="title">
          排行榜
        </p>
        <p class="text">
          最热音乐版
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nominate',
}
</script>

<style lang="less" scoped>
    #nominate {
        display: flex;
        margin: 20px 0;
        >div {
            flex:1;
            justify-content: center;
            display: flex;
            align-items: center;
            &:nth-of-type(n+2){
                border-left: 1px solid #e4e4e7;
            }
            .left {
                color: #df3b3b;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: 1px solid #df3b3b;
                text-align: center;
                line-height: 45px;
                .iconfont {
                    font-size: 30px;
                }
            }
            .right {
                padding-left: 10px;
                .title {
                    font-size: 16px;
                }
            }
        }
    }
</style>
