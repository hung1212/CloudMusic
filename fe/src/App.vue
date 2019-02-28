<template>
  <div
    class="main"
  >
    <div
      class="top"
    >
      <Nav />
      <router-view class="box" />
    </div>
    <Audio />
  </div>
</template>

<script>
import Audio from './components/Audio.vue'
import Nav from './components/Nav.vue'

export default {
  name: 'App',
  components: {
    Audio,
    Nav,
  },
}
</script>

<style lang="less" scoped>
 * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }
    .main {
      display: flex;
      flex-direction: column;
      // width:1200px;
      // margin:0 auto;
      .top {
        display: flex;
        overflow: auto;
        height: calc(100vh - 70px);
        &::-webkit-scrollbar {/*滚动条整体样式*/
          width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
          height: 1px;
        }
        &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
            border-radius: 4px;
            background: rgba(120, 134, 142,.3);
            &:hover {
              background: rgba(120, 134, 142,.5);
            }
        }
        &::-webkit-scrollbar-track {/*滚动条里面轨道*/
            border-radius: 4px;
            background-color: transparent;
            margin: 0 0;

        }
      }
    }
</style>
