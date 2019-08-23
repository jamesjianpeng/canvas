import "./index.css"

class Wave {
  constructor(data) {
    this.el = data.el
    this.size = {
      width: data.width,
      height: data.height
    }
    this.offsetX = data.offsetX || 50
    this.offsetY = data.offsetY || 50
    this.offsetTop = 50
    this.globalAlpha = data.globalAlpha
    this.waveDirect = data.waveDirect

    this.ctrlRangeMax = {
      max: 40,
      min: 30
    }
    this.ctrlRangeMin = {
      max: 20,
      min: 10
    }

    this.waveRange = 50
    this.waveRangeMin = 40
    this.waveRangeMax = 60

    if (!this.el || !this.el.getContext) {
      return
    }
    this.ctx = this.el.getContext('2d')

    this.initSize()
    this.setVertex()
    console.log(this.vertex)
    this.draw()

    setInterval(() => {
      this.offsetTop = this.getRandomNum(this.getRandomNum(this.ctrlRangeMax.max, this.ctrlRangeMax.min), this.getRandomNum(this.ctrlRangeMin.max, this.ctrlRangeMin.min))
      this.waveRange = this.getRandomNum(this.waveRangeMin, this.waveRangeMax)
      console.log(this.offsetTop)
      console.log(this.waveRange)
      this.draw()
    }, 180)
  }

  drawCtrl () {
    this.offsetTop = this.getRandomNum(this.getRandomNum(this.ctrlRangeMax.max, this.ctrlRangeMax.min), this.getRandomNum(this.ctrlRangeMin.max, this.ctrlRangeMin.min))
    this.waveRange = this.getRandomNum(this.waveRangeMin, this.waveRangeMax)
    console.log(this.offsetTop)
    console.log(this.waveRange)
    this.draw()
  }

  getRandomNum (max, min) {
    return Math.floor(Math.random() * (max - min) + min)
  }

  initSize () {
    this.el.width = this.size.width
    this.el.height = this.size.height
    console.log(this.el)
    document.body.appendChild(this.el)
    // window.onresize = () => {
    //     this.size = {
    //       width: window.innerWidth,
    //       height: window.innerHeight
    //     }
    //     this.initSize()
    //     this.setVertex()
    //     this.draw(this.offsetTop)
    // }
  }

  setVertex () {
    this.vertex = [
        {
          x: 0 + this.offsetX,
          y: 0 + this.offsetY
        },
        {
          x: this.size.width - this.offsetX,
          y: 0 + this.offsetY
        },
        {
          x: this.size.width - this.offsetX,
          y: this.size.height - this.offsetY
        },
        {
          x: 0 + this.offsetX,
          y: this.size.height - this.offsetY
        },
    ]
  }

  draw () {
    this.ctx.clearRect(0, 0, this.vertex[2].x + this.offsetX, this.vertex[2].y + this.offsetX)
    this.ctx.globalAlpha = this.globalAlpha
    const gr = this.ctx.createLinearGradient((this.vertex[2].x + this.offsetX) / 2, 0, (this.vertex[2].x + this.offsetX) / 2, this.vertex[2].y + this.offsetX) // 对角渐变必须保持为 0 终点 x 和终点 y 都为 不为0 ，但相等
    // let gr = ctx.createLinearGradient(startX, startY, endX, endY) // 水平渐变必须保持为 0
    gr.addColorStop(0, '#e3f2fd')
    gr.addColorStop(.03, '#bbdefb')
    gr.addColorStop(.09, '#64b5f6')
    gr.addColorStop(1, '#42a5f5')

    this.ctx.fillStyle = gr
    this.ctx.strokeStyle = gr
    this.ctx.lineWidth = 2
    console.log(this.ctx)
    //开始一个新的绘制路径
    this.ctx.beginPath();
    //定义直线的起点坐标为(10,10)
    this.ctx.moveTo(this.vertex[0].x, this.vertex[0].y)

    this.ctx.lineTo(this.vertex[3].x, this.vertex[3].y)

    this.ctx.lineTo(this.vertex[2].x, this.vertex[2].y)

    this.ctx.lineTo(this.vertex[1].x, this.vertex[1].y)

    const pointList = this.countCtrlPoint(this.vertex, this.offsetTop, this.waveRange)
    console.log(pointList)
    pointList.map(({ ctrlX, ctrlY, endX, endY }) => {
      this.ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY )
    })
    //沿着坐标点顺序的路径绘制直线
    this.ctx.stroke();
    this.ctx.fill();
    //关闭当前的绘制路径
    this.ctx.closePath();
  }

  countCtrlPoint (vertex, offsetTop, waveRange) {
    const differLength = this.vertex[1].x - this.vertex[0].x
    const commonOffset = offsetTop * 2
    const num = Math.round(differLength / commonOffset)
    const pointList = []
    const intCtrlPointX = vertex[1].x - offsetTop
    for (let i = 1; i <= num; i++) {
      const ctrlX = intCtrlPointX - commonOffset * (i - 1)
      const ctrlY = i % 2 && this.waveDirect === 1 ? vertex[1].y + this.getRandomNum(waveRange, waveRange - 20) : vertex[1].y - this.getRandomNum(waveRange, waveRange - 20)
      if (i === num) {
          const endX =  vertex[0].x
          const endY = vertex[0].y
          pointList.push({ ctrlX, vertex, ctrlY, endX, endY })
      } else {
          const endX =  vertex[1].x - commonOffset * i
          const endY = vertex[1].y
          pointList.push({ ctrlX, ctrlY, endX, endY })
      }
      // pointList.push(this.vertex[1].x - offsetTop * (i * 4), vertex[1].y - offsetTop, vertex[1].x - offsetTop * 2 * i,  vertex[1].y)
    }
    return pointList
  }
}

function createdStyle () {
  const css = document.createElement('style')
  css.innerHTML = `
    body, html { padding: 0; margin: 0; }
    canvas { position: absolute;top: 0;left: 0; }
    canvas:nth
  `
  document.body.appendChild(css)
}

function main () {
  createdStyle()
  new Wave({
    el: document.createElement('canvas'),
    width: window.innerWidth,
    height: window.innerHeight,
    globalAlpha: .1,
    waveDirect: 1,
  })
  new Wave({
    el: document.createElement('canvas'),
    width: window.innerWidth,
    height: window.innerHeight,
    globalAlpha: .3,
    waveDirect: 1,
  })
  // new Wave({
  //   el: document.createElement('canvas'),
  //   width: window.innerWidth,
  //   height: window.innerHeight,
  //   globalAlpha: .5,
  //   waveDirect: 2,
  // })
}

main()
