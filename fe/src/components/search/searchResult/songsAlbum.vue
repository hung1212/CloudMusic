<template>
  <div
    v-if="result"
    class="songs-album"
  >
    <div
      v-for="item of result"

      :key="item.id"
      class="album-item"
    >
      <div class="left">
        <img
          :src="item.picUrl"
          alt=""
        >
        <p class="name">
          {{ item.name }}
        </p>
        <p v-if="item.alias">
          {{ item.alias[0] }}
        </p>
      </div>
      <div class="right">
        <p>{{ item.artist.name }}</p>
      </div>
    </div>
  </div>
  <div
    v-else
    class="empty"
  >
    <p>暂无搜索结果</p>
  </div>
</template>

<script>
export default {
  name: 'SongsAlbum',
  props: {
    result: Array,
  },
}
</script>

<style lang="less" scoped>
    .songs-album {
        .album-item {
            display: flex;
            align-items: center;
            padding: 10px;
            position: relative;
            &:hover {
                background: #f2f2f3;
            }
            &:nth-child(odd) {
                background: #f4f4f6;
            }
            .left {
                display: flex;
                align-items: center;
                img {
                    width: 50px;
                    height: 50px;
                }
                .name {
                    margin-left: 20px;
                }
            }
            .right {
                position: absolute;
                margin-left: 600px;
                p {

                    color: #aaaaaa;
                }

            }
        }
    }
</style>
