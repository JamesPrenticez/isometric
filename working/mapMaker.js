const fs = require('fs');
const buffer = require('buffer')

 //Step 1 - Create an array of strings and assign random value between 0 and 3
 const buildTypeMap = (cols, rows) => {
  let mapArray = []
  for(let i = 0; i < rows; i++) {
    mapArray[i] = ""
    for (let j = 0; j < cols; j++) {
      mapArray[i] += `${Math.floor(Math.random() * 3)}`
      }
    }
  return mapArray
}

//Step 2 - Convert that map into a usable object
const createTileMap = (rows, cols) => {
  const newMap = {}
  let mapArray = buildTypeMap(rows, cols)
  newMap.width = mapArray[0].length
  newMap.height = mapArray.length
  newMap.array = new Uint8Array(newMap.width * newMap.height)
  var index = 0
  for (const row of mapArray) {
    var i = 0
    while (i < row.length) {
      newMap.array[index++] = Number(row[i++])
    }
  }
  return newMap
}

// Save that map to a file
const writeFile = (data) => {
  fs.writeFile('./working/maps/map1.txt', data, err => {
    if (err) {
      console.error(err);
    }
    console.log('Map created successfully!') 
  })
}

let newMap = createTileMap(25, 15)
//console.log('newMap', newMap)

//const obj = {hello: 'world'};
//const blob = new buffer.Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});
//console.log('blob', blob)

const obj = newMap
const blob = new buffer.Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});
console.log('blob', blob)

fs.createWriteStream('./working/maps/map1.json').write(nope)

//let json = JSON.stringify(newMap)
//writeFile(blob)

//Read the file back in
// const readFile = () => {
//   console.log('read')
//   fs.readFile('./working/maps/map1.json', 'utf8', (err, data) => {
//       let map = JSON.parse(data)    
//       console.log('map', map)
//   })
// }

// console.log(readFile())

// https://nodejs.org/api/buffer.html


//https://stackoverflow.com/questions/14653349/node-js-cant-create-blobs

  