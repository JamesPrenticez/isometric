const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d')

canvas.height = 500
canvas.width = 500


const animate = () => {
  setTimeout(() => {
    requestAnimationFrame(animate)
    
    //clear canvas
    ctx.fillStyle = 'rgba(255, 255, 255)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    //scale the image by 2x
    //ctx.setTransform(2, 0, 0, 2, -canvas.width / 2, -canvas.height / 4) // hoz scale, vert skew, hoz skew, vert scale, hoz trans, vert trans

    //draw
    map.update()
    
  }, 1000/60);
  
 
}

animate()

//https://cantwell-tom.medium.com/isometric-maze-on-html-canvas-c560afb8430a
//https://gist.github.com/jordwest/8a12196436ebcf8df98a2745251915b5
//http://www.gotoandplay.it/_articles/2004/02/tonypa_p03.php?PHPSESSID=39d874fcb57ee160497d76a1f0d15874