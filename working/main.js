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
let tile = { width: 32, height: 32 }
let grid = { width: 250, height: 250 }
let scrollPosition = {x: 0, y: 0 }
/* ------------------------------------------------------
Instantiate Classes
------------------------------------------------------ */
let map = new Map(tile, grid, scrollPosition)
let camera = new Camera(tile, grid, scrollPosition)
map.initGrid()
let player1 = new Player()

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
