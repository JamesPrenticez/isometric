var canvas, ctx, gameLoop;
var citySize = 100;
var coveCount = citySize/10;
var maxCoveSize = coveCount/2;
var city = new Array(citySize);
var nodeSize = Math.floor(citySize/20);


/** START **/
perlinNoise();
init();


function perlinNoise (canvas) {
  offscreen = document.createElement("canvas");
	offscreen_ctx = offscreen.getContext("2d");
	offscreen.width = citySize/2;
	offscreen.height = citySize/2;
	var offscreen_id = offscreen_ctx.getImageData (0, 0, offscreen.width, offscreen.height);
	var offscreen_pixels = offscreen_id.data;
	var i;
	
	for (i = 0; i < offscreen_pixels.length; i++) {
		offscreen_pixels[i    ] = 
		offscreen_pixels[i + 1] = 
		offscreen_pixels[i + 2] = Math.floor (Math.random () * 256);
		offscreen_pixels[i + 3] = 255;
	}
	
	rows=0;
	perlin = new Array(citySize);
	var curRow = 0;
				
	for (j = 0; j < offscreen_pixels.length; j++) {
		if ( j === 0 || j % citySize === 0 ){
			perlin[rows] = [];
			curRow=rows;
			rows++;
		}
		perlin[curRow].push(offscreen_pixels[j]);
	}
	
	var p1,p2,p3,p4,p5,p6,p7,p8;
	for (x = 1; x < perlin.length-1; x++) {
		for (y = 1; y < perlin[x].length-1; y++) {
		
			p1 = perlin[x-1][y-1];
			p2 = perlin[x][y-1];
			p3 = perlin[x+1][y-1];
			
			p4 = perlin[x-1][y];
			p5 = perlin[x+1][y];
			
			p6 = perlin[x-1][y+1];
			p7 = perlin[x+1][y];
			p8 = perlin[x-1][y+1];
			
			p9 = perlin[x][y];
			
			var avg = parseInt((p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9)/9);
			
			perlin[x][y] = avg > 85 ? avg : 0; //low-pass filter
			if (avg > 178) {
				perlin[x][y] = 255;
			}
		}
	}
	
	for (s = 0; s < perlin.length; s++) {
		perlin[s][0] = 0;
		perlin[0][s] = 0;
		
		perlin[s][perlin.length-1] = 0;
		perlin[perlin.length-1][s] = 0;
	}
	
	for (var cc = 0; cc < coveCount; cc++) {
		var circleRadius = Math.floor(Math.random() * maxCoveSize) + 2;
		var ccX = Math.max(circleRadius, Math.min(perlin.length - circleRadius, Math.floor(Math.random() * perlin.length)));
		var ccY = Math.max(circleRadius, Math.min(perlin.length - circleRadius, Math.floor(Math.random() * perlin.length)));
		
		circleCenter = [ccX,ccY];
		for (x=circleCenter[0] - circleRadius; x < circleCenter[0] + circleRadius; x++ ) {
			for (y=circleCenter[1] - circleRadius; y < circleCenter[1] + circleRadius; y++ ) {
				tweakOne = Math.floor(Math.random() * 2) + 1;
				tweakTwo = Math.floor(Math.random() * 1) + 1;
				delta = [circleCenter[0] - x, circleCenter[1] - y];
				distance = Math.sqrt((delta[0]*tweakOne)*delta[0]+(delta[1]*tweakTwo)*(delta[1]*tweakTwo));
				if (distance < circleRadius) {
					perlin[x][y] = 0;
				}
				if (parseInt(distance) === circleRadius && perlin[x][y] > 0) {
					perlin[x][y] = 254;
				}
			}
		}
	}
	
	for (var xx = 1; xx < perlin.length-1; xx++) {
		for (var yy = 1; yy < perlin.length-1; yy++) {
			if (perlin[xx-1][yy] === 0 && perlin[xx+1][yy] === 0 && perlin[xx][yy-1] === 0 && perlin[xx][yy+1] === 0) {
				perlin[xx][yy] = 0;
			}
		}
	}

	for (x = 0; x < city.length; x++) {
		city[x] = [];
		for (y = 0; y < city.length; y++) {
			city[x][y] = [];
			if (perlin[x][y] === 0) { //water
				city[x][y].push({ bgCol:'rgba(140,180,230, 1.0)' });
			} else if (perlin[x][y] > 0 && perlin[x][y] < 145) { //fields
				city[x][y].push({ bgCol:'rgba(100,150,100, 1.0)' });
			}  else if (perlin[x][y] > 145 && perlin[x][y] < 178) { //forests
				city[x][y].push({ bgCol:'rgba(60,100,60, 1.0)' });
			} else if (perlin[x][y] > 178) { //mountains
				city[x][y].push({ bgCol:'rgba('+(perlin[x][y])+','+(perlin[x][y])+','+(perlin[x][y])+', 1.0)' });
			} else { //fallback
				city[x][y].push({ bgCol:'rgba('+(perlin[x][y])+',170,'+(perlin[x][y])+', 1.0)' });
			}
			if (perlin[x][y] === 254) { //beaches
				city[x][y].push({ bgCol:'rgba(255,0,0, 1.0)' });
			}
		}
	}
}
	
function init() {
	canvas = document.getElementById('city');
	canvas.width = document.width - 10;
	canvas.height = document.height - 50;
	ctx = canvas.getContext('2d');
	beginGameLoop();
}

function beginGameLoop() {
	updateDisplay();
	gameLoop = setTimeout(function() {
		beginGameLoop();
	}, 10);
}

function rect(x,y,w,h,col) {
	ctx.beginPath();
	ctx.rect(x,y,w,h);
	if (col) {
		ctx.fillStyle = col;
	}
	//ctx.stroke();
	ctx.closePath();
	ctx.fill();
}

function updateDisplay() {
	for (x = 0; x < city.length; x++) {
		for (y = 0; y < city.length; y++) {
			rect(nodeSize*(x+1), nodeSize*(y+1), nodeSize, nodeSize, city[x][y][0].bgCol);
		}
	}
}