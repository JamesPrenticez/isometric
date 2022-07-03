
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
const imgDir = "./img1/"
const imagesToLoad = [
  {name: 'grass.jpeg', mapIndex: 0},
  {name: 'sand.jpeg', mapIndex: 1},
  {name: 'water.png', mapIndex: 2},
]
const loadedMapImages = []

const loadMapImages = (images, imageArray = loadedMapImages) => {
  images.forEach(image => {
    const img = imageArray[image.mapIndex] = new Image();
    img.src = imgDir + image.name
  })
}

/*----------------------------------------------
  Map
  https://stackoverflow.com/questions/48710562/draw-tilemap-only-on-visible-canvas-area-optimization
----------------------------------------------*/
const typeMap = [
  "3333333333333333333333",
  "3000000000000000000003",
  "3000111000000011100003",
  "3011110000101111000013",
  "3010011100001001110003",
  "3000000000000000000003",
  "3000111000000011100003",
  "3011110000101111000013",
  "3010011100001001110003",
  "3000000000000000000003",
  "3000111000000011100003",
  "3011110000101111000013",
  "3010011100001001110003",
  "3000011000000001100003",
  "3333333333333333333333",
]

class Map{
  constructor(){
    this.tileMap = testMap
  }
  
  //Step 1 - Create an array of strings
  buildTypeMap(cols = 22, rows = 15){
    let myArray = []
    for(let i = 0; i < rows; i++) {
      myArray[i] = ""
      for (let j = 0; j < cols; j++) {
          myArray[i] += `${Math.floor(Math.random() * 2)}`
        }
      }
    return myArray
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




  drawMap(){
    //
  }
}


/*----------------------------------------------
  Player
----------------------------------------------*/
  class Player{
    constructor(){
      this.x = canvas.width / 2, // center 
      this.y = canvas.height / 2,
      this.width = 80,
      this.height = 80,
      this.img = new Image()
      this.img.src = "./img/jump.png"

      this.controls = new Controls()
      console.log('this.image', this.img)
    }

    move(){
      if(this.controls.up){
        this.y -= 1;
      }
      if(this.controls.left){
        this.x -= 1
      }
  
      if(this.controls.down){
        this.y += 1
      }
  
      if(this.controls.right){
        this.x += 1
      }
    }

    draw(){
      ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.width,
        this.height
        // this.x * tileWidth - this.width / 2,
        // this.y * tileHeight - this.height / 2
      )  
    }
}

/*----------------------------------------------
 Animate
----------------------------------------------*/
let gielinor = new Map()
let player1 = new Player()

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
  
  // getMapPosition()
  // drawMap(currentMap);
  player1.move()
  player1.draw()
  
  requestAnimationFrame(animate)
}

/*----------------------------------------------
  Run the Game
----------------------------------------------*/
window.onload = () => {
  window.focus()
  loadMapImages(imagesToLoad, )
  animate()
}