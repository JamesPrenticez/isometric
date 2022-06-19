const matrix = [
  [0,1,2,1,1,1],
  [1,0,0,0,0,2],
  [1,0,1,1,0,2],
  [1,0,1,1,0,2],
  [1,0,0,0,0,2],
  [1,1,1,0,1,2]
]

class Tile{
  constructor(x, y, width, height, type){
      this.x = x
      this.y = y
      this.width = width
      this.height = height
      this.matrix = matrix

      this.tileWidth = 34 //canvas.width / 6 / 1.1
      this.tileHeight = 37 //canvas.height / 6 / 1.1
      
      this.img = new Image()
      this.img.src = "./ground.png" // 204 width x 37 height / 6 columns = 34 
      this.frameX = 0
      this.frameY = 0 // doesnt change 

      // Grass
      if(type == 0){
        this.frameX = 0
      }
      
      // Water
      if(type == 1){
        this.frameX = 1
      }

      // Fire
      if(type == 2){
        this.frameX = 2
      }
  }
  #drawHitBox(isoX, isoY, i, j){
    //ctx.setTransform(1, 0.5, -1, 0.5, 160, 0)
    // ctx.beginPath()
    // ctx.rect(isoX, isoY, this.width, this.height)  // x cord, y cord, width, height    
    // ctx.strokeStyle = "red"
    // ctx.lineWidth = 2
    // ctx.stroke()
    ctx.font = 'bold 10px serif';
    ctx.fillStyle = "black"
    ctx.fillText( i + ":" + j, isoX + 10, isoY + 12)
  }

  #drawSprite(isoX, isoY){
    // Sprite
    let img = this.img
    //SOURCE aka shop up sprite sheet
    let sX = this.width * this.frameX
    let sY = this.height * this.frameY
    let sW = 32//this.width
    let sH = 37//this.height
    //DESTINATION aka locaiton on screen
    let dX = isoX
    let dY = isoY
    let dW = this.tileWidth
    let dH = this.tileHeight
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH)
  }

  draw(){
    // for (var i = 0; i < 5; i++) {
    //   for (var j = 0; j < 5; j++) {

    //loop through rows
    for(let i=0; i < this.matrix.length; i++){
      //loop through columns
      for(let j=0; j < this.matrix[i].length; j++){

        let cartX = j * this.tileWidth * .5 + canvas.width / 2
        let cartY = i * this.tileHeight * .5 + this.tileHeight / 2
        //console.log('i + cartX', i + " " + cartX)
    
        //Cartesian to isometric:
        let isoX = cartX - cartY;
        let isoY = (cartX + cartY) / 2;

        this.type = this.matrix[i][j]
        this.#drawSprite(isoX, isoY)
        this.#drawHitBox(isoX, isoY, i, j)        


      }
    }
  }
}

let tile = new Tile(100, 100, 32, 32)

//https://gamedev.stackexchange.com/questions/47388/best-technique-for-drawing-isometric-tiles

        // ctx.fillStyle = `rgb(
        //   ${Math.floor(255 - 42.5 * i)},
        //   ${Math.floor(255 - 42.5 * j)},
        //   0)`;
        // ctx.fillRect(j * 25, i * 25, 25, 25);



        
        // let cartX = j * this.tileWidth * .5 + canvas.width / 2
        // let cartY = i * this.tileHeight * .5 + this.tileHeight / 2
        // let tileType = this.matrix[i][j]
        
        //Cartesian to isometric:
        // let isoX = cartX - cartY;
        // let isoY = (cartX + cartY) / 2;