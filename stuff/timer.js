class Timer{
  constructor(){
    this.startTime = 0
    this.now = 0 
    this.fpsCount = 0,
    this.fps = 0,
  }

  #draw(ctx, timestamp){
    ctx.fillStyle = '#FFFFFF'
    ctx.fillText("TS:" + timeStamp, 10, 20)
    ctx.fillText("FPS:" + fps, 10, 40)
  }

  update(){
    this.now  = performance.now() / 1000
  }
}