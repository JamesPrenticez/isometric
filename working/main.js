/* ------------------------------------------------------
Canvas
------------------------------------------------------ */
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 480//document.body.clientWidth
canvas.height = 480//document.body.clientHeight

/* ------------------------------------------------------
Global Variables
------------------------------------------------------ */
let tileMap = []
let tile = { width: 32, height: 32 }
let grid = { width: 250, height: 250 }
let scrollPosition = {x: 0, y: 0 }
let zoom = { level: 1 }


/* ------------------------------------------------------
Instantiate Classes
------------------------------------------------------ */
initGrid(tileMap, grid)
let map = new Map(tileMap, tile, grid, scrollPosition)
let camera = new Camera(tile, grid, scrollPosition)
let player1 = new Player(tileMap, scrollPosition)

/* ------------------------------------------------------
Animate
------------------------------------------------------ */
const animate = () => {
  //handleResize()

  //Clear canvas
  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.lineWidth  = 3
  ctx.strokeStyle = '#00FF00'
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
  //Draw
  camera.pan()
  map.superUpdate()
  player1.superUpdate()
  
  requestAnimationFrame(animate)
}

window.onload = () => {
  animate()
}