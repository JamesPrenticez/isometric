// let tile = new Image()
// tile.src = './img/tile.png'

class Map{
  constructor(){
    this.tileMap = []
    this.tile = { width: 32, height: 32 }
    this.grid = { rows: 25, cols: 25 }
    this.scroll = {x: 0, y: 0 }

    this.controls = new Controls()

    //document.getElementById('scrollX').innerText = this.scroll.x
    //document.getElementById('scrollX').innerText = this.scroll.y
  }

  #tile0(tilePosX, tilePosY){
    ctx.beginPath()
    ctx.rect(tilePosX, tilePosY, this.tile.width, this.tile.height )  // x cord, y cord, width, height    
    ctx.strokeStyle = "red"
    ctx.fillStyle = ctx.isPointInPath(mouse.clientX, mouse.clientY) ? "yellow" : "transparent"
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.fill()
  }

  #tile1(tilePosX, tilePosY){
    ctx.beginPath()
    ctx.rect(tilePosX, tilePosY, this.tile.width, this.tile.height )  // x cord, y cord, width, height    
    ctx.strokeStyle = "red"
    ctx.fillStyle = ctx.isPointInPath(mouse.clientX, mouse.clientY) ? "yellow" : "red"
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.fill()
  }

  pan(){
    if(this.controls.up){
      console.log('up')
      this.scroll.y -= ((this.scroll.y - this.tile.height) >= 0) ? this.tile.height : 0
    }
    if(this.controls.left){
      this.scroll.x -= ((this.scroll.x - this.tile.width) >= 0) ? this.tile.width : 0;
    }

    if(this.controls.down){
      this.scroll.y += this.tile.height
    }

    if(this.controls.right){
      this.scroll.x += this.tile.width
    }
  }

  initializeGrid(){
    console.log('initialzingGrid')
    for(let i = 0; i < this.grid.rows; i++){
      this.tileMap[i] = []
      for(let j = 0; j < this.grid.cols; j++){
        if((i % 2) == 0 && (j % 2) == 0){
          this.tileMap[i][j] = 0
        } else{
          this.tileMap[i][j] = 1
        }
      }
    }
  }

  draw(){
    let startRow = Math.floor(this.scroll.x / this.tile.width)
    let startCol = Math.floor(this.scroll.y / this.tile.height)
    let rowCount = startRow + Math.floor(canvas.width / this.tile.width) + 1
    let colCount = startCol + Math.floor(canvas.height / this.tile.height) + 1

    for(let row = startRow; row < rowCount; row++){
      for(let col = startCol; col < colCount; col++){
        let tilePosX = this.tile.width * row * 1.2
        let tilePosY = this.tile.height * col * 1.2

        tilePosX -= this.scroll.x
        tilePosY -= this.scroll.y

        this.#tile0(tilePosX, tilePosY)
        //console.log(tilePosX, tilePosY)
        // if(this.tileMap[row][col] == 0){
        // }
        // if(this.tileMap[row][col] == 1){
        //   this.#tile1(tilePosX. tilePosY)
        // }
      }
    }
  }
}

let map = new Map()
map.initializeGrid()





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