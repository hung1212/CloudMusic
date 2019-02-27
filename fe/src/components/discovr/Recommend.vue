<template>
  <div class="box">
    <!-- <swiperLrc /> -->
    <nominate />
    <div
      v-for="(item,index) of rankView"
      :key="index"
    >
      <personalized v-if="item === '推荐歌单'" />
      <privatecontent v-if="item === '独家发送'" />
      <newsong v-if="item === '最新音乐'" />
      <MV v-if="item === '推荐MV'" />
      <djprogram v-if="item === '主播电台'" />
    </div>
    <div class="rank-list">
      <p>现在可以根据个人喜好,自由调整首页栏目顺序啦~</p>
      <div
        class="rank"
        @click="rankShow"
      >
        调整栏目顺序
      </div>
      <div
        v-if="orderBox"
        ref="orderBox"
        class="mask"
      >
        <div
          class="order-box"
        >
          <div class="title">
            <div class="left">
              调整栏目顺序
            </div>
            <div
              class="right"
              @click="rankShow"
            >
              <span
                class="iconfont icon-guanbi-copy"
              />
            </div>
          </div>
          <div class="content">
            <p class="hint">
              <span class="iconfont icon-tishi" />
              想调整首页栏目的顺序?按往右边的按钮拖动即可
            </p>
            <div
              class="order-list"
              @dragstart="dragstart($event)"
              @dragover="dragover($event)"
              @dragend="dragend()"
            >
              <div
                v-for="(item,index) of rankModel"
                :key="index"
                class="item"
                draggable="true"
              >
                <p>{{ item }}</p>
                <span class="iconfont icon--liebiao" />
              </div>
            </div>
            <div
              class="default"
              @click="defaultRankListEvent"
            >
              恢复默认排序
            </div>
            <div
              class="confirm"
              @click="confirm"
            >
              确定
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import swiperLrc from './recommend/swiper.vue'
import nominate from './recommend/nominate.vue'
import personalized from './recommend/personalized.vue'
import privatecontent from './recommend/privatecontent.vue'
import newsong from './recommend/newsong.vue'
import MV from './recommend/mv.vue'
import djprogram from './recommend/djprogram.vue'

export default {
  name: 'Recommend',
  components: {
    // swiperLrc,
    nominate,
    personalized,
    privatecontent,
    newsong,
    MV,
    djprogram,
  },
  data() {
    const defaultRankList = ['推荐歌单', '独家发送', '最新音乐', '推荐MV', '主播电台']
    const recommend = localStorage.getItem('recommend')
    const rankView = recommend ? JSON.parse(recommend) : defaultRankList
    const rankModel = rankView
    return {
      defaultRankList,
      rankView,
      rankModel,
      orderBox: false,
      draging: null,
    }
  },
  methods: {
    rankShow() {
      this.orderBox = !this.orderBox
    },
    dragstart(e) {
      this.draging = e.target
      this.draging.classList.add('drag')
    },
    dragover(e) {
      e.preventDefault()
      let target = e.target
      while (target) {
        if (!target.classList) return
        const flag = target.classList.contains('item')
        if (flag && this.draging !== target) {
          if (this.index(this.draging) < this.index(target)) {
            this.index(target)
            target.parentNode.insertBefore(this.draging, target.nextSibling)
          } else {
            target.parentNode.insertBefore(this.draging, target)
          }
          return
        }
        target = target.parentNode
      }
    },
    dragend() {
      this.draging.classList.remove('drag')
    },
    index(el) {
      let index = 0
      if (!el || !el.parentNode) {
        return -1
      }
      while (el && (el = el.previousElementSibling)) {
        index += 1
      }
      return index
    },
    defaultRankListEvent() {
      this.rankModel = this.defaultRankList
    },
    confirm() {
      const arr = document.querySelectorAll('.order-list .item > p')
      const newArr = []
      arr.forEach((element) => {
        newArr.push(element.innerText)
      })
      this.rankModel = newArr
      this.rankView = newArr
      localStorage.setItem('recommend', JSON.stringify(this.rankView))
      this.orderBox = !this.orderBox
    },
  },
}
</script>

<style lang="less" scoped>
.rank-list {
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .rank {
      color: #df3b3b;
      border: 1px solid #df3b3b;
      padding: 10px 20px;
      margin: 30px 0 50px 0;
      &:hover {
        background: #df3b3b;
        color: #fff;
      }
    }
    .mask {
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0,.5);
      position: fixed;
      top:0;
      left:0;
      .order-box {
        box-shadow: 0 0 1px #000;
        border: 1px solid #000;
        width: 350px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: #000;
        background: #fff;
        .title {
          font-size: 16px;
          line-height: 40px;
          padding-left: 20px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #e8e8ea;
        }
        .content {
          .hint {
            color: #999999;
            margin: 10px 0;
          }
          .order-list {
            .item {
              padding: 0 30px;
              display: flex;
              justify-content: space-between;
              border-bottom: 1px solid #f4f4f5;
              line-height: 50px;
              font-size: 16px;
              &.drag {
                background : #f2f2f3;
                border : 1px solid #000;
                box-shadow : 0 0 1px 1px #000;
              }
              .iconfont {
                color: #999999;
              }
            }
          }
          .default {
            line-height: 60px;
            color: #999999;
            border-bottom: 1px solid #f4f4f5;
          }
          .confirm {
            background: #bc2f2d;
            color: #fff;
            width: 100px;
            font-size: 16px;
            line-height: 30px;
            margin:  20px auto;
          }
        }
      }
    }
  }
</style>
