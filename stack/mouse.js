class Mouse{
  constructor(clientX, clientY){
    this.clientX = clientX
    this.clientY = clientY
    this.up = false
    this.down = false
  }

  addMouseListeners(){
    canvas.addEventListener('mousemove', (e) => {
      this.clientX = e.offsetX,
      this.clientY = e.offsetY
    })

    canvas.addEventListener('mouseup', (e) => {
      e.preventDefault()
      this.up = false
      this.down = true
    })
    canvas.addEventListener('mousedown', (e) => {
      e.preventDefault()
      this.up = true
      this.down = false
    })

  }
}

let mouse = new Mouse()
mouse.addMouseListeners()

// Handle Scroll
// Game.prototype.handleScroll = function(e) {
// 	e.preventDefault();

// 	var scrollValue = (e.wheelDelta == undefined) ? e.detail * -1 : e.wheelDelta;

// 	if (scrollValue >= 0) {
// 		this.zoomIn();
// 	} else {
// 		this.zoomOut();
// 	}

// 	this.draw();
// }