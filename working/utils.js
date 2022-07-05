const initGrid = (tileMap, grid) => {
  for(let i = 0; i < grid.width; i++) {
    tileMap[i] = []
      for (let j = 0; j < grid.height; j++) {
          tileMap[i][j] = Math.random() * 1
    }
  }
  //console.log('this.tileMap', this.tileMap)
}

const translatePixelsToMatix = (clientX, clientY) => {
  let screenTileNumber = {
    col: Math.max(Math.floor(this.mouse.clientX / this.tile.width), 0),
    row: Math.max(Math.floor(this.mouse.clientY / this.tile.height), 0)
  }

  let topLeftMapTileNumber = {
    startCol: Math.max(Math.floor(this.scrollPosition.x / this.tile.height), 0),
    startRow: Math.max(Math.floor(this.scrollPosition.y / this.tile.width), 0)
  }

  let tileHovered = {
    col: topLeftMapTileNumber.startCol + screenTileNumber.col,
    row: topLeftMapTileNumber.startRow + screenTileNumber.row
  }

  document.getElementById("mouseX").innerText = tileHovered.col
  document.getElementById("mouseY").innerText = tileHovered.row

  return tileHovered
}