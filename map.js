let tile = new Image()
tile.src = './img/tile.png'

class Map{
  constructor(){

  }

  #drawTile(tilePosX, tilePosY){
    ctx.drawImage(
      tile,
      Math.round(tilePosX),
      Math.round(tilePosY),
      tile.width,
      tile.height
    )
  }

  #drawHitBox(cartX, cartY, tilePosY){
    console.log(tilePosY)
    console.log(cartY)

    ctx.setTransform(1, 0.5, -1, 0.5, tile.width / 2, -(canvas.height / 2 + tile.height / 2))
    ctx.beginPath()
    ctx.rect(cartX, cartY * 2, tile.width / 2, tile.height )  // x cord, y cord, width, height    
    ctx.strokeStyle = "red"
    ctx.fillStyle = ctx.isPointInPath(mouse.clientX, mouse.clientY) ? "yellow" : "transparent"
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.fill()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
  }

  // //ctx.setTransform(1, 0.5, -0.5, 1, 0, 0)
  // ctx.setTransform(1, 0.5, -1, 0.5, this.tileWidth/2, 0.5)
  // //ctx.rotate(0 * Math.PI / 180)
  // ctx.beginPath()
  // ctx.rect(cartX, cartY, this.width / 2, this.height / 2)  // x cord, y cord, width, height    
  // ctx.strokeStyle = "black"
  // ctx.fillStyle = ctx.isPointInPath(mouse.clientX, mouse.clientY) ? "yellow" : "transparent"
  // ctx.lineWidth = 1
  // ctx.stroke()
  // ctx.fill()
  // ctx.setTransform(1, 0, 0, 1, 0, 0)

  draw(){
    for(let col = 0; col < 10; col++){
      for(let row = 0; row < 10; row++){
        let tilePosX = (row - col) * tile.height
        let tilePosY = (row + col) * (tile.height / 2)

        //Center the grid horizontally
        tilePosX += (canvas.width / 2) - (tile.width / 2)
        //tilePosY += (canvas.height / 2) - (tile.height / 2)

        //Draw each tile
        this.#drawTile(tilePosX, tilePosY)

        //console.log('tilePosX, tilePosY', tilePosX, tilePosY)
        //console.log('tile.width, tile.height', tile.width, tile.height)
        // ----

        //Calculate Cartesian
        let cartX = row * tile.width * .5 + canvas.width / 2
        let cartY = col * tile.height * .5 + tile.height / 2

        //Cartesian to isometric:
        let isoX = cartX - cartY;
        let isoY = (cartX + cartY) / 2;

        //console.log('cartX, cartY', cartX, cartY)

        this.#drawHitBox(cartX, cartY, tilePosY)
      }
    }
  }
}

let map = new Map()