<template>
  <div id="login">
    <div
      v-if="type === 'login'"
      class="login"
    >
      <span class="iconfont icon-guanbi-copy" />
      <span class="iconfont icon-wangyiyunyinle1" />
      <p @click="phone">
        手机号登陆
      </p>
      <p @click="email">
        邮箱登陆
      </p>
    </div>
    <div
      v-if="type === 'phone'"
      class="phone"
    >
      <span
        class="iconfont icon-2fanhui"
        @click="login"
      />
      <span class="iconfont icon-guanbi-copy" />
      <span class="iconfont icon-shouji" />
      <input
        v-model="ac"
        type="search"
        placeholder="手机号"
      >
      <input
        v-model="password"
        type="password"
        placeholder="请输入密码"
      >
      <p
        :class="{active:opacity}"
        @click="loginadmin"
      >
        登陆
      </p>
    </div>
    <div
      v-if="type === 'email'"
      class="email"
    >
      <span
        class="iconfont icon-2fanhui"
        @click="login"
      />
      <span class="iconfont icon-guanbi-copy" />
      <span class="iconfont icon-youxiang2" />
      <input
        v-model="ac"
        type="search"
        placeholder="请输入邮箱账号"
      >
      <input
        v-model="password"
        type="password"
        placeholder="请输入密码"
      >
      <p
        :class="{active:opacity}"
        @click="loginadmin"
      >
        登陆
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      store: window.store,
      type: 'login',
      ac: null,
      password: null,
      opacity: false,
    }
  },
  watch: {
    ac() {
      if (this.ac !== '' && this.password !== '') {
        this.opacity = true
      } else {
        this.opacity = false
      }
    },
    password() {
      if (this.ac !== '' && this.password !== '') {
        this.opacity = true
      } else {
        this.opacity = false
      }
    },
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) return
    this.ac = user[0]
    this.password = user[1]
  },
  methods: {
    login() {
      this.type = 'login'
    },
    phone() {
      this.type = 'phone'
    },
    email() {
      this.type = 'email'
    },
    loginadmin() {
      if (this.type === 'phone') { // 手机登陆
        $.get('/login/cellphone', { phone: this.ac, password: this.password }, (res) => {
          this.store.user.profile = res.profile
          localStorage.setItem('user', JSON.stringify([this.ac, this.password]))
        })
      } else if (this.type === 'email') { // 邮箱登陆
        $.get('/login', { email: this.ac, password: this.password }, (res) => {
          this.store.user.profile = res.profile
          localStorage.setItem('user', JSON.stringify([this.ac, this.password]))
        })
      }
    },
    // status() {
    //   $.get('/login/status', (res) => {
    //     localStorage.setItem('user', JSON.stringify([this.ac, this.password]))
    //     this.store.user.profile = res.profile
    //   })
    // },
  },
}
</script>

<style lang="less" scoped>
    #login {
        position:fixed;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width:300px;
        height:500px;
        background: #f6f6f6;
        box-shadow: 0 0 10px 1px #000;
        padding: 100px 50px 0;
        font-weight: 700;
        text-align: center;
        .icon-2fanhui {
            position: absolute;
            top: 10px;
            left: 10px;
        }
        .icon-guanbi-copy {
            position: absolute;
            top: 10px;
            right: 0px;
        }
        .phone,
        .email {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 16px;
            .icon-shouji,
            .icon-youxiang2 {
                font-size: 50px;
                display: block;
                margin-bottom: 50px;
            }

            input {
                border: 1px solid #000;
                width:220px;
                line-height: 40px;
                padding-left: 20px;
                &:first-of-type {
                    border-bottom: none;
                }
            }
            .active {
                    opacity: 1;
                }
            p {
                width:220px;
                line-height: 40px;
                background-color: #e83535;
                color: #fff;
                opacity: .7;
                margin-top: 20px;

            }

        }
        .login{
            .icon-wangyiyunyinle1 {
                font-size: 50px;
                color: #e83535;
                margin-bottom: 30px;
                display: block;
            }
            p {
                margin: 0 auto;
                width: 200px;
                border:1px solid #e83535;
                color: #e83535;
                line-height: 30px;
                border-radius: 50px;
                margin-bottom: 10px;
                font-size: 16px;
            }


        }

    }
</style>
