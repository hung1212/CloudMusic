<template>
  <div class="bg">
    <div class="main">
      <div class="top">
        <div class="left">
          <div
            class="disk"
            :class="{ diskmove:store.lrc.disk}"
          >
            <img
              :src="store.songInfo.al.picUrl"
              alt=""
            >
          </div>
        </div>
        <div class="right">
          <h4>{{ store.songInfo.name }}</h4>
          <div class="intro">
            <p class="album">
              专辑: <a href="##">
                {{ store.songInfo.al.name }}
              </a>
            </p>
            <p class="album">
              歌手: <a href="##">
                {{ store.songInfo.ar[0].name }}
              </a>
            </p>
            <p class="album">
              来源: <a href="##" />
            </p>
          </div>
          <div
            ref="lrc"
            class="lrc"
          >
            <p
              v-for="(value , index) of store.lrc.lyric"
              :key="index"
              :class="{active:index === store.lrc.currentLrc.index}"
            >
              {{ value.lrc }}
            </p>
          </div>
        </div>
      </div>
      <div class="bottom">
        <comment />
        <div class="right">
          <silrc class="silrc" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import comment from './lyric/comment.vue'
import silrc from './lyric/silrc.vue'

export default {
  name: 'Lyric',
  components: {
    comment,
    silrc,
  },
  data() {
    return {
      store: window.store,
    }
  },
  watch: {
    'store.lrc.currentLrc': function () {
      this.$refs.lrc.scrollTop += 34
    },
  },
}
</script>

<style lang="less" scoped>
.bg {
  background: #d7d8d9;
}
    .main {
       width: 1000px;
       margin:0 auto;
       padding: 50px 0 100px 0;
       .top {
        background: #697a83;
        display: flex;
         .left {
           padding-top:20px;
           .disk {
             width: 322px;
             height: 322px;
             background: url("https://s2.music.126.net/style/web2/img/coverall.png?18787c7fb492ce0033964d1ce51e2e9c") no-repeat center;
             background-size:600px;
             background-position:-223px -918px;
             position: relative;
             &.diskmove {
                animation: disk 10s linear infinite;
                @keyframes disk {
                 0% {

                 }
                 100% {
                  transform: rotateZ(360deg)
                 }
               }
             }
             img {
               width: 206px;
               height:206px;
               border-radius: 50%;
               position: absolute;
               top: 50%;
               left: 50%;
               transform: translate(-50%,-50%)
             }
           }
         }
         .right {
           flex: 1;
           margin-left: 80px;
           h4 {
             font-size: 20px;
             color: #333333;
             font-weight: normal;
           }
           .intro {
             display: flex;
             margin: 10px 0 20px 0;
             p {
               margin-right: 20px;
               a {
                color: #1a5a99;
               }
             }

           }
           .lrc {
             height: 400px;
             overflow-x: auto;
             p {
               font-size: 16px;
               line-height: 34px;
               &.active {
                 color: #fff;
               }
             }
           }
         }
       }
       .bottom {
         display: flex;
         .right {
           width: 300px;
           margin-left: 50px;
         }
       }
    }
</style>
