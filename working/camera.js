class Camera{
  constructor(grid){

    this.grid = grid

    this.controls = new Controls("map")
    this.mouse = new Mouse()
  }

  pan(){
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
      scrollPosition.x += Math.floor(tile.width / 10)
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

  mouse(){
    this.#translatePixelsToMatix()

    if(this.mouse.up){
      //console.log('Click')
      //this.dragHelper.active = false
    }

    if(this.mouse.down){
      //do somthing
    }
  }

  #translatePixelsToMatix(){
    let screenTileNumber = {
      col: Math.max(Math.floor(this.mouse.clientX / this.tile.width), 0),
      row: Math.max(Math.floor(this.mouse.clientY / this.tile.height), 0)
    }
  
    let topLeftMapTileNumber = {
      startCol: Math.max(Math.floor(this.scrollPosition.x / this.tile.height), 0),
      startRow: Math.max(Math.floor(this.scrollPosition.y / this.tile.width), 0)
    }
  
    let tileHovered = {
      col: topLeftMapTileNumber.startCol + screenTileNumber.col,
      row: topLeftMapTileNumber.startRow + screenTileNumber.row
    }
  
    document.getElementById("mouseX").innerText = tileHovered.col
    document.getElementById("mouseY").innerText = tileHovered.row
  
    return tileHovered
  }
}