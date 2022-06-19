const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d')

canvas.height = 500
canvas.width = 500


const animate = () => {
  setTimeout(() => {
    requestAnimationFrame(animate)
    
    ctx.fillStyle = 'rgba(255, 255, 255)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    player.update()
  }, 1000/60);
  
 
}

animate()