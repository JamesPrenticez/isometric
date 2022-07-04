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

console.log('currentMap', currentMap)


// function buildMap(cols = 15, rows = 10){
//   let myArray = []
//   for(let i = 0; i < rows; i++) {
//     myArray[i] = ""
//     for (let j = 0; j < cols; j++) {
//         myArray[i] += `${Math.floor(Math.random() * 3)}`
//       }
//     }
//     return myArray
//   }

//   console.log('buildMap()', buildMap())




