<template>
  <div class="sift">
    <div class="newMV">
      <div class="title">
        <h4>最新MV</h4>
      </div>
      <div class="content">
        <div
          v-for="(page,index) of pages"
          :key="index"
          class="items"
        >
          <div
            v-for="item of page"
            :key="item.id"
            class="item"
          >
            <div class="top">
              <p class="playCount">
                <span class="iconfont icon-touyingyi" />
                {{ item.playCount | playCount }}
              </p>
              <p class="briefDesc">
                {{ item.briefDesc }}
              </p>
              <img
                :src="item.cover"
                alt
              >
            </div>
            <p class="name omit-text">
              {{ item.name }}
            </p>
            <p class="artistName">
              {{ item.artists | artists }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sift',
  data() {
    return {
      first: [],
    }
  },
  computed: {
    pages() {
      const arr = []
      this.first.forEach((v, index) => {
        const i = Math.floor(index / 3)
        if (!arr[i]) arr[i] = []
        arr[i].push(v)
      })
      return arr
    },
  },
  async created() {
    const res = await this.$http.get('/mv/first', {
      params: {
        limit: 8,
      },
    })
    this.first = res.data.data
  },
}
</script>

<style lang="less" scoped>
.sift {
  .title {
      margin-top: 30px;
      h4 {
          font-size: 16px;
          line-height: 36px;
      }
      border-bottom: 1px solid #ccc;
  }
  .content {
      margin-top: 20px;
    .items {
      display: flex;

      .item {
        width: 320px;
        margin-left: 20px;
        margin-bottom: 30px;
        &:hover{
            opacity: 0.7;
            transition-delay: 0.1s

        }
        &:first-child {
          margin-left: 0;
        }
        .top {
          position: relative;
          .playCount {
              position: absolute;
              top: 0;
              right: 0;
              padding: 2px 10px;
              color: #fff;
              background: linear-gradient(to right, rgba(0, 0, 0, 0.1),rgba(0,0,0,.5));
          }
          .briefDesc {
              color: #fff;
              position: absolute;
              bottom: 10px;
              left: 10px;
          }
          img {
            width: 100%;
            height: 200px;
          }
        }
        .name {
            color: #000;
            font-size: 16px;
            line-height: 36px;
        }
        .artistName {
            color: #acacac
        }
      }
    }
  }
}
</style>
