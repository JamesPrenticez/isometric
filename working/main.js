const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 480//document.body.clientWidth
canvas.height = 480//document.body.clientHeight

const animate = () => {
  //handleResize()

  //Clear canvas
  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.lineWidth  = 3
  ctx.strokeStyle = '#00FF00'
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
  //Draw
  map.draw()
  map.playerControls()
  map.displayHTML()
  //console.log(map)
  
  requestAnimationFrame(animate)
}

window.onload = () => {
  animate()
}
