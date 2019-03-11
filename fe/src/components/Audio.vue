<template>
  <div
    ref="player"
    class="player"
  >
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
    const audio = document.createElement('audio')
    audio.addEventListener('timeupdate', this.changeTime)
    this.store.audio = audio
    document.body.appendChild(audio)
  },
  methods: {
    changeTime() {
      // 只要播放事件在改变,进度条就改变
      if (!window.store.audioData.curflag) return
      if (!this.$store.state.songInfo) return
      if (this.store.lrc.diskFalse) this.store.lrc.disk = true
      this.store.lrc.diskFalse = true
      this.store.audioData.width = `${this.store.audio.currentTime * 1000 / this.$store.state.songInfo.dt * 100}%`
      if (this.store.lrc.lyric) {
        this.store.lrc.currentLrc = this.store.lrc.lyric.find((ele, i, arr) => {
          if (i === arr.length - 1) return true
          return this.store.audio.currentTime * 1000 < arr[i + 1].time
        // if (flag) { return this.store.audio.currentTime * 1000 > arr[i].time }
        })
      }
      if (this.store.audio.ended) {
        if (this.store.audioData.schema === 2) {
          this.store.audio.currentTime = 0
          this.store.audio.play()
        } else {
          this.store.lrc.disk = false
          window.actions.next()
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
        z-index: 900;
        height: calc
    }
</style>
