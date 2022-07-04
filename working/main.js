/* ------------------------------------------------------
Canvas
------------------------------------------------------ */
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 480//document.body.clientWidth
canvas.height = 480//document.body.clientHeight

/* ------------------------------------------------------
Instantiate Classes
------------------------------------------------------ */
let map = new Map()
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
  map.superUpdate()
  player1.superUpdate()
  
  requestAnimationFrame(animate)
}

window.onload = () => {
  animate()
}
