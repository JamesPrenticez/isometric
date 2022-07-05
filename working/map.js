class Map{
  constructor(tileMap, tile, grid, scrollPosition){
    this.tileMap = tileMap
    this.tile = tile
    this.grid = grid
    this.scrollPosition = scrollPosition
    this.mouse = new Mouse()


  }

  superUpdate(){
    this.#draw()
  }

  #drawSquare(tilePosX, tilePosY, color){
    ctx.beginPath()
    ctx.rect(tilePosX, tilePosY, this.tile.width, this.tile.height )  // x cord, y cord, width, height    
    ctx.strokeStyle = "red"
    ctx.fillStyle = ctx.isPointInPath(this.mouse.clientX, this.mouse.clientY) ? "yellow" : color
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.fill()
  }

  #draw(){
    // get the number of tiles that will fit the canvas. Plus 1 to pre-render the next tile outside the screen
    const rowsThatFitOnScreen = this.grid.width < canvas.width / this.tile.width ? this.grid.width : canvas.width / this.tile.width + 1
    const colsThatFitOnScreen = this.grid.height < canvas.height / this.tile.height ? this.grid.height : canvas.height / this.tile.height + 1

    // get the top left row/col relative to the scrollPoistion   
    let startCol = Math.max(Math.floor(this.scrollPosition.x / this.tile.height), 0)
    let startRow = Math.max(Math.floor(this.scrollPosition.y / this.tile.width), 0)

    for(let row = startRow; row < startRow + rowsThatFitOnScreen; row++){
      for(let col = startCol; col <  startCol + colsThatFitOnScreen; col++){

        let tilePosX = this.tile.width * col 
        let tilePosY = this.tile.height * row 

        //Scroll
        tilePosX -= this.scrollPosition.x;
        tilePosY -= this.scrollPosition.y;

        // DisplayHTML
        document.getElementById("startRow").innerText = startRow
        document.getElementById("startCol").innerText = startCol

        // Control how much of the map you render out
        let tileIndex
        let controlX = this.grid.width //100
        let controlY = this.grid.height //100
        if(row < controlY && col < controlX){
          tileIndex = this.tileMap[row][col]
        } 

        if(tileIndex > 0.5){
          this.#drawSquare(tilePosX, tilePosY, "red")
        }
        if(tileIndex < 0.5){
          this.#drawSquare(tilePosX, tilePosY, "blue")
        }
      }
    }
   }
}



// Write cell coordinates in cell
// ctx.font = 'bold 12px mono';
// ctx.fillStyle = "yellow"
// ctx.fillText( "r" + row, tilePosX + 4, tilePosY + 16)
// ctx.fillStyle = "pink"
// ctx.fillText( "c" + col, tilePosX + 4, tilePosY + 30)

// #drawTile(tilePosX, tilePosY){
//   ctx.drawImage(
//     tile,
//     Math.round(tilePosX),
//     Math.round(tilePosY),
//     tile.width,
//     tile.height
//   )
// }

// #drawRotatedSquare(tilePosX, tilePosY, row, col){
//   //ctx.setTransform(1, 0.5, -0.5, 1, 0, 0)
//   //ctx.setTransform(1, 0.5, -1, 0.5, this.tile.width/2, 0)
//   //ctx.rotate(0 * Math.PI / 180)
//   ctx.beginPath()
//   ctx.rect(tilePosX, tilePosY, this.tile.width, this.tile.height)  // x cord, y cord, width, height    
//   ctx.strokeStyle = "red"
//   ctx.fillStyle = ctx.isPointInPath(mouse.clientX, mouse.clientY) ? "yellow" : "transparent"
//   ctx.lineWidth = 1
//   ctx.stroke()
//   ctx.fill()
//   ctx.font = 'bold 12px mono';
//   ctx.fillStyle = "white"
//   ctx.fillText( row + ":" + col, tilePosX + 4, tilePosY + 16)
//   ctx.setTransform(1, 0, 0, 1, 0, 0)
// }

// #rotateGrid(mW, mH, sW, sH){
//   if(this.controls.rotate){
//     this.#rotateGrid()
//   }
//   let m = []

//   mW = (mW === undefined) ? this.grid.width : mW
//   mH = (mH === undefined) ? this.grid.height : mH

//   sW = (sW === undefined) ? 0 :sW
//   sH = (sH === undefined) ? 0 :sH

//   for(let i = sW; i < mW; i++){
//     for(let j = sH; j < mH; j++){
//       let row = (mW - j) - 1

//       if(this.tileMap[row] !== undefined && this.tileMap[row][i]){
//         m[i] = (m[i] === undefined) ? [] : m[i]
//         m[i][j] = this.tileMap[row][i]
//       }
//     }
//   }
//   this.tileMap = m
// }