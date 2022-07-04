
/*----------------------------------------------
  Canvas
----------------------------------------------*/
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = 500//document.body.clientWidth
canvas.height = 500//document.body.clientHeight

/*----------------------------------------------
  Load Images - ONLY ONCE!
----------------------------------------------*/
const imgDir = "./img32/"
const imagesToLoad = [
  {name: 'grass.jpeg', mapIndex: 0},
  {name: 'sand.jpeg', mapIndex: 1},
  {name: 'water.png', mapIndex: 2},
]
const loadedTileImages = []

const loadMapImages = (images, imageArray = loadedTileImages) => {
  images.forEach(image => {
    const img = imageArray[image.mapIndex] = new Image();
    img.src = imgDir + image.name
  })
}

/*----------------------------------------------
  Map
  https://stackoverflow.com/questions/48710562/draw-tilemap-only-on-visible-canvas-area-optimization
----------------------------------------------*/
const tile = {width: 80, height: 80}
const mapPosition = {x: 0, y: 0}

// Step 1 - Create this
// const typeMap = [
//   "3333333333333333333333",
//   "3000000000000000000003",
//   "3000111000000011100003",
//   "3011110000101111000013",
//   "3010011100001001110003",
//   "3000000000000000000003",
//   "3000111000000011100003",
//   "3011110000101111000013",
//   "3010011100001001110003",
//   "3000000000000000000003",
//   "3000111000000011100003",
//   "3011110000101111000013",
//   "3010011100001001110003",
//   "3000011000000001100003",
//   "3333333333333333333333",
// ]

// Step 2 - Create this
// this.mapExample = {
//   width: 22,
//   height: 15,
//   array: [1,2,3, etc]
// }

class Map{
  constructor(){
    this.map = {}
  }
  
  //Step 1 - Create an array of strings
  buildTypeMap(cols = 22, rows = 15){
    let typeMapArray = []
    for(let i = 0; i < rows; i++) {
      typeMapArray[i] = ""
      for (let j = 0; j < cols; j++) {
        typeMapArray[i] += `${Math.floor(Math.random() * 2)}`
        }
      }
    return typeMapArray
  }

  //Step 2 - Convert that map into a usable object
  createTileMap(map) {
    const newMap = {}
    newMap.width = map[0].length
    newMap.height = map.length
    newMap.array = new Uint8Array(newMap.width * newMap.height)
    var index = 0
    for (const row of map) {
      var i = 0
      while (i < row.length) {
        newMap.array[index++] = Number(row[i++])
      }
    }
    return newMap
  }

  draw(){
    let width = this.map.width
    let array  = this.map.array

    // Get top left
    let topLeft = {
      x: mapPosition.x / tile.width | 0, 
      y: mapPosition.y / tile.height | 0
    }

    // Get tiles that can fit in canvas
    let fitInScreen = {
      width: (canvas.width / tile.width | 0),
      height: (canvas.height / tile.height | 0),
    }

    // From here on you draw all the game items relative to the map not the canvas
    ctx.setTransform(1, 0, 0, 1, -mapPosition.x | 0, -mapPosition.y | 0)

    // Draw Tiles. If tile position is off map then draw black tiles..
    for(let row = 0; row < fitInScreen.height; row += 1){
      for(let col = 0; col < fitInScreen.width; col += 1){
        
        // Get tile position
        let tilePosX = topLeft.x + col
        let tilePosY = topLeft.y + row

        // Lookup tilePos on the map 
        let tileIndex

        // Draw a black tile if off map
        if(tilePosX < 0 || tilePosX >= this.map.width){
          tileIndex = 2 
        } 
        // Otherwise lookup the value on the tile map (protect against undefined)
        else{
          let i = tilePosX + tilePosY * this.map.width // cray cray maths
          tileIndex = this.map.array[i] === undefined ? 2 : this.map.array[i]
        }

        //Draw the corresponding tile
        ctx.drawImage(
          loadedTileImages[tileIndex], //src
          tilePosX * tile.width,
          tilePosY * tile.height,
          tile.width,
          tile.height
        )
      }
    }
  }
}

/*----------------------------------------------
  Player
----------------------------------------------*/
  class Player{
    constructor(){
      this.x = 0, 
      this.y = 0,
      this.width = 80,
      this.height = 80,
      this.img = new Image()
      this.img.src = "./img/jump.png"

      this.controls = new Controls()
    }

    move(){
      if(this.controls.up){
        this.y -= 0.1;
      }
      if(this.controls.left){
        this.x -= 0.1
      }
  
      if(this.controls.down){
        this.y += 0.1
      }
  
      if(this.controls.right){
        this.x += 0.1
      }
    }

    // Get Poisiton of Player on the Map
    getPlayerPositionOnMap() {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      // convert player to pixel pos
      let x = this.x * tile.width + this.width / 2
      let y = this.y * tile.height + this.height / 2
      
      // center on the canvas
      x -= canvas.width / 2
      y -= canvas.height / 2

      // apply x,y to mapPostion
      mapPosition.x = x
      mapPosition.y = y
      ctx.restore()
    }

    draw(){
      ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.width,
        this.height,
        // this.x * tile.width - this.width / 2,
        // this.y * tile.height - this.height / 2
      )  
    }
}

/*----------------------------------------------
  Instantiate and generate a new map
----------------------------------------------*/
let gielinor = new Map()
let player1 = new Player()

let newTypeMap = gielinor.buildTypeMap() // generates a new random map
gielinor.map = gielinor.createTileMap(newTypeMap) // converts type map into usable object

/*----------------------------------------------
 Animate
----------------------------------------------*/
function animate(){
  //Default scaling is 1
  ctx.setTransform(1,0,0,1,0,0) 

  //Clear canvas
  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.lineWidth  = 3
  ctx.strokeStyle = '#00FF00'
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
  // wdf ? Make sure the player stays on the mapo
  // if(player.x < 2){ player.x = 2 }
  // if(player.y < 2){ player.y = 2 }
  // if(player.x >= currentMap.width-2){ player.x = currentMap.width-2}
  // if(player.y >= currentMap.height-2){ player.y = currentMap.height-2}
  
  player1.getPlayerPositionOnMap()
  // drawMap(currentMap);
  player1.move()
  player1.draw()
  gielinor.draw()

  
  requestAnimationFrame(animate)
}

/*----------------------------------------------
  Run the Game
----------------------------------------------*/
window.onload = () => {
  window.focus()
  loadMapImages(imagesToLoad)
  animate()
}