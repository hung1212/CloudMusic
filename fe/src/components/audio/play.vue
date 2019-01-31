<template>
  <div
    class="plays"
  >
    <span class="iconfont icon-48shangyishou qh" />
    <span
      class="iconfont cut-paly"
      :class="{'icon-bofang':store.audioData.tabplay , 'icon-zanting':!store.audioData.tabplay}"
      @click="play"
    />
    <span
      class="iconfont icon-048caozuo_xiayishou qh"
    />
  </div>
</template>
<script>
export default {
  name: 'Play',
  data() {
    return {
      store: window.store,
    }
  },
  methods: {
    play() {
      if (this.store.storage.playList.length === 0) return
      if (this.store.audioData.tabplay) {
        this.store.audioData.tabplay = !this.store.audioData.tabplay
        window.actions.play(this.store.songInfo)
        this.store.audio.play()
      } else {
        this.store.audioData.tabplay = !this.store.audioData.tabplay
        this.store.audio.pause()
      }
    },
  },
}
</script>

<style lang="less" scoped >
      .plays {
            display: flex;
            justify-content: space-around;
            align-items: center;
            color: #fff;
            padding: 0 20px;
            .iconfont {
                background-color:#df3b3b;
        }
        .cut-paly {
            text-align: center;
            line-height: 40px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin: 0 30px;
        }
        .qh {
            text-align: center;
            line-height: 30px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
        }
      }
</style>
