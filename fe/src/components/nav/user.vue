<template>
  <div
    v-if="!store.user.profile"
    id="user"
  >
    <div class="account">
      账号
    </div>
    <div
      class="login"
    >
      <p>登陆网易云音乐</p>
      <p>手机电脑多端同步,320k高音质无限下载</p>
      <p
        class="login-id"
        @click="closeUser"
      >
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
    <login
      v-if="login"
      @close="tablogin"
    />
  </div>
  <div
    v-else
    id="user"
  >
    <div class="account">
      <p>账号</p>
      <p class="bianji">
        编辑
      </p>
    </div>
    <div class="user">
      <div class="user-top">
        <div class="user-info">
          <div class="user-img">
            <img
              :src="store.user.profile.avatarUrl"
              alt=""
            >
          </div>
          <p class="user-name">
            {{ store.user.profile.nickname }}
          </p>
        </div>
        <div class="qiandao">
          <span class="iconfont icon-jinbi" />
          <p>签到</p>
        </div>
      </div>
      <div class="user-bottom">
        <div class="item">
          <p class="sum">
            0
          </p>
          <p class="text">
            动态
          </p>
        </div>
        <div class="item">
          <p class="sum">
            {{ store.user.profile.follows }}
          </p>
          <p class="text">
            关注
          </p>
        </div>
        <div class="item">
          <p class="sum">
            {{ store.user.profile.followeds }}
          </p>
          <p class="text">
            粉丝
          </p>
        </div>
      </div>
    </div>
    <div class="user-info">
      <div class="vip">
        <span class="iconfont icon-level" />
        <p class="text">
          我的等级
        </p>
        <span class="iconfont icon-icon1" />
      </div>
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
    <div class="logout">
      <span class="iconfont icon-tuichu" />
      <p @click="logout">
        退出登陆
      </p>
    </div>
  </div>
</template>

<script>
import login from './login/login.vue'

export default {
  name: 'User',
  components: {
    login,
  },
  data() {
    return {
      store: window.store,
      login: false,
    }
  },
  methods: {
    tablogin() {
      this.login = !this.login
    },
    closeUser() {
      this.login = !this.login
      this.$emit('closeUser')
    },
    logout() {
      $.get('/logout', (res) => {
        if (res.code === 200) this.store.user.profile = null
      })
    },
  },

}
</script>

<style lang="less" scoped>
.bianji {
   padding: 0 10px;
   border: 1px solid #b8b9bf;
   height: 20px;
};
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
        display: flex;
        flex-direction: column;
        >div {
            padding-left: 30px;
            padding-right: 30px;
        }
        >div:not(:last-child){
            border-bottom: 1px solid #efeff2;
        }
        .account {
            display: flex;
            justify-content: space-between;
            height: 40px;
            align-items: center;
            // .bianji {
            //  .bianji
            // }
        }
        >.login {
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
        >.user {
          padding: 20px 30px;
          >.user-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            >.user-info {
              flex: 1;
              display: flex;
              align-items: center;
              .user-name {
                padding-left: 5px;
              }
              .user-img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                img {
                  width: 100%;
                  border-radius: 50%;
                }
              }
            }
            >.qiandao {
                display: flex;
                align-items: center;
               .bianji
              }
          }
          >.user-bottom {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            .item {
              text-align: center;
              &:first-of-type {
                margin-left: 10px;
              }
              &:last-of-type {
                margin-right: 10px;
              }
            }
          }
        }
        >.user-info {
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
             flex: 1;
            .text {
                flex:1;
                padding-left: 20px;
            }
        }
        .logout {
          display: flex;
          height: 50px;
          align-items: center;
        }
    }
</style>
