const fs = require('fs');

/* -----------------------------------------------------------------------------
Read File
------------------------------------------------------------------------------*/
const dir = "./working/maps/"
const filename = "map1"

let rawData = fs.readFileSync(`${dir + filename}.json`)
let map = JSON.parse(rawData)
map.array = new Uint8Array(Buffer.from(map.array))
console.log(map)