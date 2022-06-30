console.log(timestamp)

const drawFps = () => {
  console.log('timestamp', timestamp)
  let now = Math.round(performance.now()/1000)
  let then = Math.round(performance.now()/1000) - now

  if(now != then){
    then = now

    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#FFFFFF'
    ctx.fillText('FPS:' + fps, 20, 20)

    fps = 0
  } else{
    fps++
  }
}
