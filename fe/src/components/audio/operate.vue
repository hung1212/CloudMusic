<template>
  <div
    v-if="store2.state.songInfo"
    class="info"
  >
    <div class="song">
      <div class="left">
        <span
          class="songname"
        >
          {{ store2.state.songInfo.name }}
        </span>
        -
        <span class="name">
          {{ store2.state.songInfo.ar[0].name }}
        </span>
      </div>
      <div class="right">
        <span class="start">
          {{ store2.state.songInfo.dt | curTime }}
        </span>
        /
        <span class="end">
          {{ store2.state.songInfo.dt | totalTime }}
        </span>
      </div>
    </div>
    <div
      class="progressPD"
      @mousedown="down"
    >
      <div
        ref="bur"
        class="progress"
      >
        <div
          ref="width"
          class="width"
        >
          <div
            ref="wacth"
            class="wacth"
            :style="{width:store.audioData.width}"
          >
            <div
              ref="dian"
              class="dian"
            />
          </div>
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
          ref="width"
          class="width"
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
  </div>
</template>

<script>

export default {
  name: 'Operate',
  filters: {
    curTime(time) {
      if (!window.store.audio) return '00:00'
      if (!time) return '00:00'
      // eslint-disable-next-line
      const store = (time / 1000) * (window.store.audio.currentTime * 1000 / time)
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
      store2: this.$store,
      wacthWidth: '',
      downX: '',
      currentTime: '',
      ratio: '',
      upPlay: true,
      event: {},
    }
  },
  mounted() {
    this.$refs.width.style.width = `${this.$refs.bur.offsetWidth - 20}px`
  },
  methods: {
    a(e) {
      this.move(e)
    },
    b(e) {
      this.up(e)
    },
    down(e) {
      this.wacthWidth = parseInt(
        getComputedStyle(this.$refs.wacth, null).width,
        10,
      )
      this.store.audioData.curflag = false
      this.upPlay = false
      this.downX = e.clientX - this.$refs.bur.getBoundingClientRect().left
      const width = (this.downX - this.$refs.dian.offsetWidth / 2) / this.$refs.width.offsetWidth
      this.$refs.wacth.style.width = `${width * 100}%`
      this.store.audio.currentTime = width * this.store2.state.songInfo.dt / 1000
      document.addEventListener('mousemove', this.a)
      document.addEventListener('mouseup', this.b)
      if (e.target === this.$refs.dian) return
      this.play(e)
    },
    move(e) {
      this.upPlay = true
      const moveX = this.wacthWidth + (e.clientX - this.$refs.bur.getBoundingClientRect().left) - this.downX
      this.ratio = moveX / this.$refs.width.offsetWidth
      this.store.audio.currentTime = this.ratio * this.store2.state.songInfo.dt / 1000
      this.store.audioData.width = `${this.ratio * 100}%`
      if (moveX >= this.$refs.width.offsetWidth) this.up()
    },
    up(e) {
      document.removeEventListener('mousemove', this.a)
      document.removeEventListener('mouseup', this.b)
      if (!this.upPlay) return
      this.movePlay(e)
      this.upPlay = false
    },
    play() {
      this.store.audioData.curflag = true
      this.store.audioData.tabplay = false
      if (!this.store.audioData.src) {
        window.actions.play(this.store2.state.songInfo, () => {
          // eslint-disable-next-line
          this.store.audioData.curflag = true
        })
      } else {
        this.store.audio.play()
      }
    },
    movePlay(e) {
      this.store.audioData.curflag = true
      this.store.audioData.tabplay = false
      if (!this.store.audioData.src) {
        window.actions.play(this.store2.state.songInfo, () => {
          // eslint-disable-next-line
          this.store.audioData.curflag = true
          this.moveClient(e)
        })
      } else if (!this.store.audio.paused) {
        this.moveClient(e)
      } else {
        this.store.audio.play()
        this.moveClient(e)
      }
    },
    moveClient(e) {
      if (!e) return
      const client = e.clientX - this.$refs.bur.getBoundingClientRect().left
      this.store.audio.currentTime = (this.wacthWidth + (client - this.downX)) / this.$refs.width.offsetWidth * this.store2.state.songInfo.dt / 1000
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
              .width {
                height: 100%;
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
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: 1px solid #ccc;
                    background: #fff;
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
    }
</style>
