
export default class Bar {
  constructor(id) {
    this.id = id
    this.canvas = document.getElementById(id)
    this.ctx = this.canvas.getContext('2d')
    // 内边距
    this.cpadding = 50
    this.setRatio()
    this.yAxisH = this.canvas.height - this.cpadding * 2// y轴高度
    this.xAxisW = this.canvas.width - this.cpadding * 2// x轴高度
    this.originX = this.cpadding + 20 // x轴原点
    this.originY = this.yAxisH + this.cpadding// y轴原点
    this.data = []// 数据
  }
  init() {
    // 画坐标轴
    this.drawAxis()
    // 画标题
    this.drawLegend()
  }

  // 解决模糊
  setRatio() {
    const device = window.devicePixelRatio || 1
    const canDevice = this.ctx.backingStorePixelRatio || 1
    this.ratio = device / canDevice
    const oldW = this.canvas.width
    const oldH = this.canvas.height
    this.canvas.width = this.ratio * oldW
    this.canvas.height = this.ratio * oldH
    this.canvas.style.width = oldW + 'px'
    this.canvas.style.height = oldH + 'px'
  }

  drawLegend() {
    for (let i = 0; i < this.data.legend.length; i++) {
      this.ctx.beginPath()
      this.ctx.save()
      this.ctx.fillStyle = '#565656'
      this.ctx.textAlign = 'right'
      this.ctx.font = '16px MicrosoftYaHei'
      const x = this.xAxisW - i * 150 - this.data.legend[i].title.length * 10
      const y = this.cpadding
      // 画圆形
      if (this.data.legend[i].shape === 'arc') {
        this.ctx.save()
        this.ctx.fillStyle = this.data.legend[i].color
        this.ctx.arc(x, y - 10, 10, 0, 2 * Math.PI)
        this.ctx.fill()
        this.ctx.restore()
      }
      // 画线
      if (this.data.legend[i].shape === 'line') {
        this.ctx.save()
        this.ctx.setLineDash([5])
        this.ctx.fillStyle = this.data.legend[i].color
        this.drawLine(x - 20, y - 8, x + 10, y - 8)
        this.ctx.fill()
        this.ctx.restore()
      }
      // 画title
      this.ctx.fillText(this.data.legend[i].title, this.xAxisW + 40 - i * 150, y)
      this.ctx.restore()
      this.ctx.closePath()
    }
  }
  setData(data) {
    this.data = data
    this.xAxisNum = data.xLabel.length

    this.yAxisNum = Math.ceil(this.data.yMaxMark / this.data.yMaxMarkAverage) + 1// y轴段数,yMaxMark y轴最大刻度
    this.xAxisNum = 12 // x轴段数

    this.yAxisNum1 = Math.ceil(this.data.yMaxMark1 / this.data.yMaxMarkAverage1) + 1// y2轴段数,yMaxMark y2轴最大刻度
    this.init()
  }
  // 画横线
  drawLine(x, y, x2, y2) {
    this.ctx.beginPath()
    this.ctx.moveTo(x, y)
    this.ctx.lineTo(x2, y2)
    this.ctx.stroke()
    this.ctx.closePath()
  }
  drawMarker() {
    // 画y1轴刻度
    this.drawyAxis()
    // 画y2轴刻度
    this.drawyAxis2()
    // 画x轴刻度
    this.drawxAxis()
  }
  // 画y1轴
  drawyAxis() {
    const oneVal = this.yAxisH / this.yAxisNum// y轴每个刻度所占的高度
    // 画y轴label
    for (let i = 0; i < this.yAxisNum; i++) {
      this.ctx.save()
      this.ctx.fillStyle = '#141414'
      this.ctx.textAlign = 'right'
      this.ctx.font = '13px MicrosoftYaHei'
      this.ctx.fillText(i * this.data.yMaxMarkAverage, this.originX - 13, this.originY - i * oneVal + 5)
      this.ctx.restore()
      this.ctx.beginPath()
      this.ctx.save()
      if (i > 0) {
        this.ctx.setLineDash([10])
      }
      this.ctx.strokeStyle = '#E5E5E5'
      this.ctx.lineWidth = 1
      // 虚线
      // 画y轴虚线
      this.drawLine(this.originX, this.originY - i * oneVal, this.xAxisW + 50, this.originY - i * oneVal)
      this.ctx.restore()
      this.ctx.closePath()
    }
  }

  // 画y2轴
  drawyAxis2() {
    const oneVal = this.yAxisH / this.yAxisNum1// y轴每个刻度所占的高度
    // 画y轴label
    for (let i = 0; i < this.yAxisNum1; i++) {
      this.ctx.save()
      this.ctx.fillStyle = '#141414'
      this.ctx.textAlign = 'left'
      this.ctx.font = '13px MicrosoftYaHei'
      let price = 0
      if (i * this.data.yMaxMarkAverage1 >= 1000000) {
        price = i * this.data.yMaxMarkAverage1 / 10000 + 'w'
      } else {
        price = i * this.data.yMaxMarkAverage1
      }
      this.ctx.fillText(price, this.canvas.width - this.cpadding + 10, this.originY - i * oneVal + 5)
      this.ctx.restore()
      this.ctx.beginPath()
      this.ctx.save()
      this.ctx.restore()
      this.ctx.closePath()
    }
  }

  // 画x轴
  drawxAxis() {
    const oneVal = this.xAxisW / this.xAxisNum// x轴每个刻度所占的宽度

    // 画x轴label
    for (let i = 0; i < this.xAxisNum; i++) {
      this.ctx.save()
      this.ctx.fillStyle = '#141414'
      this.ctx.textBaseline = 'top'
      this.ctx.textAlign = 'left'
      this.ctx.font = '14px MicrosoftYaHei'
      this.ctx.fillText(this.data.xLabel[i], this.originX + i * oneVal + 25, this.originY + 10)
      this.ctx.restore()
      // 画x轴其他label
      // this.ctx.save()
      // this.ctx.fillStyle = '#141414'
      // this.ctx.textBaseline = 'top'
      // this.ctx.textAlign = 'center'
      // this.ctx.font = '14px MicrosoftYaHei'
      // this.ctx.fillText(this.data.otherLabel[i], this.originX + i * oneVal + 40, this.originY + 38)
      // this.ctx.restore()
    }
  }
  // 画柱状图
  drawBar() {
    const oneVal = this.xAxisW / this.xAxisNum
    const barW = 20
    // y轴的最大刻度
    const yMaxMark1 = this.data.yMaxMark1 + this.data.yMaxMarkAverage1
    // 画第一个柱状图(销售额)
    for (let i = 0; i < this.xAxisNum; i++) {
      const barH = this.data.data1[i] * this.yAxisH / yMaxMark1
      const x = this.originX + i * oneVal
      const y = this.originY - barH
      this.drawRect(x + 25, y, barW, barH, this.data.data1[i], 'money', '#f8c49880')
    }

    // y2轴的最大刻度
    const yMaxMark = this.data.yMaxMark + this.data.yMaxMarkAverage
    // 画第二个柱状图(客流)
    for (let i = 0; i < this.xAxisNum; i++) {
      const barH = this.data.data2[i] * this.yAxisH / yMaxMark
      const x = this.originX + i * oneVal
      const y = this.originY - barH
      this.drawRect(x + 25 + 20, y, barW, barH, this.data.data2[i], 'people', '#56be9b80')
    }

    // 画第三条虚线
    for (let i = 0; i < this.xAxisNum; i++) {
      if (this.data.dashLine[i]) {
        const barH1 = this.data.dashLine[i] * this.yAxisH / yMaxMark
        const x1 = this.originX + i * oneVal
        const y1 = this.originY - barH1
        const x2 = this.originX + i * oneVal + 25 + 60
        // 画虚线
        this.drawDashLine(x1, y1, x2, y1, '#E60012')
        this.ctx.beginPath()
        this.ctx.fillStyle = '#E60012'
        this.ctx.strokeStyle = '#E60012'
        this.ctx.textBaseline = 'bottom'
        this.ctx.textAlign = 'left'
        this.ctx.font = '14px MicrosoftYaHei'
        // 画虚线的数值
        this.ctx.fillText('￥' + this.data.dashLine[i], x1 + 20, y1 - 5)
        this.ctx.stroke()
        this.ctx.closePath()
      }
    }
  }
  // 画虚线
  drawDashLine(x, y, x2, y2, color) {
    this.ctx.beginPath()
    this.ctx.save()
    this.ctx.setLineDash([10])
    this.ctx.strokeStyle = color
    this.ctx.lineWidth = 1
    // 虚线
    // 画y轴虚线
    this.drawLine(x, y, x2, y2)
    this.ctx.restore()
    this.ctx.closePath()
  }
  // 画矩形
  drawRect(x, y, w, h, text, type, color) {
    text = text || ''
    this.ctx.beginPath()
    this.ctx.fillStyle = color
    this.ctx.strokeStyle = color

    this.ctx.fillRect(x, y, w, h)
    this.ctx.stroke()
    this.ctx.closePath()
    this.ctx.save()
    this.ctx.textBaseline = 'bottom'
    this.ctx.textAlign = 'left'
    this.ctx.font = '14px MicrosoftYaHei'
    // 画数值
    if (text) {
      if (text >= 1000000) {
        text = (text / 10000).toFixed(2) + 'w'
      }
      if (type === 'money') {
        this.ctx.fillStyle = '#F1835B'
        this.ctx.fillText('￥' + text, x - 30, y - 5)
      } else if (type === 'people') {
        this.ctx.fillStyle = '#18A274'
        this.ctx.fillText(text, x, y - 5)
      }
    }
    this.ctx.restore()
  }
  drawAxis() {
    // 画y轴
    if (this.data.xShowLine) {
      this.drawLine(this.originX, this.originY, this.originX, this.cpadding)
    }
    // 画x轴
    this.drawLine(this.originX, this.originY, this.xAxisW + 50, this.originY)
    // 画刻度
    this.drawMarker()
    // 画柱状图
    this.drawBar()
  }
}
