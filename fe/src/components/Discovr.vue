<template>
  <div
    id="discovr"
  >
    <div class="herader">
      发现音乐
    </div>
    <div class="main">
      <div class="nav">
        <ul>
          <router-link to="/discovr/recommend">
            <li
              class="active"
            >
              个性推荐
            </li>
          </router-link>
          <router-link to="/discovr/songlist">
            <li
              class="active"
            >
              歌单
            </li>
          </router-link>
          <router-link to="/discovr/radios">
            <li
              class="active"
            >
              主播电台
            </li>
          </router-link>
          <router-link to="/discovr/newsong">
            <li
              class="active"
            >
              最新音乐
            </li>
          </router-link>
          <router-link to="/discovr/singer">
            <li
              class="active"
            >
              歌手
            </li>
          </router-link>
        </ul>
      </div>
      <div class="content scrollbar">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Discovr',
  data() {
    return {
      active: 1,
    }
  },
}
</script>
<style lang="less" scoped>
    @main-color:#c62e2e;
    #discovr {
        padding: 20px 0 0 25px;
        display: flex;
        flex-direction: column;
        flex: 1;
        .main {
          display: flex;
          flex-direction: column;
          .nav {
              ul {
                  display: flex;
                  border-bottom: 1px solid #e4e4e7;
                  .router-link-exact-active>li {
                      color: @main-color;
                      border-bottom:2px solid #c62e2e
                  }
                  >a {
                      color: #000;
                  }
                  li {
                      font-size: 16px;
                      margin-right: 20px;
                      padding: 15px 0;
                      cursor: pointer;
                      margin-bottom: -1px;
                  }
              }
          }
          .content {
            flex: 1;
            overflow: auto;
            >div {
              width: 1000px;
              margin:0 auto;
            }
          }
        }
    }
</style>
