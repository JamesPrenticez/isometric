class Controls{
  constructor(){
    this.up = false
    this.left = false
    this.down = false
    this.right = false
    this.plus = false
    this.minus = false

    this.#addKeyboardListeners()
  }

  #addKeyboardListeners(){
    document.onkeydown = (e) => {
      switch(e.key){
        case "w":
          this.up = true
          break
        case "a":
          this.left = true
          break
        case "s":
          this.down = true
          break
        case "d":
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
      //console.table(this)
    }
    document.onkeyup = (e) => {
      switch(e.key){
        case "w":
          this.up = false
          break
        case "a":
          this.left = false
          break
        case "s":
          this.down = false
          break
        case "d":
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
    }
  }
}