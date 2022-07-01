const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight

let state = {
  _current: 0,
  intro: 0,
  loading: 1,
  loading: 2
}

let fps = 0 
let timestamp = Math.round(performance.now() / 1000)

const animate = () => {
  //Clear canvas
  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  
  if(timeStamp != ts){
    fps = fpsCount
    fpsCount = 0
    fpsArray.push(fps)
  } else{
    fpsCount++
  }


  
  requestAnimationFrame(animate)
}

window.onload = () => {
  animate()
}
