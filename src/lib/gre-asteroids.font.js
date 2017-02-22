/* global ctx, path */

// implementing by hand Asteroid's font. see http://www.dafont.com/hyperspace.font

var FONT0 = [ // 0
  [0, 0],
  [2, 0],
  [2, 2],
  [0, 2],
  [0, 0]
];
var FONT5 = [ // 5
  [2, 0],
  [0, 0],
  [0, 1],
  [2, 1],
  [2, 2],
  [0, 2]
];
var FONT = [
  FONT0,
  [ // 1
    [1, 0],
    [1, 2]
  ],
  [ // 2
    [0, 0],
    [2, 0],
    [2, 1],
    [0, 1],
    [0, 2],
    [2, 2]
  ],
  [ // 3
    [0, 0],
    [2, 0],
    [2, 2],
    [0, 2],
    ,
    [0, 1],
    [2, 1]
  ],
  [ // 4
    [0, 0],
    [0, 1],
    [2, 1],
    ,
    [2, 0],
    [2, 2]
  ],
  FONT5,
  [ // 6
    [0, 0],
    [0, 2],
    [2, 2],
    [2, 1],
    [0, 1]
  ],
  [ // 7
    [0, 0],
    [2, 0],
    [2, 2]
  ],
  [ // 8
    [0, 0],
    [2, 0],
    [2, 2],
    [0, 2],
    [0, 0],
    ,
    [0, 1],
    [2, 1]
  ],
  [ // 9
    [2, 2],
    [2, 0],
    [0, 0],
    [0, 1],
    [2, 1]
  ]
];
[
  [// A
    [0,2],
    [0,2/3],
    [1,0],
    [2,2/3],
    [2,2],
    ,
    [0,4/3],
    [2,4/3]
  ],
  [ // B
    [0, 1],
    [0, 0],
    [4/3,0],
    [2,1/3],
    [2,2/3],
    [4/3,1],
    [0,1],
    [0,2],
    [4/3,2],
    [2,5/3],
    [2,4/3],
    [4/3,1]
  ],
  [// C
    [2,0],
    [0,0],
    [0,2],
    [2,2]
  ],
  [// D
    [0,0],
    [1,0],
    [2,2/3],
    [2,4/3],
    [1,2],
    [0,2],
    [0,0]
  ],
  [// E
    [2,0],
    [0,0],
    [0,2],
    [2,2],
    ,
    [0,1],
    [1.5,1]
  ],
  [// F
    [2,0],
    [0,0],
    [0,2],
    ,
    [0,1],
    [2,1]
  ],
  [// G
    [2,2/3],
    [2,0],
    [0,0],
    [0,2],
    [2,2],
    [2,4/3],
    [1,4/3]
  ],
  [// H
    [0,0],
    [0,2],
    ,
    [2,0],
    [2,2],
    ,
    [0,1],
    [2,1]
  ],
  [// I
    [0,0],
    [2,0],
    ,
    [1,0],
    [1,2],
    ,
    [0,2],
    [2,2]
  ],
  [// J
    [2,0],
    [2,2],
    [1,2],
    [0,4/3]
  ],
  [// K
    [0,0],
    [0,2],
    ,
    [2,0],
    [0,1],
    [2,2]
  ],
  [// L
    [0,0],
    [0,2],
    [2,2]
  ],
  [// M
    [0,2],
    [0,0],
    [1,2/3],
    [2,0],
    [2,2]
  ],
  [// N
    [0,2],
    [0,0],
    [2,2],
    [2,0]
  ],
  FONT0,// O
  [// P
    [0,2],
    [0,0],
    [2,0],
    [2,1],
    [0,1]
  ],
  [// Q
    [0,0],
    [2,0],
    [2,4/3],
    [1,2],
    [0,2],
    [0,0],
    ,
    [2,2],
    [1,4/3]
  ],
  [// R
    [0,2],
    [0,0],
    [2,0],
    [2,1],
    [0,1],
    [2,2]
  ],
  FONT5,// S
  [// T
    [0,0],
    [2,0],
    ,
    [1,0],
    [1,2]
  ],
  [// U
    [0,0],
    [0,2],
    [2,2],
    [2,0]
  ],
  [// V
    [0,0],
    [1,2],
    [2,0]
  ],
  [// W
    [0,0],
    [0,2],
    [1,4/3],
    [2,2],
    [2,0]
  ],
  [// X
    [0,0],
    [2,2],
    ,
    [2,0],
    [0,2]
  ],
  [// Y
    [0,0],
    [1,2/3],
    [2,0],
    ,
    [1,2/3],
    [1,2]
  ],
  [// Z
    [0,0],
    [2,0],
    [0,2],
    [2,2]
  ]
].forEach(function (c, i) {
  FONT[String.fromCharCode(65+i)] = c;
});

var dot = FONT["."] = [
  [1, 1.8],
  [1, 2]
];

FONT[":"] = [
  [1, 0],
  [1, 0.2],
  ,
  [1, 1.8],
  [1, 2]
];

FONT["'"] = [
  [1, 0],
  [1, 2/3]
];

FONT["ᐃ"] = [
  [ 1, 0 ],
  [ 1.8, 2 ],
  [ 1, 1.6 ],
  [ 0.2, 2 ],
  [ 1, 0 ]
  /*
  [-4, -4],
  [ 10, 0],
  [ -4, 4],
  [ -3, 0]
  */
];

FONT["!"] = [
  [1, 0],
  [1, 1.5],
  ,
].concat(dot);
FONT["?"] = [
  [0, 0],
  [2, 0],
  [2, 1],
  [1, 1],
  [1, 1.5],
  ,
].concat(dot);
FONT["x"] = [
  [0,1],
  [2,2],
  ,
  [2,1],
  [0,2]
];
FONT["¢"] = [
  [1,0],
  [1,2],
  ,
  [1.5,0.5],
  [0.5,0.5],
  [0.5,1.5],
  [1.5,1.5]
];

// oO ASTEROIDS font with fontSize and align (-1:right, 0:center, 1:left)
// will side effect some ctx.translate() (that you could benefit to make text follow)
function font (txt, fontSize, align) { // eslint-disable-line
  var l = fontSize*11*txt.length;
  ctx.translate(align ? (align>0 ? 0 : -l) : -l/2, 0);
  for (var i=0; i<txt.length; i++) {
    path(FONT[txt[i]] && FONT[txt[i]].map(function (o) {
      return o && [4*fontSize*o[0], 5*fontSize*o[1]];
    }), 1);
    ctx.lineJoin = "round";
    ctx.stroke();
    ctx.translate(fontSize*11, 0);
  }
}