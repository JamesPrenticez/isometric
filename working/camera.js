class Camera{
  constructor(tile, grid, scrollPosition){
    this.tile = tile
    this.grid = grid
    this.scrollPosition = scrollPosition
    this.controls = new Controls("map")
  }

  pan(){
    if(this.controls.up){
      this.scrollPosition.y -= Math.floor(this.tile.height / 10)
    }
    if(this.controls.left){
      this.scrollPosition.x -= Math.floor(this.tile.width / 10)
    }

    if(this.controls.down){
      this.scrollPosition.y += Math.floor(this.tile.height / 10)
    }

    if(this.controls.right){
      this.scrollPosition.x += Math.floor(this.tile.width / 10)
    }

    // Display coords to HTML
    document.getElementById("scrollX").innerText = this.scrollPosition.x
    document.getElementById("scrollY").innerText = this.scrollPosition.y
  }
}