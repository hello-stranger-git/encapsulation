<template>
  <div class="block">
    <div class="timeScale" ref="timeScale"></div>
    <!-- 时间轴左半边的遮罩层 -->
    <div class="mask"></div>
    <div class="hiddenScroll">
      <span class="timeSpan">{{ time }}</span>
      <div class="timeAxis" ref="timeAxis">
        <img :src="timeAxis" ref="img" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeAxis: require('@/assets/timeAxis.png'),
      time: ''
    }
  },
  mounted() {
    // 给滚动条注册监听事件
    window.addEventListener('scroll', this.handleScroll, true)
    this.handleScroll()
  },
  destroyed() {
    // 销毁scroll事件
    window.removeEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    // 时间轴滑动事件
    handleScroll() {
      // 获取指针到父级元素最左边的距离
      const timeScale = this.$refs.timeScale.offsetLeft - 2
      // 获取元素滚动的距离
      const timeAxisScroll = this.$refs.timeAxis.scrollLeft - 30
      // 获取时间轴的宽度
      // 时间轴划出去距离指针的距离,总共分钟数
      const timeWidth = timeScale + timeAxisScroll
      let hour = 0
      let minute = 0
      hour = parseInt(timeWidth / 60)
      minute = timeWidth + 3 - hour * 60
      if (timeWidth < 177) {
        // 在0点的左边
        hour = hour - 27
        if (hour < 0) {
          hour = 48 + hour
        }
      } else if (timeWidth >= 177 && timeWidth < 1618) {
        // 判断时间是否在0到24小时整轴上
        hour -= 3
      }
      // 具体小时
      hour = minute > 59 ? hour + 1 : hour
      if (hour === 24) {
        hour = 0
      }
      if (hour > 24) {
        hour -= 27
      }
      // 判段minute显示是否大于60
      minute = minute > 59 ? minute - 60 : minute

      // minute补零
      minute = minute > 9 ? minute : '0' + minute

      // hour补零
      hour = hour > 9 ? hour : '0' + hour

      // 平凑时间,并且进行补零
      this.time = `${hour}:${minute}`
    }
  }
}
</script>

<style lang="less" scoped>
.block {
  position: relative;
  //竖线
  .timeScale {
    position: absolute;
    height: 58px;
    background-color: #0000007d;
    right: 50%;
    border-right: 2px solid #3299ff;
  }
  .hiddenScroll {
    height: 58px;
    overflow: hidden;
    //时间轴图片div
    .timeAxis {
      overflow-y: auto;
      position: relative;
    }
  }
  .mask {
    position: absolute;
    pointer-events: none;
    width: calc(50% - 3px);
    height: 58px;
    background-color: #0000007d;
    right: 50%;
    border-right: 2px solid #3299ff;
    z-index: 1;
  }

  .timeSpan {
    width: 99px;
    height: 25px;
    background: #ffffff;
    box-shadow: 0px 0px 6px rgba(74, 146, 255, 0.36);
    opacity: 1;
    border-radius: 5px;

    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    position: absolute;
    color: #4a92ff;
    left: 50%;
    transform: translateX(-50%);
    top: -12px;
    font-size: 16px;
  }
}
</style>
