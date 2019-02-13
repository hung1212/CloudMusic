<template>
  <div>
    <div class="title">
      独家发送
    </div>
  </div>
</template>

<script>
export default {
  name: 'Newsong',
  mounted() {
    $.get('/personalized/privatecontent', (res) => {
      console.log(res)
    })
  },
}
</script>

<style lang="less" scoped>

</style>
