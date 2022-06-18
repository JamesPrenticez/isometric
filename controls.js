class Controls{
  constructor(){
    this.up = false
    this.down = false
    this.left = false
    this.right = false
    this.#addKeyboardListeners()
  }

  #addKeyboardListeners(){
    document.onkeydown = (e) => {
      switch(e.key){
        case "w":
          this.up = true
          break
        case "s":
          this.down = true
          break
        case "a":
          this.left = true
          break
        case "d":
          this.right = true
          break
      }
      //console.table(this)
    }
    document.onkeyup = (e) => {
      switch(e.key){
        case "w":
          this.up = false
          break
        case "s":
          this.down = false
          break
        case "a":
          this.left = false
          break
        case "d":
          this.right = false
          break
      }
      //console.table(this)
    }
  }
}