<template>
  <div class="history">
    <div class="history-title">
      <h4>
        搜索记录
      </h4>
      <span @click="deleteAll">
        🗑
      </span>
    </div>

    <div class="history-content">
      <div
        v-for="(item ,index) of hots"
        :key="index"
        class="history-box"
      >
        <p
          class="history-text"
          @click="record(item)"
        >
          {{ item }}
        </p>
        <p @click="deleteStorage(item)">
          ×
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'History',
  data() {
    return {
      hots: [],
      array: [],
    }
  },
  mounted() {
    const rem = JSON.parse(localStorage.getItem('hots'))
    if (rem) {
      this.hots = rem.reverse()
    }
  },
  methods: {
    deleteStorage(item) {
      // this.hots.forEach((element, index, array) => {
      //   if (item === element) {
      //     array.splice(index, 1)
      //     localStorage.setItem('hots', JSON.stringify(array))
      //   }
      // })
      this.hots.splice(this.hots.indexOf(item), 1)
      localStorage.setItem('hots', JSON.stringify(this.hots))
    },
    deleteAll() {
      if (window.confirm('清除所有历史记录?')) {
        localStorage.removeItem('hots')
        this.hots = null
      }
    },
    record(value) {
      this.$emit('record', value)
    },
  },
}

</script>

<style lang="less" scoped>
     .history {
        width: 50%;
        .history-title {
            width: 100%;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #666;
            line-height: 30px;
            h4 {
                font-weight: 100;
                font-size: 16px;
                color: #666;

            }
            span {
                font-size: 30px;
                cursor: pointer;
            }

        }
        .history-content {
            .history-box {
                margin-top: 13px;
                display: flex;
                justify-content: space-between;
                cursor: pointer;
                .history-text {
                    font-size: 16px;
                }
            }
        }
    }
</style>
