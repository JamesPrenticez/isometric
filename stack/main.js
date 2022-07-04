/*----------------------------------------------
  Canvas
----------------------------------------------*/
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = 400//document.body.clientWidth
canvas.height = 400//document.body.clientHeight

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
  ctx.fillStyle = 'red'
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