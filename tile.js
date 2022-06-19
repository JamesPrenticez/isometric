class Tile{
  constructor(x, y, width, height, type){
      this.x = x
      this.y = y
      this.width = width
      this.height = height
      
      // Walkable
      if(type == 0){
        this.color  = "green"
      }
      
      // Non-Walkable
      if(type == 1){
        this.color  = "red"
      }

      // Water
      if(type == 3){
        this.color  = "blue"
      }
  }
  drawTile(){
    context.beginPath()
    context.rect(this.x, this.y, this.width, this.height)    
    context.fillStyle = this.color
    context.fill()
  }
}

