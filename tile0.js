class Tile{
  constructor(x, y, width, height, type){
      this.x = x
      this.y = y
      this.width = width
      this.height = height
      
      this.img = new Image()
      this.img.src = "./ground.png" // 204 width x 37 height / 6 columns = 34 
      this.frameX = 0
      this.frameY = 0 // doesnt change 

      // Grass
      if(type == 0){
        this.frameX = 0
      }
      
      // Water
      if(type == 1){
        this.frameX = 1
      }

      // Fire
      if(type == 2){
        this.frameX = 2
      }
  }
  drawTile(){
    // Sprite
    let img = this.img
    //SOURCE aka shop up sprite sheet
    let sX = this.width * this.frameX
    let sY = this.height * this.frameY
    let sW = this.width
    let sH = this.height
    //DESTINATION aka locaiton on screen
    let dX = this.x
    let dY = this.y
    let dW = this.width
    let dH = this.height
    context.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)

    // Hitbox
    ctx.beginPath()
    ctx.rect(this.x, this.y, this.width, this.height)    
    ctx.lineWidth = 5
    ctx.strokeStyle = "red"
    //context.fill()
    ctx.stroke()
  }
}

