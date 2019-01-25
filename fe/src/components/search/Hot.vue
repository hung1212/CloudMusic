<template>
  <div class="hot">
    <h4 class="hot-title">
      热门搜索
    </h4>
    <div class="hot-content">
      <button
        v-for="(item , index) of hots"
        :key="index"
        class="hot-block"
        @click="search(item.first)"
      >
        {{ item.first }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hot',
  data() {
    return {
      hots: [],
    }
  },
  mounted() {
    $.get({
      url: '/search/hot',
      success: (res) => {
        this.hots = res.result.hots
      },
    })
  },
  methods: {
    search(value) {
      const res = localStorage.getItem('hots')
      let hots = []
      if (res) {
        hots = JSON.parse(res)
      }
      if (hots.indexOf(value) === -1) {
      // if (hots.findIndex(item => item === value) === -1) {
        hots.push(value)
      }
      localStorage.setItem('hots', JSON.stringify(hots))
      this.$emit('search', value)
    },
  },
}
</script>

<style lang="less" scoped>
.hot {
  width: 50%;
  margin-right: 50px;
  .hot-title {
    font-weight: 100;
    font-size: 16px;
    line-height: 30px;
    color: #666;
    border-bottom: 1px solid #666;
  }
  .hot-content {
    .hot-block {
      padding: 3px 5px;
      margin: 10px 10px 0 0;
      border: 1px solid #666;
      border-radius: 10px;
    }
  }
}
</style>
