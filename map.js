let tile = new Image()
tile.src = './img/tile.png'

class Map{
  constructor(){
    this.tileMap = []
    this.tile = { width: 32, height: 32 }
    this.grid = { width: 100, height: 100 }
    this.scrollPosition = {x: 0, y: 0 }
    this.dragHelper = { active: false, x: 0, y: 0 }
    this.zoomHelper = { level: 1, normal: 1, far: 0.50, close: 2 }
    this.buildHelper = { current: null}

    this.mouse = new Mouse()
    this.controls = new Controls()

    // Default zoom 
    this.tile.width *= this.zoomHelper.level
    this.tile.height *= this.zoomHelper.level

    // Center the map initially
    this.scrollPosition.x -= (this.grid.width * this.zoomHelper.level) + this.scrollPosition.x
    this.scrollPosition.y -= (this.grid.height * this.zoomHelper.level) + this.scrollPosition.y
  }

  pan(){
    if(this.controls.up){
      console.log("up")
      this.scrollPosition.y -= 20
      //this.scroll.y -= ((this.scroll.y - this.tile.height) >= 0) ? this.tile.height : 0
    }
    if(this.controls.left){
      this.scrollPosition.x += 20
      //this.scroll.x -= ((this.scroll.x - this.tile.width) >= 0) ? this.tile.width : 0;
    }

    if(this.controls.down){
      this.scrollPosition.y += 20
    }

    if(this.controls.right){
      this.scrollPosition.x -= 20
    }

    if(this.controls.plus){
      this.#zoomIn()
    }

    if(this.controls.minus){
      this.#zoomOut()
    }

    if(this.controls.rotate){
      this.#rotateGrid()
    }
  }

  mouse(){
    if(this.mouse.up){
      this.dragHelper.active = false
    }

    if(this.mouse.down){
      //do somthing
    }
  }

  #zoomIn(){
    switch(this.zoomHelper.level){
      case this.zoomHelper.normal: 
        this.zoomHelper.level = this.zoomHelper.close
        break
      case this.zoomHelper.far:
        this.zoomHelper.level = this.zoomHelper.normal
        break
      case this.zoomHelper.close:
        return
    }
  }  

  #zoomOut(){
    switch(this.zoomHelper.level){
      case this.zoomHelper.normal: 
        this.zoomHelper.level = this.zoomHelper.far
        break
      case this.zoomHelper.close:
        this.zoomHelper.level = this.zoomHelper.normal
        break
      case this.zoomHelper.far:
        return
    }

    //Center the view
    this.scrollPosition.x -= (this.grid.width * this.zoomHelper.level) + this.scrollPosition.x
    this.scrollPosition.y -= (this.grid.height * this.zoomHelper.level) + this.scrollPosition.y
  }
  
  #rotateGrid(mW, mH, sW, sH){
    // let m = []

    // mW = (mW === undefined) ? this.grid.width : mW
    // mH = (mH === undefined) ? this.grid.height : mH

    // sW = (sW === undefined) ? 0 :sW
    // sH = (sH === undefined) ? 0 :sH

    // for(let i = sW; i < mW; i++){
    //   for(let j = sH; j < mH; j++){
    //     let row = (mW - j) - 1

    //     if(this.tileMap[row] !== undefined && this.tileMap[row][i]){
    //       m[i] = (m[i] === undefined) ? [] : m[i]
    //       m[i][j] = this.tileMap[row][i]
    //     }
    //   }
    // }
    // this.tileMap = m
  }

  #translatePixelsToMatix(x, y){
    let tileHeight = this.tile.height * this.zoomHelper.level
    let tileWidth = this.tile.width * this.zoomHelper.level

    let gridOffsetY = (this.grid.height * this.zoomHelper.level) + this.scrollPosition.y
    let gridOffsetX = (this.grid.width * this.zoomHelper.level)

    // By deafult grid appears centered horz
    gridOffsetX += (canvas.width / 2) - ((tileWidth / 2) * this.zoomHelper.level) + this.scrollPosition.x

    let col = (2 * (y - gridOffsetY) - x + gridOffsetX) / 2
    let row = x + col - gridOffsetX - tileHeight

    col = Math.round(col / tileHeight)
    row = Math.round(row / tileWidth)

    return{
      row: row,
      col: col
    }

  }

  #drawSquare(tilePosX, tilePosY, row, col){
    ctx.beginPath()
    ctx.rect(tilePosX, tilePosY, this.tile.width, this.tile.height )  // x cord, y cord, width, height    
    ctx.strokeStyle = "red"
    ctx.fillStyle = ctx.isPointInPath(mouse.clientX, mouse.clientY) ? "yellow" : "transparent"
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.fill()
    ctx.font = 'bold 12px mono';
    ctx.fillStyle = "white"
    ctx.fillText( row + ":" + col, tilePosX + 4, tilePosY + 16)
  }

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

  #drawTile(tilePosX, tilePosY){
    ctx.drawImage(
      tile,
      Math.round(tilePosX),
      Math.round(tilePosY),
      tile.width,
      tile.height
    )
  }

  draw(){
    let pos_TL = this.#translatePixelsToMatix(1, 1)
    let pos_BL = this.#translatePixelsToMatix(1, canvas.height)
    let pos_TR = this.#translatePixelsToMatix(canvas.width, 1)
    let pos_BR = this.#translatePixelsToMatix(canvas.width, canvas.height)

    // let pos_TL = {row: 1, col: 1}
    // let pos_TR = {row: canvas.width, col: 1}
    // let pos_BR = {row: canvas.width, col: canvas.height} 
    // let pos_BL = {row: 1, col: canvas.height}

    let startRow = pos_TL.row
    let startCol = pos_TR.col
    let rowCount = pos_BR.row + 1
    let colCount = pos_BL.col + 1

    startRow = (startRow < 0) ? 0 : startRow
    startCol = (startCol < 0) ? 0 : startCol

    // Boundary
    rowCount = (rowCount > this.grid.width) ? this.grid.width : rowCount
    console.log(rowCount)
    colCount = (colCount > this.grid.height) ? this.grid.height : colCount
    console.log(colCount)

    let tileWidth = this.tile.width * this.zoomHelper.level
    let tileHeight = this.tile.height * this.zoomHelper.level

  for(let row = startRow; row < rowCount; row++){
    for(let col = startCol; col < colCount; col++){
    // for(let col = 0; col < 100; col++){
    //     for(let row = 0; row < 100; row++){
        
        // -------------- 1
        let tilePosX = (row - col) * tileHeight + (this.grid.width * this.zoomHelper.level) 
        tilePosX += (canvas.width / 2) - ((tileWidth / 2) * this.zoomHelper.level) + this.scrollPosition.x
        let tilePosY = (row + col) * tileHeight / 2 + (this.grid.height * this.zoomHelper.level) + this.scrollPosition.x

        // -------------- 2
        // let tilePosX = (row - col) * tileHeight + (this.grid.width * this.zoomHelper.level) 
        // tilePosX += (canvas.width / 2) - ((tileWidth / 2) * this.zoomHelper.level) + this.scrollPosition.x
        // let tilePosY = (row + col) * tileHeight / 2 + (this.grid.height * this.zoomHelper.level) + this.scrollPosition.x

        // -------------- 3
        // let tilePosX = this.tile.width * row * 1.2//(row - col) * this.tile.height
        // let tilePosY = this.tile.height * col * 1.2//(row + col) * (this.tile.height)

        // tilePosX -= this.scrollPosition.x
        // tilePosY -= this.scrollPosition.y
        // --------------
        this.#drawSquare(Math.round(tilePosX), Math.round(tilePosY), row, col)
      }
    }
  }
}

let map = new Map()






// draw(){
//   for(let col = 0; col < 10; col++){
//     for(let row = 0; row < 10; row++){
//       let tilePosX = this.tile.width * row * 1.2//(row - col) * this.tile.height
//       let tilePosY = this.tile.height * col * 1.2//(row + col) * (this.tile.height)

//       //Center the grid horizontally
//       tilePosX += (canvas.width / 2) - (5 * this.tile.width + (this.tile.width/2))

//       //Center the grid vertically
//       tilePosY += (canvas.height / 2) - (5 * this.tile.height + (this.tile.height/2))

//       //Draw each tile
//       this.#drawTile(tilePosX, tilePosY)
//     }
//   }
// }











// #drawTile(tilePosX, tilePosY){
//   ctx.drawImage(
//     tile,
//     Math.round(tilePosX),
//     Math.round(tilePosY),
//     tile.width,
//     tile.height
//   )
// }
// #rotateSquare(tilePosX, tilePosY){
//   ctx.save()
//   ctx.scale(1, 0.5)
//   ctx.rotate(45 * Math.PI / 180)
//   ctx.drawImage(
//     square,
//     Math.round(tilePosX),
//     Math.round(tilePosY),
//     square.width,
//     square.height
//   )
//   ctx.restore()
// }

// #drawHitBox(cartX, cartY, tilePosY){
//   console.log(tilePosY)
//   console.log(cartY)

//   ctx.setTransform(1, 0.5, -1, 0.5, tile.width / 2, 0)
//   ctx.beginPath()
//   ctx.rect(cartX, cartY * 2, tile.width / 2, tile.height )  // x cord, y cord, width, height    
//   ctx.strokeStyle = "red"
//   ctx.fillStyle = ctx.isPointInPath(mouse.clientX, mouse.clientY) ? "yellow" : "transparent"
//   ctx.lineWidth = 1
//   ctx.stroke()
//   ctx.fill()
//   ctx.setTransform(1, 0, 0, 1, 0, 0)
// }


// //console.log('tilePosX, tilePosY', tilePosX, tilePosY)
// //console.log('tile.width, tile.height', tile.width, tile.height)
// // ----

// //Calculate Cartesian
// let cartX = row * tile.width * .5 + canvas.width / 2
// let cartY = col * tile.height * .5 + tile.height / 2

// //Cartesian to isometric:
// let isoX = cartX - cartY;
// let isoY = (cartX + cartY) / 2;

// //console.log('cartX, cartY', cartX, cartY)

// //this.#drawHitBox(cartX, cartY, tilePosY)
// this.#rotateSquare(tilePosX, tilePosY)