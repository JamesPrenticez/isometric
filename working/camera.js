class Camera{
  constructor(){
    this.controls = new Controls("camera")
    this.mouse = new Mouse("camera")
  }

  pan(playerX, playerY){
    if(this.controls.up){
      scrollPosition.y -= Math.floor(tile.height / 10)
    }
    if(this.controls.left){
      scrollPosition.x -= Math.floor(tile.width / 10)
    }

    if(this.controls.down){
      scrollPosition.y += Math.floor(tile.height / 10)
    }

    if(this.controls.right){
      console.log("right..") 
      scrollPosition.x += Math.floor(tile.width / 10)
    }

    if(this.controls.space){
      scrollPosition.x = playerX - (canvas.width / 2 - 40)
      scrollPosition.y = playerY - (canvas.height / 2 - 40)
      console.log(playerX, playerY) 
    }

    // Display coords to HTML
    document.getElementById("scrollX").innerText = scrollPosition.x
    document.getElementById("scrollY").innerText = scrollPosition.y
  }

  #zoomIn(){
    if(this.controls.plus){
      this.zoom.level = 2
      this.tile.width = 32 
      this.tile.height = 32
      // recentre
      // this.scrollPosition.x = this.mouse.x
      // this.scrollPosition.y = this.mouse.y
    }
  }

  #zoomOut(){
    if(this.controls.minus){
      this.zoom.level = 1
      this.tile.width = 16 
      this.tile.height = 16
      // recentre
      //this.scrollPosition.x = 0 
      //this.scrollPosition.y = 0
    } 
  }


}