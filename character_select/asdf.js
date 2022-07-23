// let seed, x, R, i, j, pass, s, X, Y

// seed = Date.now();    // seed for random generaton, can be replaced with hardcoded value
// x = c.getContext`2d`; // 2d canvas context
// x.lineWidth = 2;      // set 2 pixel wide line width to make the black outline
// R = ()=> (Math.sin(++s + i*i) + 1)*1e9 % 256 | 0; // get a seeded random integer between 0-256

// for(i = 32 * 16; i--;)                          // for each sprite (32 rows x 16 columns)

// for(pass = 4; pass--;)                          // 4 passes, outline left/right and fill left/right

// for(s = seed, j = R()/5 + 50|0; j--;)           // set seed, randomize max sprite pixels, 50-101
//   X = j&7, Y = j>>3,                            // X & Y pixel index in sprite
//   R() < 19 ?                                    // small chance of new color
//     x.fillStyle = `rgb(${R()},${R()},${R()})` : // randomize color
//     R()**2 / 2e3 > X*X + (Y-5)**2 &&            // distance from center vs random number
//       x[pass&2 ? 'strokeRect' : 'fillRect'](    // stroke first for outline then fill with color
//           7 + i%32*16 - pass%2*2*X + X,         // x pos, flipped if pass is even
//           2 + (i>>5)*16 + Y,                    // y pos
//           1, 1);                                // 1 pixel size

// =================================================================================================================
canvas.width = 512//document.body.clientWidth
canvas.height = 512//document.body.clientHeight
// =================================================================================================================
let ctx = canvas.getContext`2d`
ctx.lineWidth = 2      // set 2 pixel wide line width to make the black outline

let min = 1000000000000
let max = 9999999999999
let seed = Math.floor((Math.random() * (max - min + 1)) + min)
//let seed = 4752407933422
//let seed = Date.now();  
let random_int = () => (Math.sin(++seed) + 1) * 1e9 % 256 | 0; // get a seeded random integer between 0-256

ctx.fillStyle = 'white';
ctx.fillRect(200, 200, 100, 100);
//ctx.scale(2,2)
let i, j, X, Y, one, two, three
let spritePixels = random_int()/5 + 50|0; 256 //random_int() | 0

for(i = 2; i >= 0; i--){
  for(j = 2; j >= 0; j--){
    X = i
    Y = j
    
    one = random_int()
    two = random_int()
    three = random_int()
    
    ctx.fillStyle = `rgb(${one}, ${two}, ${three})`
    
    ctx.fillRect(X * 200, Y * 200, 200, 200)
    
    
  }
}
  

// =================================================================================================================
let seedInput = document.getElementById("seed")
seedInput.innerHTML = seed