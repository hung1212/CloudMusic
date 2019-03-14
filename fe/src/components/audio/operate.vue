<template>
  <div
    v-if="$store.state.playList.length>0 && songInfo"
    class="info"
  >
    <div class="song">
      <div class="left">
        <span class="songname">
          {{ songInfo.name }}
        </span>
        -
        <span class="name">
          {{ songInfo.ar[0].name }}
        </span>
      </div>
      <div class="right">
        <span class="start">
          {{ songInfo.dt | curTime }}
        </span>
        /
        <span class="end">
          {{ songInfo.dt | songTime }}
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
    <div class="progressPD">
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
      const store =
        (time / 1000) * ((window.store.audio.currentTime * 1000) / time)
      const m = String(Math.floor(store / 60 / 10))
        + String(Math.floor((store / 60) % 10))
      const s = String(Math.floor((store % 60) / 10))
        + String(Math.floor((store % 60) % 10))
      return `${m}:${s}`
    },
  },
  data() {
    return {
      store: window.store,
      wacthWidth: 0,
      downX: '',
      currentTime: '',
      ratio: '',
      upPlay: true,
      event: {},
    }
  },
  computed: {
    songInfo() {
      return this.$store.state.songInfo
    },
  },
  mounted() {
    // 20是圈圈的宽度
    this.$refs.width.style.width = `${this.$refs.width.offsetWidth - 20}px`
  },
  methods: {
    a(e) {
      this.move(e)
    },
    b(e) {
      this.up(e)
    },
    down(e) {
      this.downX = e.clientX - this.$refs.width.getBoundingClientRect().left
      if (e.target !== this.$refs.dian) {
        let w = ''
        if (this.downX > this.$refs.width.offsetWidth) {
          w = 1
        } else if (this.downX < this.$refs.dian.offsetWidth / 2) {
          w = 0
        } else {
          w = (this.downX - this.$refs.dian.offsetWidth / 2) / this.$refs.width.offsetWidth
        }
        this.$refs.wacth.style.width = `${w * 100}%`
        this.store.audio.currentTime = w * (this.songInfo.dt / 1000)
      } else {
        this.store.audioData.curflag = false
        this.upPlay = false
      }
      this.wacthWidth = this.$refs.wacth.offsetWidth
      document.addEventListener('mousemove', this.a)
      document.addEventListener('mouseup', this.b)
      this.play(e)
    },
    move(e) {
      this.upPlay = true
      // 移动的位置
      const moveX = this.wacthWidth
        + (e.clientX - this.$refs.width.getBoundingClientRect().left)
        - this.downX
      this.ratio = moveX / this.$refs.width.offsetWidth
      this.store.audioData.width = `${this.ratio * 100}%`
      this.store.audio.currentTime = (this.ratio * this.songInfo.dt) / 1000
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
        window.actions.play(this.songInfo, () => {
          // eslint-disable-next-line
          this.store.audioData.curflag = true;
        })
      } else {
        this.store.audio.play()
      }
    },
    movePlay(e) {
      this.store.audioData.curflag = true
      this.store.audioData.tabplay = false
      if (!this.store.audioData.src) {
        window.actions.play(this.songInfo, () => {
          // eslint-disable-next-line
          this.store.audioData.curflag = true;
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
      this.store.audio.currentTime = (((this.wacthWidth + (client - this.downX))
          / this.$refs.width.offsetWidth)
          * this.songInfo.dt)
        / 1000
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
          background: #d13c3a;
          .dian {
            position: absolute;
            top: 50%;
            transform: translate(100%, -50%);
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
              transform: translate(-50%, -50%);

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
