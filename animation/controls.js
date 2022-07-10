class Controls{
  constructor(type){
      this.up = false
      this.left = false
      this.down = false
      this.right = false
      this.plus = false
      this.minus = false

      switch(type){
        case "player":
          this.#playerControls()
          break
        case "camera":
          this.#cameraControls()
          break
      }
    }
  
    #playerControls(){
      document.addEventListener('keydown', (e) => {
        switch(e.key){
          case "w":
            this.w = true
            break
          case "a":
            this.a = true
            break
          case "s":
            this.s = true
            break
          case "d":
            this.d = true
            break
        }
        //console.table(this)
      })
      document.addEventListener('keyup', (e) => {
        switch(e.key){
          case "w":
            this.w = false
            break
          case "a":
            this.a = false
            break
          case "s":
            this.s = false
            break
          case "d":
            this.d = false
            break
        }
        //console.table(this)
      })
    }

  #cameraControls(){
    document.addEventListener('keydown', (e) => {
      switch(e.key){
        case "ArrowUp":
          this.up = true
          break
        case "ArrowLeft":
          this.left = true
          break
        case "ArrowDown":
          this.down = true
          break
        case "ArrowRight":
          this.right = true
          break
        case "+":
          this.plus = true
          break
        case "-":
          this.minus = true
          break
        case "r":
          this.rotate = true
          break
      }
      this.fired = false
      //console.table(this)
    })
    document.addEventListener('keyup', (e) => {
      switch(e.key){
        case "ArrowUp":
          this.up = false
          break
        case "ArrowLeft":
          this.left = false
          break
        case "ArrowDown":
          this.down = false
          break
        case "ArrowRight":
          this.right = false
          break
        case "+":
          this.plus = false
          break
        case "-":
          this.minus = false
          break
        case "r":
          this.rotate = false
          break
      }
      //console.table(this)
    })
  }
}