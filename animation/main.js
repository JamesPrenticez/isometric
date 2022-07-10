/* ------------------------------------------------------
Canvas
------------------------------------------------------ */
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight

/* ------------------------------------------------------
Resize
------------------------------------------------------ */
window.addEventListener("resize", () => {
  canvas.height = window.innerHeight
  canvas.width = window.innerWidth
})
/* ------------------------------------------------------
Intansiate
------------------------------------------------------ */
let player = new Player()

/* ------------------------------------------------------
Animate
------------------------------------------------------ */
const animate = () => {
  //Clear canvas
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.lineWidth  = 3
  ctx.strokeStyle = '#00FF00'
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
  //Draw
  player.superUpdate()
  // setTimeout(() => {
    requestAnimationFrame(animate)
  // }, 1000/10);
}

window.onload = () => {
  animate()
}