const inputMatrix = [
  [1,1,1,1,1,1],
  [1,0,0,0,0,1],
  [1,0,3,3,0,1],
  [1,0,3,3,0,1],
  [1,0,0,0,0,1],
  [1,1,1,1,1,1]
]

class Map{
  constructor(matrix){
    this.matrix = matrix
    this.tileWidth = canvas.width / 6 / 1.1
    this.tileHeight = canvas.height / 6 / 1.1
  }
  drawMap(){
    //loop through rows
    for(let i=0; i < this.matrix.length; i++){
      //loop through columns
      for(let j=0; j < this.matrix[i].length; j++){
        let x = j * this.tileWidth * 1.1 + 4
        let y = i * this.tileHeight * 1.1 + 4
        let tileType = this.matrix[i][j]
        
        //Generate new tile and push to the tileList array
        let tile = new Tile(x, y, this.tileWidth, this.tileHeight, tileType)
        //console.log(tile)
        tile.drawTile()
      }
    }
  }
}

let map = new Map(inputMatrix)

//https://gamedevelopment.tutsplus.com/tutorials/creating-isometric-worlds-primer-for-game-developers-updated--cms-28392