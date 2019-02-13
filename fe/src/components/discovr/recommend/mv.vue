<template>
  <div>
    <div class="title">
      mv
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mv',
  mounted() {
    $.get('/personalized/mv', (res) => {
      console.log(res)
    })
  },
}
</script>

<style lang="less" scoped>

</style>
