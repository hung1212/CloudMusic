<template>
  <div id="user">
    <div class="account">
      账号
    </div>
    <div class="login">
      <p>登陆网易云音乐</p>
      <p>手机电脑多端同步,320k高音质无限下载</p>
      <p class="login-id">
        立即登陆
      </p>
    </div>
    <div class="user-info">
      <div class="vip">
        <span class="iconfont icon-tubiaozhizuomoban" />
        <p class="text">
          会员中心
        </p>
        <span class="iconfont icon-icon1" />
      </div>
      <div class="stop">
        <span class="iconfont icon-gouwuche" />
        <p class="text">
          积分商城
        </p>
        <span class="iconfont icon-icon1" />
      </div>
    </div>
    <div class="in">
      <span class="iconfont icon-guanyu" />
      <p class="text">
        关于网易云音乐
      </p>
      <span class="iconfont icon-icon1" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
}
</script>

<style lang="less" scoped>
    #user {
        background: #fafafc;
        position: fixed;
        top: 0;
        right: -412px;
        box-shadow: -9px 0 20px -8px #000;
        z-index: 999;
        width: 400px;
        font-size: 12px;
        height: calc(100vh - 70px);
        >div {
            padding-left: 30px;
            padding-right: 30px;
        }
        >div:not(:last-child){
            border-bottom: 1px solid #efeff2;
        }
        .account {
            line-height: 30px;
        }
        .login {
            text-align: center;
            padding: 40px 0 ;
            .login-id {
                margin-top: 20px;
                display: inline-block;
                padding: 10px 80px;
                background: #bc2f2d;
                color: #fff;
                &:hover {
                  opacity: .6;
                }
            }
        }
        .user-info {
            padding: 30px;
            >div {
                display: flex;
                justify-content: space-between;
                line-height: 40px;
                .text {
                    flex: 1;
                    padding-left: 20px;
                }
            }
        }
        .in {
            padding: 30px;
            display: flex;
            justify-content: space-between;
             line-height: 40px;
            .text {
                flex:1;
                padding-left: 20px;
            }
        }
    }
</style>
