let tileSize = 20

const perlin = () => {
  for(let i = 0; i < canvas.width / tileSize; i++){
    for(let j = 0; j < canvas.height / tileSize; j++){
      ctx.fillStyle = `#000000`
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }
}