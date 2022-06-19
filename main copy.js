const canvas = document.getElementById("canvas")
const context = canvas.getContext('2d')

canvas.height = 500
canvas.width = 500


const animate = () => {
  setTimeout(() => {
    requestAnimationFrame(animate)
    
    context.fillStyle = 'rgba(255, 255, 255)'
    context.fillRect(0, 0, canvas.width, canvas.height)

    player.update()
  }, 1000/60);
  
 
}

animate()