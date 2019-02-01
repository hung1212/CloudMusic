<template>
  <div
    v-if="store.storage.playList.length > 0 && store.songInfo"
    class="info"
    @mousemove="move"
    @mouseup="up"
  >
    <div class="song">
      <div class="left">
        <span
          class="songname"
        >
          {{ store.songInfo.name }}
        </span>
        -
        <span class="name">
          {{ store.songInfo.ar[0].name }}
        </span>
      </div>
      <div class="right">
        <span class="start">
          {{ store.songInfo.dt | curTime }}
        </span>
        /
        <span class="end">
          {{ store.songInfo.dt | totalTime }}
        </span>
      </div>
    </div>
    <div
      class="progressPD"
      @click="clickBar"
    >
      <div
        ref="bur"
        class="progress"
      >
        <div
          ref="wacth"
          class="wacth"
          :style="{width:store.audioData.width}"
        >
          <div
            ref="dian"
            class="dian"
            @mousedown="down"
          />
        </div>
      </div>
    </div>
  </div>

  <div
    v-else
    class="info"
  >
    <div class="song">
      <div class="left" />
      <div class="right">
        <span class="start">
          00:00
        </span>
        /
        <span class="end">
          00:00
        </span>
      </div>
    </div>
    <div
      class="progressPD"
    >
      <div
        ref="bur"
        class="progress"
      >
        <div
          ref="wacth"
          class="wacth"
        >
          <div
            ref="dian"
            class="dian"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Operate',
  filters: {
    curTime(time) {
      if (!window.store.audio) return '00:00'
      if (!window.store.songInfo.dt) return '00:00'
      // eslint-disable-next-line
      const store = (time / 1000) * (window.store.audio.currentTime * 1000 / window.store.songInfo.dt)
      const m = String(Math.floor((store / 60) / 10)) + String(Math.floor((store / 60) % 10))
      const s = String(Math.floor((store % 60) / 10)) + String(Math.floor(store % 60 % 10))
      return `${m}:${s}`
    },
    totalTime(time) {
      const store = (time / 1000)
      const m = String(Math.floor((store / 60) / 10)) + String(Math.floor((store / 60) % 10))
      const s = String(Math.floor((store % 60) / 10)) + String(Math.floor(store % 60 % 10))
      return `${m}:${s}`
    },
  },
  data() {
    return {
      store: window.store,
      wacthWidth: '',
      dowmX: '',
      flag: false,
      curflag: true,
      currentTime: '',
      ratio: '',
    }
  },
  methods: {
    down(e) {
      this.wacthWidth = parseInt(
        getComputedStyle(this.$refs.wacth, null).width,
        10,
      )
      this.dowmX = e.clientX - this.$refs.bur.getBoundingClientRect().left
      this.flag = true
      this.store.audioData.curflag = false
    },
    move(e) {
      if (!this.flag) return
      // this.wacthWidth = parseInt(getComputedStyle(this.$refs.wacth, null).width)
      // eslint-disable-next-line max-len
      const moveX = this.wacthWidth + (e.clientX - this.$refs.bur.getBoundingClientRect().left) - this.dowmX
      this.store.audioData.width = `${moveX / this.$refs.bur.offsetWidth * 100}%`
      this.ratio = moveX / this.$refs.bur.offsetWidth

      this.store.tabplay = false
      this.store.audio.play()

      if (moveX > this.$refs.bur.offsetWidth) this.up()
    },
    up() {
      this.flag = false
      this.store.audioData.curflag = true
      window.store.audio.currentTime = window.store.songInfo.dt / 1000 * this.ratio
    },

    // // 只要进度条发生改变,当前时间也改变
    clickBar(e) {
      if (e.target === this.$refs.dian) return
      if (this.store.audio.autoplay) {
        window.store.audio.currentTime = (e.clientX - this.$refs.bur.getBoundingClientRect().left)
        / this.$refs.bur.offsetWidth * window.store.songInfo.dt / 1000
      } else {
        window.actions.play(this.store.songInfo, () => {
          // eslint-disable-next-line
           window.store.audio.currentTime = (e.clientX - this.$refs.bur.getBoundingClientRect().left) / this.$refs.bur.offsetWidth * window.store.songInfo.dt/1000
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
    .info {
        flex: 1;
        .song {
            display: flex;
            justify-content: space-between;
        }
        .progressPD {
            padding: 15px 0 10px;
            width: 100%;
            .progress {
              width: 100%;
              height: 3px;
              background: #e5e5e5;
              .wacth {
                position: relative;
                width: 0;
                height: 100%;
                background:#d13c3a;
                .dian {
                  position: absolute;
                  top: 50%;
                  transform: translate(100% , -50%);
                  right: 0px;
                  width: 1px;
                  height: 1px;
                  border-radius: 50%;
                  padding: 8px;
                  border: 1px solid #ccc;
                  &::after {
                    content: "";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50% , -50%);

                    width: 6px;
                    height: 6px;
                    background: #df3b3b;
                    border-radius: 50%;
                  }
                }
              }

            }
        }
    }
</style>
