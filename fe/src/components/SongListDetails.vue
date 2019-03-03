<template>
  <div class="song-list-details">
    <infos :info="info" />
    <playlist :playlist="playlist" />
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
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      $.ajax({
        url: '/playlist/detail',
        type: 'get',
        dataType: 'json',
        data: { id: this.id },
        success: (data) => {
          if (data.code === 200) {
            this.info = data.playlist
            this.playlist = data.playlist.tracks
          }
        },
      })
    },

  },
}
</script>

<style lang="less" scoped>
    .song-list-details {
        flex: 1;
        padding: 20px;
    }
</style>
