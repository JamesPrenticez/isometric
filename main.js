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
let timestamp = Math.round(performance.now()/1000)


const animate = () => {
    requestAnimationFrame(animate)
    let ts = Math.round(performance.now()/1000)

    if(ts != timestamp){
      handleResize()
      
      timestamp = ts
      //Clear canvas
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      showIntro()

      ctx.font = '20px _sans'
      ctx.fillStyle = '#FF0000'
      ctx.fillText('FPS:' + fps, 10, 20)

      fps = 0
    } else{
      fps++
    }
}

window.onload = () => {
  animate()
}
