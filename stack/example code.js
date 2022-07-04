const ctx = canvas.getContext("2d");

const imageSrcDir = "http://sarahkerrigan.biz/wpmtest/1/images/tile/"
const tileImages = [];

function loadImages(images) {
  images.forEach(image => {
    const img = tileImages[image.mapIndex] = new Image();
    img.src = imageSrcDir + image.name;
  });
}
// load the images and add to the tileImage array
loadImages([{
    name: "grass.jpeg",
    mapIndex: 0
  },
  {
    name: "sand.jpeg",
    mapIndex: 1
  },
  {
    name: "black.png",
    mapIndex: 3
  },
]);



const testMap = [
  "3333333333333333333333",
  "3000000000000000000003",
  "3000111000000011100003",
  "3011110000101111000013",
  "3010011100001001110003",
  "3000000000000000000003",
  "3000111000000011100003",
  "3011110000101111000013",
  "3010011100001001110003",
  "3000000000000000000003",
  "3000111000000011100003",
  "3011110000101111000013",
  "3010011100001001110003",
  "3000011000000001100003",
  "3333333333333333333333",
];

// function to create a map from the above type map 
function createMap(map) {
  const newMap = {};
  newMap.width = map[0].length;
  newMap.height = map.length;
  newMap.array = new Uint8Array(newMap.width * newMap.height);
  var index = 0;
  for (const row of map) {
    var i = 0;
    while (i < row.length) {
      newMap.array[index++] = Number(row[i++]);
    }
  }
  return newMap;
}
const currentMap = createMap(testMap);

const tileWidth = 64;
const tileHeight = 64;


var mapX = 0; // the map position so that the player can be seen
var mapY = 0;


// get the map position
function getMapPosition() {
  // convert player to pixel pos
  var x = player.x * tileWidth + player.width / 2;
  var y = player.y * tileHeight + player.height / 2;
  x -= canvas.width / 2; // center on the canvas
  y -= canvas.height / 2;
  mapX = x;
  mapY = y;
}

function drawMap(map) {
  const w = map.width; // get the width of the tile array
  const mArray = map.array;
  const tx = mapX / tileWidth | 0; // get the top left tile
  const ty = mapY / tileHeight | 0;
  const tW = (canvas.width / tileWidth | 0) + 2; // get the number of tiles to fit canvas
  const tH = (canvas.height / tileHeight | 0) + 2;
  // set the location via the transform
  // From here on you draw all the game items relative to the map not the canvas
  ctx.setTransform(1, 0, 0, 1, -mapX | 0, -mapY | 0);

  // Draw the tiles if tile pos is off map draw black tile
  for (var y = 0; y < tH; y += 1) {
    for (var x = 0; x < tW; x += 1) {
      const rx = tx + x;  // get tile real pos
      const ry = ty + y;
      var tileIndex;
      if(rx < 0 || rx >= w){
          tileIndex = 3; // black if off map
      }else{
          const i = rx + ry * w;
          tileIndex = mArray[i] === undefined ? 3 : mArray[i]; // if outside map draw black tile
      }
      ctx.drawImage(tileImages[tileIndex], rx * tileWidth, ry * tileHeight, tileWidth, tileHeight);
    }
  }

}