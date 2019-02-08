<template>
  <div class="search">
    <div class="searchbox">
      <input
        v-model="searchKeyword"
        name="searchValue"
        type="search"
        placeholder="搜索音乐.歌手.歌词.用户"
        @keydown.enter="enter"
      >
      <span
        class="iconfont icon-02"
        @click="enter"
      />
    </div>
    <div
      class="auto"
    >
      <search-result
        v-if="cut"
        :result="result"
        :artist="artist"
        :search-type-tab="searchTypeTab"
        class="search-result"
        :loading="loading"
        @searchType="changeType"
      />
      <div
        v-else
        class="searchdata"
      >
        <search-hot @search="historySearch" />
        <search-history @record="historySearch" />
      </div>
    </div>
  </div>
</template>

<script>
import searchHot from './search/Hot.vue'
import searchHistory from './search/History.vue'
import searchResult from './search/SearchResult.vue'

export default {
  name: 'Search',
  components: {
    searchHot,
    searchHistory,
    searchResult,
  },
  data() {
    return {
      searchKeyword: '',
      searchTypeTab: 1,
      cut: false,
      result: {},
      artist: [],
      loading: false,
    }
  },
  watch: {
    searchKeyword(value) {
      if (value === '') this.cut = false
    },
  },
  methods: {
    enter() {
      this.cut = true
      if (this.searchKeyword === '') return
      const res = localStorage.getItem('hots')
      let hots = []
      if (res) {
        hots = JSON.parse(res)
      }
      if (hots.indexOf(this.searchKeyword) === -1) {
      // if (hots.findIndex(item => item === value) === -1) {
        hots.push(this.searchKeyword)
      }
      localStorage.setItem('hots', JSON.stringify(hots))
      this.searchTypeTab = 1
      this.search()
    },
    changeType(type) {
      this.cut = true
      this.searchTypeTab = type
      this.search()
    },
    historySearch(value) {
      this.cut = true
      this.searchKeyword = value
      this.searchTypeTab = 1
      this.search()
    },
    search() {
      // 获取最佳匹配
      if (this.searchTypeTab === 1) {
        $.get('/search/multimatch', { keywords: this.searchKeyword }, (res) => {
          if (res.code === 200) {
            this.artist = res.result.artist
          }
        })
      }
      this.loading = true
      // 获取歌曲
      $.get('/search', { keywords: this.searchKeyword, type: this.searchTypeTab, limit: 50 }, (res) => {
        if (res.code === 200) {
          this.result = res.result
          this.loading = false
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.search {
  padding: 20px 25px;
  flex:1;
  .searchbox {
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
    position: relative;
    input {
      width: 100%;
      height: 100%;
      padding-left: 20px;
      border: 1px solid #666;
      &::-webkit-search-cancel-button {
        display: none;
      }
    }
    .icon-02 {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }
  .searchdata {
    display: flex;
    justify-content: space-between;
  }
}
</style>
