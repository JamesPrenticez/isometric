// Cartesian = normal x,y grid
// Isometric = 45 degrees to the right 30 degrees foward

const inputMatrix = [
  [0,1,2,1,1,1],
  [1,0,0,0,0,2],
  [1,0,1,1,0,2],
  [1,0,1,1,0,2],
  [1,0,0,0,0,2],
  [1,1,1,0,1,2]
]

class Map{
  constructor(matrix){
    this.matrix = matrix
    this.tileWidth = 34 //canvas.width / 6 / 1.1
    this.tileHeight = 37 //canvas.height / 6 / 1.1
  }
  drawMap(){
    //loop through rows
    for(let i=0; i < this.matrix.length; i++){

      //loop through columns
      for(let j=0; j < this.matrix[i].length; j++){
        let cartX = j * this.tileWidth * .5 + canvas.width / 2
        let cartY = i * this.tileHeight * .5 + this.tileHeight / 2
        let tileType = this.matrix[i][j]
        
        //Cartesian to isometric:
        let isoX = cartX - cartY;
        let isoY = (cartX + cartY) / 2;

        // Place Tile

        //Generate new tile and push to the tileList array
        let tile = new Tile(isoX, isoY, this.tileWidth, this.tileHeight, tileType)
        //console.log(tile)
        tile.drawTile()
      }
    }
  }
}

let map = new Map(inputMatrix)

//https://gamedevelopment.tutsplus.com/tutorials/creating-isometric-worlds-primer-for-game-developers-updated--cms-28392