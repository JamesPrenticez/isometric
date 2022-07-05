/*----------------------------------------------
  Player
----------------------------------------------*/
class Player{
  constructor(tileMap, scrollPosition){
    this.tileMap = tileMap
    this.scrollPosition = scrollPosition
    this.x = 250 - 40
    this.y = 250 - 40
    this.width = 80,
    this.height = 80,
    this.img = new Image()
    this.img.src = "../img/jump.png"

    this.w = false
    this.a = false
    this.s = false
    this.d = false

    this.controls = new Controls("player")
  }

  superUpdate(){
    this.#move()
    this.#draw()
  }

  // Get Poisiton of Player on the Map
  getPlayerPositionOnMap() {
    //
  }

  #updatePosition(){
    //this.x = this.x += 50
    //console.log('this.x', this.x)
  }

  #move(){

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

  #draw(){
    ctx.drawImage(
      this.img,
      this.x - this.scrollPosition.x,
      this.y - this.scrollPosition.y,
      this.width,
      this.height,
    )  
  }
}
