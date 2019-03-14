<template>
  <div v-show="$route.name != 'Lyric'">
    <div
      v-if="!store.user.userLogin"
      class="nav"
    >
      <div class="shrink">
        <span class="iconfont icon-sanhengxian" />
      </div>
      <div class="nav-box scrollbar">
        <div class="box1 box">
          <router-link to="/">
            <div
              class="item active"
            >
              <span class="iconfont icon-sousuo" />
              搜索
            </div>
          </router-link>
          <router-link to="/discovr/recommend">
            <div
              class="item"
            >
              <span class="iconfont icon-yinle" />
              发现音乐
            </div>
          </router-link>
          <router-link to="/mv">
            <div class="item">
              <span class="iconfont icon-mv" />
              MV
            </div>
          </router-link>
          <router-link to="/friend">
            <div class="item">
              <span class="iconfont icon-19" />
              朋友
            </div>
          </router-link>
        </div>
        <div class="box2 box">
          <div class="title">
            我的音乐
          </div>
          <router-link to="/local">
            <div class="item">
              <span class="iconfont icon-bendiyinle" />
              本地音乐
            </div>
          </router-link>
          <router-link to="/download">
            <div class="item">
              <span class="iconfont icon-xiazai" />
              下载管理
            </div>
          </router-link>
          <router-link to="/lyLate">
            <div class="item">
              <span class="iconfont icon-zuijinbofang" />
              最近播放
            </div>
          </router-link>
        </div>
      </div>
      <div class="user">
        <div
          class="log"
          @click="login"
        >
          <span class="iconfont icon-gexinghuapingtaitubiao-" />
          <span class="name">
            未登录
          </span>
        </div>
        <div class="right">
          <span class="iconfont icon-youxiang1" />
          <span class="iconfont icon-shezhi" />
        </div>
      </div>
      <user @closeUser="login" />
    </div>
    <div
      v-else
      class="nav"
    >
      <div class="shrink">
        <span class="iconfont icon-sanhengxian" />
      </div>
      <div class="nav-box scrollbar">
        <div class="box1 box">
          <router-link to="/">
            <div
              class="item active"
            >
              <span class="iconfont icon-sousuo" />
              搜索
            </div>
          </router-link>
          <router-link to="/discovr/recommend">
            <div
              class="item"
            >
              <span class="iconfont icon-yinle" />
              发现音乐
            </div>
          </router-link>
          <router-link to="/mv">
            <div class="item">
              <span class="iconfont icon-mv" />
              MV
            </div>
          </router-link>
          <router-link to="/friend">
            <div class="item">
              <span class="iconfont icon-19" />
              朋友
            </div>
          </router-link>
        </div>
        <div class="box2 box">
          <div class="title">
            我的音乐
          </div>
          <router-link to="/local">
            <div class="item">
              <span class="iconfont icon-bendiyinle" />
              本地音乐
            </div>
          </router-link>
          <router-link to="/download">
            <div class="item">
              <span class="iconfont icon-xiazai" />
              下载管理
            </div>
          </router-link>
          <router-link to="/lyLate">
            <div class="item">
              <span class="iconfont icon-zuijinbofang" />
              最近播放
            </div>
          </router-link>
          <div class="item">
            <span class="iconfont icon-77" />
            我的音乐云盘
          </div>
          <div class="item">
            <span class="iconfont icon-diantai" />
            我的电台
          </div>
          <div class="item">
            <span class="iconfont icon-tianjiawenjian" />
            我的收藏
          </div>
        </div>
        <div class="box3 box">
          <div class="title">
            创建的歌单<span class="iconfont icon-jia" />
          </div>
          <div
            class="item"
            @click="$router.push({name:'SongListDetails',query:{id:songList[0].id}})"
          >
            <span class="iconfont icon-xihuan" />
            我喜欢的音乐
          </div>
        </div>
        <div class="box3 box">
          <div class="title">
            收藏的歌单
          </div>
          <template
            v-for="(item,index) of songList"
          >
            <div
              v-if="index!==0"
              :key="item.id"
              class="item"
              @click="$router.push({name:'SongListDetails',query:{id:item.id}})"
            >
              <span class="iconfont icon-xihuan" />
              {{ item.name }}
            </div>
          </template>
        </div>
      </div>
      <div class="user">
        <div
          class="log"
          @click="login"
        >
          <img
            :src="store.user.userLogin.avatarUrl"
            alt=""
          >
          <span class="name">
            {{ store.user.userLogin.nickname }}
          </span>
        </div>
        <div class="right">
          <span class="iconfont icon-youxiang1" />
          <span class="iconfont icon-shezhi" />
        </div>
      </div>
      <user />
    </div>
  </div>
</template>
<script>
import user from './nav/user.vue'

export default {
  name: 'Nav',
  components: {
    user,
  },
  data() {
    return {
      store: window.store,
      show: false,
      songList: [],
    }
  },
  mounted() {
    this.store.user.status(this.getsongList)
  },
  methods: {
    login() {
      if (this.show) {
        this.show = !this.show
        $('#user').animate({ right: '-412px' }, 200)
      } else {
        this.show = !this.show
        $('#user').animate({ right: '0' }, 200)
      }
    },
    getsongList() {
      $.ajax({
        url: '/user/playlist',
        type: 'get',
        dataType: 'json',
        data: { uid: this.store.user.userLogin.userId },
        success: (data) => {
          if (data.code === 200) {
            this.songList = data.playlist
          }
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
    .nav {
        border-right: 1px solid #dddde1;
        width: 200px;
        font-size: 14px;
        background-color: #f3f3f5;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        height: 100%;
        .shrink {
            padding: 20px;
        }
        .nav-box {
            flex: 1;
            overflow: auto;
            .router-link-exact-active>div {
              background: #dddde1;
              border-left:2px solid #bc2f2d
            }
            .box {
                a {
                  color: #000;
                }
                .title {
                       line-height: 40px;
                       margin-top: 15px;
                       padding-left: 15px;
                       padding-right: 15px;
                       display: flex;
                       justify-content: space-between;
                       color: #999999
                    }
                .item {
                    line-height: 40px;
                    padding-left: 15px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    span {
                        padding-right: 15px;
                    }
                    &:hover {
                        background: #e8e8eb;
                    }
                }
            }
        }
        .user {
            line-height: 60px;
            border-top: 2px solid #dddde1;
            display: flex;
            justify-content: space-between;
            .log {
                display: flex;
                cursor: pointer;
                align-items: center;
                img {
                  width: 30px;
                  height: 30px;
                  margin:0 8px;
                }
            }
            .iconfont {
                padding: 0 10px;
            }
            .icon-gexinghuapingtaitubiao- {
                font-size: 26px;
            }
        }
    }
</style>
