<template>
  <div
    ref="player"
    class="player"
  >
    <audio
      id="audio"
      ref="audio"
      autoplay
      :src="store.audioData.src"
      @timeupdate="changeTime"
    />
    <lyric />
    <play />
    <operate />
    <schedule />
  </div>
</template>
<script>
import lyric from './audio/lyric.vue'
import play from './audio/play.vue'
import operate from './audio/operate.vue'
import schedule from './audio/schedule.vue'

export default {
  name: 'Audio',
  components: {
    lyric,
    play,
    operate,
    schedule,
  },
  data() {
    return {
      store: window.store,
    }
  },
  mounted() {
    // const audio = document.createElement('audio')
    // audio.ref = 'audio'
    // audio.id = 'audio'
    window.store.audio = this.$refs.audio
    // this.$refs.player.appendChild(audio)
  },
  methods: {
    changeTime() {
      // 只要播放事件在改变,进度条就改变
      if (!window.store.audioData.curflag) return
      this.store.audioData.width = `${this.store.audio.currentTime / this.store.audio.duration * 100}%`
      if (this.store.audio.ended) {
        if (this.store.audioData.schema === 1) { // 1是列表循环
          this.store.storage.playList.forEach((ele, i, arr) => {
            if (ele.id === this.store.songInfo.id) {
              if (arr.length - 1 === i) {
                window.actions.play(arr[0])
                window.actions.songInfo(arr[0])
              } else {
                window.actions.play(arr[i + 1])
                window.actions.songInfo(arr[i + 1])
              }
            }
          })
        } else if (this.store.audioData.schema === 2) { // 2是单曲播放
          window.actions.play(this.store.songInfo)
        } else if (this.store.audioData.schema === 3) { // 3是随机播放
          this.store.storage.playList.forEach((ele, i, arr) => {
            if (ele.id === this.store.songInfo.id) {
              let ran = Math.floor(Math.random() * arr.length)
              if (i === ran) ran = Math.floor(Math.random() * arr.length)
              window.actions.play(arr[ran])
              window.actions.songInfo(arr[ran])
            }
          })
        } else if (this.store.audioData.schema === 4) { // 4是顺序播放
          window.actions.play(this.store.songInfo)
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
    .omit-sandian {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .player {
        background: #fff;
        border-top: 1px solid #ccc;
        height: 70px;
        position: fixed;
        bottom: 0;
        width: 100%;
        display: flex;
        align-items: center;
    }
</style>
