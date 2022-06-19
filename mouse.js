class Mouse{
  constructor(clientX, clientY){
    this.clientX = clientX
    this.clientY = clientY
  }

  addMouseListeners(){
    canvas.addEventListener('mousemove', (e) => {
      this.clientX = e.offsetX,
      this.clientY = e.offsetY
    })
  }
}

let mouse = new Mouse()
mouse.addMouseListeners()