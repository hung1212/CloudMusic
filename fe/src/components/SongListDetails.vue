<template>
  <div class="info-load">
    <div
      v-if="loading"
      class="loading"
    >
      <img
        src="http://files.57gif.com/webgif/0/e/14/b6578a8f6e0aa313dd26b750e8dc0.gif"
        alt="加载中"
      >
    </div>
    <div
      v-else
      class="song-list-details"
    >
      <infos :info="info" />
      <playlist :playlist="playlist" />
    </div>
  </div>
</template>


<script>
import infos from './songlistdetails/info.vue'
import playlist from './songlistdetails/playlist.vue'

export default {
  name: 'SongListDetails',
  components: {
    infos,
    playlist,
  },
  data() {
    return {
      id: this.$route.query.id,
      info: {},
      playlist: [],
      loading: false,
    }
  },
  watch: {
    $route: 'getInfo',
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      this.loading = true
      this.id = this.$route.query.id
      $.ajax({
        url: '/playlist/detail',
        type: 'get',
        dataType: 'json',
        data: { id: this.id },
        success: (data) => {
          if (data.code === 200) {
            this.info = data.playlist
            this.playlist = data.playlist.tracks
            this.loading = false
          }
        },
      })
    },

  },
}
</script>

<style lang="less" scoped>
    .info-load {
      flex: 1;
      overflow: auto;
      .song-list-details {
          padding: 20px;
      }
    }
</style>
