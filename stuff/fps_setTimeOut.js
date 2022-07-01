let fpsArray = []
let fpsCount = 0
let stopAt = 10
let fps = 0
let startTime = 0

ctx.font = '20px _sans'

const drawFps = (timeStamp) => {
  let ts = Math.round(performance.now()/1000)

  if(timeStamp != ts){
    fps = fpsCount
    fpsCount = 0
    fpsArray.push(fps)
  } else{
    fpsCount++
  }

  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = '#FFFFFF'
  ctx.fillText("TS:" + timeStamp, 10, 20)
  ctx.fillText("FPS:" + fps, 10, 40)

  if(timeStamp <= (startTime + stopAt)){
    setTimeout(() => {
      drawFps(ts)
    }, 1);
  } else{
    showResults()
  }
}

const showResults = () => {
  let mean = 0
  let sum = 0

  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Sort the samples
  for(let i=0; i< fpsArray.length; i++){
    for(let j=fpsArray.length-1; j>i; j--){
      if(fpsArray[j-1]>fpsArray[j]){
        fpsArray[j-1] = fpsArray[j]
      }
    }
  }

  // Discard the first value, which is usually very low
  fpsArray = fpsArray.slice(1, fpsArray.length)

  for(let i=0; i<fpsArray.length; i++){
    sum = sum + fpsArray[i]
  }

  mean = sum/fpsArray.length

  ctx.fillStyle = '#000000'
  ctx.fillText("MIN:" + fpsArray[0], 10, 20)
  ctx.fillText("MAX:" + fpsArray[fpsArray.length-1], 10, 40)
  ctx.fillText("MEAN:" + (Math.round(mean*10)/10), 10, 60)
  
}

