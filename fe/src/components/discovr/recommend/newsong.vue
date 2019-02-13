<template>
  <div>
    <div class="title">
      推荐新音乐
    </div>
  </div>
</template>

<script>
export default {
  name: 'Newsong',
  mounted() {
    $.get('/personalized/newsong', (res) => {
      console.log(res)
    })
  },
}
</script>

<style lang="less" scoped>

</style>
