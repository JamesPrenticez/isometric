class Sprite{
  constructor(src, width, height, offsetX, offsetY, frames, duration){
    this.src = src
    this.width = width
    this.height = height
    this.offsetX = offsetX
    this.offsetY = offsetY
    this.offsetY = offsetY
    this.frames = frames
    this.duration = duration

    this.spritesheet = null
    this.currentFrame = 0
    this.posX = 0
    this.posY = 0
    this.shown = true
    this.zoomLevel = 1
  }
  #setSpriteSheet(src){
    if(src instanceof Image){
      this.spritesheet = src
    } else{
      this.spritesheet = new Image()
      this.spritesheet.src = src
    }
  }

  #setPosition(x, y){
    this.posX = x
    this.posY = y
  }

  #setOffset(x, y){
    this.offsetX = x
    this.offsetY = y
  }

  #setFrames(fcount){
    this.currentFrame = 0
    this.frames = fcount
  }

  #setDuration(duration){
    this.duration = duration
  }

  #nextFrame(){
    if(this.duration > 0){
      let d = new Date()

      if(this.duration > 0 && this.frame > 0){
        this.ftime = d.getTime() + (this.duration / this.frame)
      } else{
        this.ftime = 0
      }

      this.offsetX = this.width * this.currentFrame

      if(this.currentFrame === (this.frames - 1)){
        this.currentFrame = 0
      } else{
        this.currentFrame++
      }
    }
  }

  #draw(ctx){
    if(this.shown){
      ctx.drawImage(
        this.spritesheet,
        this.offsetX,
        this.offsetY,
        this.width,
        this.height,
        this.posX,
        this.posY,
        this.width * this.zoomLevel,
        this.height * this.zoomLevel
      )
    }
  }

  animate(ctx, t){
    if(t.getMilliseconds() > this.time){
      this.#nextFrame()
    }
    this.#draw(ctx)
  }
}

let spritesheet = './img/sprite1.png'
let red = new Sprite(spritesheet, 60, 60, 0, 120, 5, 1666)