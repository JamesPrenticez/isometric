class Tile{
  constructor(x, y, width, height){
      this.x = x
      this.y = y
      this.width = width
      this.height = height
      
      this.img = new Image()
      this.img.src = "./tile.png" // 204 width x 37 height / 6 columns = 34 
  }

  draw(){
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 5; j++) {
        ctx.setTransform(1, 0.5, -1, 0.5, 160, 0)
        ctx.drawImage(this.img, i * this.width * 1.2, j * this.height * 1.2)

        ctx.beginPath()
        ctx.rect(((i+6) * this.width) * 1.2, ((j+4) * this.height) * 1.2, this.width, this.height)  // x cord, y cord, width, height    
        ctx.strokeStyle = "red"
        ctx.lineWidth = 2
        ctx.stroke()

        // ctx.font = 'bold 8px serif';
        // ctx.fillStyle = "black"
        // ctx.fillText("{x:" + i + ", y:" + j + "}", i * this.width, j * this.height)


      }
    }
  }
}

let tile = new Tile(100, 100, 32, 32)

//https://gamedev.stackexchange.com/questions/47388/best-technique-for-drawing-isometric-tiles

        // ctx.fillStyle = `rgb(
        //   ${Math.floor(255 - 42.5 * i)},
        //   ${Math.floor(255 - 42.5 * j)},
        //   0)`;
        // ctx.fillRect(j * 25, i * 25, 25, 25);