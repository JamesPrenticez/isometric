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

  // Get Poisiton of Player on the Map
  getPlayerPositionOnMap() {
    //
  }

  #draw(){
    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height,
    )  
  }
}
