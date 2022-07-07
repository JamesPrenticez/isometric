const fs = require('fs');

/* -----------------------------------------------------------------------------
Step 1 - Create an array of strings and assign random value between 0 and 3
------------------------------------------------------------------------------*/
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

/* -----------------------------------------------------------------------------
Step 2 - Convert that map into a object
------------------------------------------------------------------------------*/
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

/* -----------------------------------------------------------------------------
Step 3 - Run the create map functions and convert the json ready to be saved
------------------------------------------------------------------------------*/
//Run function asking for 10 rows and 10 cols
let myMap = createTileMap(10,10)
//Convert the uint8array to a string
myMap.array = Buffer.from(myMap.array.buffer).toString()
//console.log(array)
let json = JSON.stringify(myMap)

/* -----------------------------------------------------------------------------
Step 4 - Save the Map to File
------------------------------------------------------------------------------*/
const dir = "./working/maps/"
const filename = "map1"

const writeFile = (data) => {
  fs.writeFile(`${dir + filename}.json`, data, err => {
    if (err) {
      console.error(err);
    }
    console.log('Map created successfully!') 
  })
}

writeFile(json)