<template>
  <div>
    <div class="title">
      主播电台
    </div>
  </div>
</template>

<script>
export default {
  name: 'Djprogram',
  mounted() {
    $.get('/personalized/djprogram', (res) => {
      console.log(res)
    })
  },
}
</script>

<style lang="less" scoped>

</style>
