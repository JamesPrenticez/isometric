class Mouse{
  constructor(type){
    this.clientX = 0
    this.clientY = 0
    this.up = false
    this.down = false


    switch(type){
      case "player":
        this.#playerControls()
        break
      case "map":
        this.#mapControls()
        break
      case "camera":
        this.#cameraControls()
        break
    }
  }

  #playerControls(){
    canvas.addEventListener('mousemove', (e) => {
      this.clientX = e.offsetX,
      this.clientY = e.offsetY
    })

    canvas.addEventListener('mouseup', (e) => {
      e.preventDefault()
      this.up = false
      this.down = true
    })


    canvas.addEventListener('click', (e) => {
      if (e.repeat) return
      e.preventDefault()
      let mouseCoords = {
        clientX: e.offsetX,
        clientY: e.offsetY
      }
      console.log("babalon", mouseCoords )
    })
  }

  #mapControls(){
    canvas.addEventListener('mousemove', (e) => {
      this.clientX = e.offsetX,
      this.clientY = e.offsetY
    })

    canvas.addEventListener('mouseup', (e) => {
      e.preventDefault()
      this.up = false
      this.down = true
    })
  }

  #cameraControls(){
    //null
  }
}


/* -----
if (e.repeat) return
----- */


//let mouse = new Mouse()


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