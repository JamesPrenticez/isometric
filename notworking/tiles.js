var refereshSkip = false; // when true drops frame rate by 4
var dontAlignToPixel = false;
var ctx = canvas.getContext("2d");
function mouseEvent(e) {
   if(e.type === "click") {
       dontAlignToPixel = !dontAlignToPixel;
       pixAlignInfo.textContent = dontAlignToPixel ? "Pixel Align is OFF" : "Pixel Align is ON";
   } else {
       refereshSkip = e.type === "mousedown";
   }
}
pixAlignInfo.addEventListener("click",mouseEvent);
canvas.addEventListener("mousedown",mouseEvent);
canvas.addEventListener("mouseup",mouseEvent);

// wait for code under this to setup
setTimeout(() => {
  var w = canvas.width;
  var h = canvas.height;
  var cw = w / 2; // center 
  var ch = h / 2;

  // create tile map
  const worldTileCount = 1024;
  const tileMap = new Uint8Array(worldTileCount * worldTileCount);
  
  // add random tiles
  doFor(worldTileCount * worldTileCount, i => {
    tileMap[i] = randI(1, tileCount);
  });
  
  // this is the movement direction of the map
  var worldDir = Math.PI / 4;

  /* =======================================================================
   Drawing the tileMap 
========================================================================*/
  var worldX = 512 * tileSize;
  var worldY = 512 * tileSize;

  function drawWorld() {
    const c = worldTileCount; // get the width of the tile array
    const s = tileSize; // get the tile size in pixels
    const tx = worldX / s | 0; // get the top left tile
    const ty = worldY / s | 0;
    const tW = (canvas.width / s | 0) + 2; // get the number of tiles to fit canvas
    const tH = (canvas.height / s | 0) + 2;
    // set the location
    if(dontAlignToPixel) {
        ctx.setTransform(1, 0, 0, 1, -worldX,-worldY);
        
    } else {
        ctx.setTransform(1, 0, 0, 1, Math.floor(-worldX),Math.floor(-worldY));
    }
    // Draw the tiles
    for (var y = 0; y < tH; y += 1) {
      for (var x = 0; x < tW; x += 1) {
        const i = tx + x + (ty + y) * c;
        const tindx = tileMap[i] === undefined ? 6 : tileMap[i];
        imageTools.drawSpriteQuick(tileSet, tindx, (tx + x) * s, (ty + y) * s);
      }
    }

  }

  var timer = 0;
  var refreshFrames = 0;
  const dirChangeMax = 3.5;
  const framesBetweenDirChange = 240;
  var dirChangeDelay = 1;
  var dirChange = 0;
  var prevDir = worldDir;
  const eCurve   = (v, p = 2) =>  v < 0 ? 0 : v > 1 ? 1 : v ** p / (v ** p + (1 - v) ** p); 
 
  //==============================================================
  // main render function
  function update() {
    refreshFrames ++;
    if(!refereshSkip || (refereshSkip && refreshFrames % 8 === 0)){
      timer += 1000 / 60;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
      ctx.globalAlpha = 1; // reset alpha
      if (w !== innerWidth || h !== innerHeight) {
        cw = (w = canvas.width = innerWidth) / 2;
        ch = (h = canvas.height = innerHeight) / 2;
      } else {
        ctx.clearRect(0, 0, w, h);
      }
    
      // Move the map
      var speed = Math.sin(timer / 10000) * 8;
      worldX += Math.cos(worldDir) * speed;
      worldY += Math.sin(worldDir) * speed;
      if(dirChangeDelay-- <= 0) {
        dirChangeDelay = framesBetweenDirChange;
        prevDir = worldDir = prevDir + dirChange;
        dirChange = rand(-dirChangeMax , dirChangeMax);

      }
      worldDir = prevDir + (1-eCurve(dirChangeDelay / framesBetweenDirChange,3)) * dirChange;
    
      // Draw the map
      drawWorld();
    }
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}, 0);


/*===========================================================================
  CODE FROM HERE DOWN UNRELATED TO THE ANSWER
  ===========================================================================*/
const imageTools = (function() {
  // This interface is as is. No warenties no garenties, and NOT to be used comercialy
  var workImg, workImg1, keep; // for internal use
  keep = false;
  var tools = {
    canvas(width, height) { // create a blank image (canvas)
      var c = document.createElement("canvas");
      c.width = width;
      c.height = height;
      return c;
    },
    createImage: function(width, height) {
      var i = this.canvas(width, height);
      i.ctx = i.getContext("2d");
      return i;
    },
    drawSpriteQuick: function(image, spriteIndex, x, y) {
      var w, h, spr;
      spr = image.sprites[spriteIndex];
      w = spr.w;
      h = spr.h;
      ctx.drawImage(image, spr.x, spr.y, w, h, x, y, w, h);
    },
    line(x1, y1, x2, y2) {
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
    },
    circle(x, y, r) {
      ctx.moveTo(x + r, y);
      ctx.arc(x, y, r, 0, Math.PI * 2);
    },
  };
  return tools;
})();

const doFor = (count, cb) => {
  var i = 0;
  while (i < count && cb(i++) !== true);
}; // the ; after while loop is important don't remove
const randI = (min, max = min + (min = 0)) => (Math.random() * (max - min) + min) | 0;
const rand = (min = 1, max = min + (min = 0)) => Math.random() * (max - min) + min;
const seededRandom = (() => {
  var seed = 1;
  return {
    max: 2576436549074795,
    reseed(s) {
      seed = s
    },
    random() {
      return seed = ((8765432352450986 * seed) + 8507698654323524) % this.max
    }
  }
})();
const randSeed = (seed) => seededRandom.reseed(seed | 0);
const randSI = (min, max = min + (min = 0)) => (seededRandom.random() % (max - min)) + min;
const randS = (min = 1, max = min + (min = 0)) => (seededRandom.random() / seededRandom.max) * (max - min) + min;
const tileSize = 64;
const tileCount = 7;

function drawGrass(ctx, c1, c2, c3) {
  const s = tileSize;
  const gs = s / (8 * c3);
  ctx.fillStyle = c1;
  ctx.fillRect(0, 0, s, s);

  ctx.strokeStyle = c2;
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.beginPath();
  doFor(s, i => {
    const x = rand(-gs, s + gs);
    const y = rand(-gs, s + gs);
    const x1 = rand(x - gs, x + gs);
    const y1 = rand(y - gs, y + gs);
    imageTools.line(x, y, x1, y1);
    imageTools.line(x + s, y, x1 + s, y1);
    imageTools.line(x - s, y, x1 - s, y1);
    imageTools.line(x, y + s, x1, y1 + s);
    imageTools.line(x, y - s, x1, y1 - s);
  })
  ctx.stroke();
}

function drawTree(ctx, c1, c2, c3) {

  const seed = Date.now();
  const s = tileSize;
  const gs = s / 2;
  const gh = gs / 2;
  ctx.fillStyle = c1;
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.5)";
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 8;
  ctx.shadowOffsetY = 8;
  randSeed(seed);
  ctx.beginPath();
  doFor(18, i => {
    const ss = 1 - i / 18;
    imageTools.circle(randS(gs - gh * ss, gs + gh * ss), randS(gs - gh * ss, gs + gh * ss), randS(gh / 4, gh / 2));
  })
  ctx.stroke();
  ctx.fill();
  ctx.restore();
  ctx.fillStyle = c2;
  ctx.strokeStyle = c3;
  ctx.lineWidth = 2;
  ctx.save();

  randSeed(seed);
  ctx.beginPath();
  doFor(18, i => {
    const ss = 1 - i / 18;
    imageTools.circle(randS(gs - gh * ss, gs + gh * ss) - 2, randS(gs - gh * ss, gs + gh * ss) - 2, randS(gh / 4, gh / 2) / 1.6);
  })
  ctx.stroke();
  ctx.fill();
  ctx.restore();


}


const tileRenders = [
  (ctx) => {
    drawGrass(ctx, "#4C4", "#4F4", 1)
  },
  (ctx) => {
    drawGrass(ctx, "#644", "#844", 2)
  },
  (ctx) => {
    tileRenders[0](ctx);
    drawTree(ctx, "#480", "#8E0", "#7C0")
  },
  (ctx) => {
    tileRenders[1](ctx);
    drawTree(ctx, "#680", "#AE0", "#8C0")
  },
  (ctx) => {
    drawGrass(ctx, "#008", "#00A", 4)
  },
  (ctx) => {
    drawGrass(ctx, "#009", "#00C", 4)
  },
  (ctx) => {
    drawGrass(ctx, "#00B", "#00D", 4)
  },
]
const tileSet = imageTools.createImage(tileSize * tileCount, tileSize);
const ctxMain = ctx;
ctx = tileSet.ctx;
tileSet.sprites = [];
doFor(tileCount, i => {
  x = i * tileSize;
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, x, 0);
  ctx.beginPath();
  ctx.rect(0, 0, tileSize, tileSize);
  ctx.clip()
  if (tileRenders[i]) {
    tileRenders[i](ctx)
  }
  tileSet.sprites.push({
    x,
    y: 0,
    w: tileSize,
    h: tileSize
  });
  ctx.restore();
});
ctx = ctxMain;