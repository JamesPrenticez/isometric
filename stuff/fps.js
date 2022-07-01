let lastFrameTime = 0
let currentFrameTime = Date.now()

class Frame{
  constructor(currentSecond, frameCount, lastFrameTime){
      this.currentSecond = currentSecond
      this.frameCount = frameCount
      this.lastFrameTime = lastFrameTime
  }

    draw(framesLastSecond){
        ctx.font = 'bold 25px serif';
        ctx.fillStyle = "#ff0000"
        ctx.fillText("FPS: " + framesLastSecond, 10, 30)
    }
  
    setCurrentFrame(){
      let now = Math.floor(Date.now()/1000)
      //console.log(sec != this.currentSecond)

      if(now != this.currentSecond){
          this.currentSecond = now
          this.framesLastSecond = this.frameCount
          this.frameCount = 1;
      } else {
          this.frameCount ++
      }
      lastFrameTime = currentFrameTime 
    }

    update(){
      this.setCurrentFrame()
      this.draw(this.framesLastSecond)
    }
}

let fps = new Frame(0, 0, lastFrameTime)