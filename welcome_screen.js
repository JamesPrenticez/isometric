let logoImg = new Image()
logoImg.src = './img/logo.png'

const showIntro = () => {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)

  // Background
  let gradient = ctx.createLinearGradient(0, canvas.height, canvas.width, 0)
  gradient.addColorStop(0, '#ceefff')
  gradient.addColorStop(1, '#52bcff')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.lineWidth  = 3
  ctx.strokeStyle = '#00008B'
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
  // Logo
  // declared globally becasue this shit is retarded as fuck
  let originalWidth = logoImg.width

  // Compute new width to 50% and maintain aspect ratio
  logoImg.width = Math.round((50 * document.body.clientWidth) / 100)
  logoImg.height = Math.round((logoImg.width * logoImg.height) / originalWidth)
  
  // Create utility object for logo
  let logo = {
    img: logoImg,
    x: (canvas.width/2) - (logoImg.width/2),
    y: (canvas.height/2) - (logoImg.height/2)
  }

  // Preset the logo image
  ctx.drawImage(logo.img, logo.x, logo.y, logo.img.width, logo.img.height)

  // Welcome message
  let phrase = "Click or tap on screen to start the game"
  ctx.font = 'bold 16px Verdana, sans-serif'
  ctx.fillStyle = '#000000'
  let measureText = ctx.measureText(phrase)
  let xCoord = (canvas.width/2) - (measureText.width/2)
  let yCoord = (logo.y + logo.img.height) + 50
  ctx.fillText (phrase, xCoord, yCoord)
}

const fadeOut = (alphaValue) => {
  // Default value if undefined
  let alpha = (alphaValue == undefined) ? 0.02 : parseFloat(alphaValue) + 0.02

  ctx.fillStyle = '#FFFFFF'
  ctx.globalAlpha = alpha

  ctx.fillRect(0, 0, canvas.width, canvas.height)

  if(alpha < 1.0){
    setTimeout(() => {
      fadeOut(alpha)
    }, 30);
  }
}

const handleClick = () => {
  state._current = state.loading
  fadeOut()
}

const handleResize = () => {
  canvas.width = document.body.clientWidth
  canvas.height = document.body.clientHeight

  switch(state._current){
    case state.intro:
      showIntro()
      break
  }
}

window.addEventListener('click', handleClick, false)
window.addEventListener('resize', handleResize, false)