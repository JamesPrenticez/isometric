class Player{
  constructor(playerName, x, y, width, height, color) {
      this.playerName = playerName
      this.x = x
      this.y = y
      this.width = width
      this.height = height
      this.color = color

      this.velocity = {x: 0, y:0}
      this.speed = 0
      this.acceleration = 0.25
      this.maxSpeed = 4
      this.friction = .24 //half acceleration
      this.controls = new Controls()
  }
  #drawPlayer(){
      //Draw Blue Sphere Player Object
      context.beginPath()
      context.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)    
      context.fillStyle = this.color
      context.fill()
      //Draw Player Name
      context.font = 'bold 12px verdana';
      context.fillStyle = "white"
      context.fillText(this.playerName, this.x - this.width / 2, this.y + 3)
  }
  #movePlayer(){
    // Move up
    if(this.controls.up){
      this.velocity.y -= this.acceleration
    } else {
      this.velocity.y += this.friction
    }
    
    // Move down
    if(this.controls.down){
      this.velocity.y += this.acceleration
    } else {
      this.velocity.y -= this.friction
    }

    // Move left
    if(this.controls.left){
      this.velocity.x -= this.acceleration
    } else {
      this.velocity.x += this.friction
    }

    // Move right
    if(this.controls.right){
      this.velocity.x += this.acceleration
    } else {
      this.velocity.x -= this.friction
    }

    // Cap at max speed if moving up
    if(this.velocity.y <- this.maxSpeed ){
      this.velocity.y =- this.maxSpeed 
    }

    // Cap at max speed if moving down
    if(this.velocity.y > this.maxSpeed){
      this.velocity.y = this.maxSpeed
    }

    // Cap at max speed if moving left
    if(this.velocity.x <- this.maxSpeed ){
      this.velocity.x =- this.maxSpeed 
    }

    // Cap at max speed if moving right
    if(this.velocity.x > this.maxSpeed){
      this.velocity.x = this.maxSpeed
    }
    
    // Apply friction if moving up enabling stopping
    if(this.velocity.y > 0){
      this.velocity.y -= this.friction
    }
    
    // Apply friction if moving down enabling stopping
    if(this.velocity.y < 0){
      this.velocity.y += this.friction
    }
    
    // Apply friction if moving up enabling stopping
    if(this.velocity.x > 0){
      this.velocity.x -= this.friction
    }

    // Apply friction if moving right enabling stopping
    if(this.velocity.x < 0){
      this.velocity.x += this.friction
    }

    //fix slight movement bug if moving up
    if(Math.abs(this.velocity.y) < this.friction){
      this.velocity.y = 0
    }

    //fix slight movement bug if moving down
    if(Math.abs(this.velocity.y) <- this.friction){
      this.velocity.y = 0
    }

    //fix slight movement bug if moving left
    if(Math.abs(this.velocity.x) < this.friction){
      this.velocity.x = 0
    }

    //fix slight movement bug if moving down
    if(Math.abs(this.velocity.x) <- this.friction){
      this.velocity.x = 0
    }

    //update [x,y] postion based on velocity
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
  }
  
  update(){
    this.#drawPlayer()
    this.#movePlayer()
  }
}

let players = []

//Create New Player
function newPlayer(){
  let playerName = ""
  let width = 50
  let height = 50
  
  // Centre the player
  let x = canvas.width / 2 
  let y = canvas.height / 2 

  //Random Color
  let color = "black"
  //let randomHex = Math.floor(Math.random()*16777215).toString(16);
  //let color = "#" + randomHex;

  players.push(new Player(playerName, x, y, width, height, color))
}

newPlayer()
let player = players[0]