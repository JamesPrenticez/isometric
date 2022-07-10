/*----------------------------------------------
  Player
----------------------------------------------*/
class Player{
  constructor(tileMap){
    this.tileMap = tileMap
    this.x = 0,
    this.y = 0,
    this.width = 80,
    this.height = 80,
    this.img = new Image()
    this.img.src = "../img/jump.png"

    this.w = false
    this.a = false
    this.s = false
    this.d = false

    this.controls = new Controls("player")
    this.mouse = new Mouse("player")
  }

  superUpdate(){
   
    this.#mouse()
    this.#move()
    this.#draw()
  }

  #mouse(){
    let tileHovered = this.#translatePixelsToMatix(this.mouse.clientX, this.mouse.clientY)
    document.getElementById("mouseX").innerText = tileHovered.col + 1 // artificially add + 1 to account for zero indexing
    document.getElementById("mouseY").innerText = tileHovered.row + 1



    if(this.mouse.up){
      //console.log('Click')
      //this.dragHelper.active = false
    }
    
    if(this.mouse.down){
      //console.log('Click')
      //do somthing
    }
  }

  #translatePixelsToMatix(x, y){
    let screenTileNumber = {
      col: Math.max(Math.floor(x / tile.width), 0),
      row: Math.max(Math.floor(y / tile.height), 0)
    }
  
    let topLeftMapTileNumber = {
      startCol: Math.max(Math.floor(scrollPosition.x / tile.height), 0),
      startRow: Math.max(Math.floor(scrollPosition.y / tile.width), 0)
    }
  
    let tileHovered = {
      col: topLeftMapTileNumber.startCol + screenTileNumber.col,
      row: topLeftMapTileNumber.startRow + screenTileNumber.row
    }
  
    return tileHovered
  } 
  
  #move(){
    document.getElementById("standingX").innerText = Math.max(Math.floor(this.x / tile.width), 0) // artificially add + 1 to account for zero indexing 
    document.getElementById("standingY").innerText = Math.max(Math.floor(this.y / tile.height), 0)
 
    if(this.controls.w){
      this.y -= 1;
    }
    if(this.controls.a){
      this.x -= 1
    }

    if(this.controls.s){
      this.y += 1
    }

    if(this.controls.d){
      this.x += 1
    }
  }

  // Get Poisiton of Player on the Map
  getPlayerPositionOnMap() {
    //
  }

  #draw(){
    ctx.beginPath()
    ctx.rect(this.x - scrollPosition.x, this.y - scrollPosition.y, tile.width * 2 , tile.height * 2)  // x cord, y cord, width, height    
    ctx.strokeStyle = "red"
    ctx.fillStyle = "green"
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.fill()
    // ctx.drawImage(
    //   this.img,
    //   this.x - scrollPosition.x,
    //   this.y - scrollPosition.y,
    //   this.width,
    //   this.height,
    // )  
  }
}
