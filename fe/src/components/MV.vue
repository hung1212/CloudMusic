<template>
  <div id="discovr">
    MV
    <div class="main">
      <div class="nav">
        <ul>
          <router-link to="/mv/sift">
            <li class="active">
              精选
            </li>
          </router-link>
          <router-link to="/mv/list">
            <li class="active">
              排行榜
            </li>
          </router-link>
          <!-- <router-link to="/mv/total">
            <li class="active">
              全部
            </li>
          </router-link> -->
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
  name: 'MV',
}
</script>

<style lang="less" scoped>
@main-color: #c62e2e;
#discovr {
  padding: 20px 0 0 25px;
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #fafafc;
  .main {
    display: flex;
    flex-direction: column;
    .nav {
      ul {
        display: flex;
        border-bottom: 1px solid #e4e4e7;
        .router-link-exact-active > li {
          color: @main-color;
          border-bottom: 2px solid #c62e2e;
        }
        > a {
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
      > div {
        width: 1000px;
        margin: 0 auto;
      }
    }
  }
}
</style>
