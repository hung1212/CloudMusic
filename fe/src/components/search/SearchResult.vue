<template>
  <div class="search-result">
    <div class="search-result-title">
      <div
        class="search-result-c"
        :class="{acdive: searchTypeTab === 1}"
      >
        <span @click="changeType(1)">
          单曲
        </span>
      </div>
      <div
        class="search-result-c"
        :class="{acdive: searchTypeTab === 100}"
      >
        <span @click="changeType(100)">
          歌手
        </span>
      </div>
      <div
        class="search-result-c"
        :class="{acdive: searchTypeTab === 10}"
      >
        <span @click="changeType(10)">
          专辑
        </span>
      </div>
      <div
        class="search-result-c"
        :class="{acdive:searchTypeTab === 1004}"
      >
        <span @click="changeType(1004)">
          MV
        </span>
      </div>
      <div
        class="search-result-c"
        :class="{acdive:searchTypeTab === 1000}"
      >
        <span @click="changeType(1000)">
          歌单
        </span>
      </div>
      <div
        class="search-result-c"
        :class="{acdive:searchTypeTab === 1009}"
      >
        <span @click="changeType(1009)">
          主播电台
        </span>
      </div>
      <div
        class="search-result-c"
        :class="{acdive:searchTypeTab === 1002}"
      >
        <span @click="changeType(1002)">
          用户
        </span>
      </div>
    </div>
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
      class="show"
    >
      <songsSingle
        v-if="searchTypeTab === 1"
        :result="result.songs"
        :artist="artist"
      />
      <songsSinger
        v-if="searchTypeTab === 100"
        :result="result.artists"
      />

      <songs-album
        v-if="searchTypeTab === 10"
        :result="result.albums"
      />
      <songs-mV
        v-if="searchTypeTab === 1004"
        :result="result.mvs"
      />
      <songs-list
        v-if="searchTypeTab === 1000"
        :result="result.playlists"
      />
      <songs-djRadios
        v-if="searchTypeTab === 1009"
        :result="result.djRadios"
      />
      <songs-user
        v-if="searchTypeTab === 1002"
        :result="result.userprofiles"
      />
    </div>
  </div>
</template>

<script>
import songsSingle from './searchResult/songsSingle.vue'
import songsSinger from './searchResult/songsSinger.vue'
import songsAlbum from './searchResult/songsAlbum.vue'
import songsMV from './searchResult/songsMV.vue'
import songsList from './searchResult/songsList.vue'
import songsDjRadios from './searchResult/songsDjRadios.vue'
import songsUser from './searchResult/songsUser.vue'

export default {
  name: 'SearchResult',
  components: {
    songsSingle,
    songsSinger,
    songsAlbum,
    songsMV,
    songsList,
    songsDjRadios,
    songsUser,
  },
  props: {
    searchTypeTab: Number,
    result: Object,
    artist: Array,
    loading: Boolean,
  },
  methods: {
    changeType(res) {
      this.$emit('searchType', res)
    },
  },
}
</script>

<style lang="less" scoped>
.search-result {
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .search-result-title {
    display: flex;
    font-size: 16px;
    border-bottom: 2px solid #666;
    margin-bottom: 30px;
    .search-result-c {
      cursor: pointer;
      padding-right: 20px;
      span {
        display: inline-block;

        line-height: 40px;
      }
      &.acdive span {
        position: relative;
        color: #c62e2e;
        &::before {
          content: "";
          position: absolute;
          bottom: -1px;
          left: 0;
          height: 2px;
          background-color: #c62e2e;
          width: 100%;
          line-height: 34px;
        }
      }
    }
  }
  .show {
    overflow: auto;
    height: calc(100vh - 206px);
  }
}
</style>
