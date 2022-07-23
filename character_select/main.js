// let seed, x, R, i, j, pass, s, X, Y

// seed = Date.now();    
// x = c.getContext`2d`; 
// x.lineWidth = 2;      
// R = ()=> (Math.sin(++s + i*i) + 1)*1e9 % 256 | 0; /

// for(i = 32 * 16; i--;)                           

// for(pass = 4; pass--;)                          
// for(s = seed, j = R()/5 + 50|0; j--;)           
//   X = j&7, Y = j>>3,                             
//   R() < 19 ?                                     
//     x.fillStyle = `rgb(${R()},${R()},${R()})` : 
//     R()**2 / 2e3 > X*X + (Y-5)**2 &&            
//       x[pass&2 ? 'strokeRect' : 'fillRect'](    
//           7 + i%32*16 - pass%2*2*X + X,        
//           2 + (i>>5)*16 + Y,                    
//           1, 1);                                 

// =================================================================================================================
canvas.width = 512//document.body.clientWidth
canvas.height = 512//document.body.clientHeight
// =================================================================================================================
let ctx = canvas.getContext`2d`
ctx.lineWidth = 2      // set 2 pixel wide line width to make the black outline

let min = 1000000000000
let max = 9999999999999
//let seed = Math.floor((Math.random() * (max - min + 1)) + min)
let seed = 9823192478760//Math.floor((Math.random() * (max - min + 1)) + min)

let random_int = () => (Math.sin(++seed) + 1) * 1e9 % 256 | 0; // get a seeded random integer between 0-256

ctx.fillStyle = 'white';
ctx.fillRect(10, 10, 100, 100);
ctx.scale(10, 10);

let  R, i, j, pass, s, X, Y
let one, two, three


ctx.lineWidth = 2;      
R = ()=> (Math.sin(++s) + 1)*1e9 % 256 | 0; 

for(let pass = 4; pass >= 0; pass--)                          
for(s = seed, j = (R()/5 + 50|0) * 2; j--;){


  X = j&7,
  Y = j>>3, 
  
  one = R()
  two = R()
  three = R()
  
  R() < 19 ?                                     
    ctx.fillStyle = `rgb(${R()},${R()},${R()})` : 
    //ctx.fillStyle = `rgb(${R()},${R()},${R()})` : 
    R()**2 / 2e3 > X*X + (Y-5)**2 &&            
      ctx[pass&2 ? 'strokeRect' : 'fillRect'](    
          //console.log((7 - pass % 2 * 2 * X + X) * 10)
          (7 - pass % 2 * 2 * X + X),        
          (Y + 2),                    
          1, 1);    
}



// =================================================================================================================
let seedInput = document.getElementById("seed")
seedInput.innerHTML = seed