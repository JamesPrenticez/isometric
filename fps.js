class Frame {
  constructor(currentSecond, frameCount, lastFrameTime){
      this.currentSecond = currentSecond
      this.frameCount = frameCount
      this.lastFrameTime = lastFrameTime
  }

    draw(framesLastSecond){
        context.font = 'bold 25px serif';
        context.fillStyle = "#ff0000"
        context.fillText("FPS: " + framesLastSecond, 10, 30)
    }
  
    setCurrentFrame(){
      let sec = Math.floor(Date.now()/1000)
      //console.log(sec != this.currentSecond)
      if(sec != this.currentSecond){
          this.currentSecond = sec
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