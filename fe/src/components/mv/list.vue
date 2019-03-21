<template>
  <div class="list">
    <div
      v-for="(item,index) of topMVData"
      :key="item.id"
      class="item"
    >
      <i class="index">
        <p>{{ index + 1 | index }}</p>
        <span
          v-if="index + 1 === item.lastRank"
          class="iconfont icon-hengxian"
        />
        <span
          v-if="index + 1 < item.lastRank"
          class="iconfont icon-jiantou-xia1 max"
        />
        <span
          v-if="index + 1 > item.lastRank"
          class="iconfont icon-jiantou-xia min"
        />
      </i>
      <div class="couver">
        <img
          :src="item.cover"
          alt=""
        >
        <p class="score">
          <span class="iconfont icon-hot1" />
          {{ item.score }}
        </p>
      </div>
      <div class="right">
        <p class="name omit-text">
          {{ item.name }}
        </p>
        <p class="artists">
          {{ item.artists | artists }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  data() {
    return {
      topMVData: [],
    }
  },
  created() {
    this.topMV()
  },
  methods: {
    async topMV() {
      const res = await this.$http.get('top/mv', {
        params: {
          limit: 50,
        },
      })
      this.topMVData = res.data.data
      console.log(this.topMVData)
    },
  },
}
</script>

<style lang="less" scoped>
  .list {
    display: flex;
    flex-wrap: wrap;
    padding-top: 30px;
    .item {
      display: flex;
      width: 50%;
      margin-bottom: 30px;

      &:hover {
        opacity: 0.7
      }
      .index {
        text-align: center;
        color: #a0a0a0;
        align-self: center;
        font-size: 20px;
        margin-right: 10px;
         p {
          height: 16px;
        }
        .iconfont {
          font-size: 12px;
        }
        .min {
          color:#00ff00;
        }
        .max {
          color:#ff0000
        }
      }
      .couver {
        position: relative;
        .score {
          position: absolute;
          top: 0;
          right: 0;
          color: #fff;
          padding: 2px 10px;
          font-size: 12px;

          background: linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,0.5))
        }
        img {
          width: 240px;
          height:130px;
        }
      }
      .right {
        margin-left: 10px;
        margin-top: 20px;
        .name {
          font-size: 14px;
          line-height: 28px;
          font-weight: bold;
          width: 200px;
        }
      }
    }
  }
</style>
