/*----------------------------------------------
  Player
----------------------------------------------*/
class Player{
  constructor(){
    this.x = 0, 
    this.y = 0,
    this.width = 80,
    this.height = 80,
    this.img = new Image()
    this.img.src = "./img/jump.png"

    this.controls = new Controls()
  }

  move(){
    if(this.controls.up){
      this.y -= 0.1;
    }
    if(this.controls.left){
      this.x -= 0.1
    }

    if(this.controls.down){
      this.y += 0.1
    }

    if(this.controls.right){
      this.x += 0.1
    }
  }

  // Get Poisiton of Player on the Map
  getPlayerPositionOnMap() {
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    // convert player to pixel pos
    let x = this.x * tile.width + this.width / 2
    let y = this.y * tile.height + this.height / 2
    
    // center on the canvas
    x -= canvas.width / 2
    y -= canvas.height / 2

    // apply x,y to mapPostion
    mapPosition.x = x
    mapPosition.y = y
    ctx.restore()
  }

  draw(){
    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height,
    )  
  }
}
