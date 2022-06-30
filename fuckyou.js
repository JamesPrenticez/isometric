const cvs = document.getElementById("canvas");
cvs.width = cvs.height = 800;
const ctx = cvs.getContext("2d");


function draw(){    
  playArea = new Image();
  playArea.src="./tile.png";
  ctx.drawImage(playArea,0,0);
}

window.onload = function() {
    draw();
}