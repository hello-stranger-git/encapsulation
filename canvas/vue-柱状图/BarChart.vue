<template>
  <div id="barDiv" style="width:100%;text-align: center;">
    <canvas
      id="priceBarChart"
      width="1600"
      height="460"
      style="margin-top:13px"
    ></canvas>
  </div>
</template>

<script>
import Bar from '@/components/bar.js'
export default {
  props: {},
  data() {
    return {}
  },
  mounted() {
    const bar = document.getElementById('priceBarChart')
    bar.width = document.getElementById('barDiv').clientWidth

    bar.height = document.getElementById('barDiv').clientHeight
    this.draw()
  },
  methods: {
    draw() {
      const bar = new Bar('priceBarChart')
      bar.setData({
        yMaxMark: 8000, // 第一条y轴最大的刻度
        yMaxMarkAverage: 1000, // 第一条y轴每个刻度显示大小

        yMaxMark1: 8000000, // 第二条y轴最大的刻度
        yMaxMarkAverage1: 1000000, // 第二条y轴每个刻度显示大小
        data2: [
          5000,
          4000,
          4500,
          0,
          5000,
          4000,
          5000,
          6000,
          5000,
          4000,
          5500,
          6000
        ], // 人数
        data1: [
          7000000,
          6000000,
          5000500,
          0,
          4000000,
          6000000,
          4500000,
          5000000,
          6000000,
          5000000,
          4000000,
          5500000
        ], // 销售额
        dashLine: [
          parseInt(7000000 / 5000),
          parseInt(6000000 / 4000),
          parseInt(5000500 / 4500),
          0,
          parseInt(4000000 / 5000),
          parseInt(6000000 / 4000),
          parseInt(4500000 / 5000),
          parseInt(5000000 / 6000),
          parseInt(6000000 / 5000),
          parseInt(5000000 / 4000),
          parseInt(4000000 / 5500),
          parseInt(5500000 / 6000)
        ],
        xShowLine: false,
        legend: [
          { color: '#E60012', title: '客单价', shape: 'line' },
          { color: '#56BE9B', title: '客流人数', shape: 'arc' },
          { color: '#F8C498', title: '销售额', shape: 'arc' }
        ],
        xLabel: [
          '11-16',
          '11-15',
          '11-14',
          '11-13',
          '11-12',
          '11-11',
          '11-10',
          '11-09',
          '11-08',
          '11-07',
          '11-06',
          '11-05'
        ]
        // otherLabel: [47, 47, 47, 47, 47, 47, 47]
      })
    }
  }
}
</script>

<style lang="less" scoped>
.priceBarChart {
  width: 100%;
}
</style>
