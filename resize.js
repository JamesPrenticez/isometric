const handleResize = () => {
  canvas.width = document.body.clientWidth
  canvas.height = document.body.clientHeight


}

window.addEventListener('resize', handleResize, false)