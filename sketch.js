// Based on code from: https://github.com/CodingTrain/website/blob/master/CodingChallenges/CC_011_PerlinNoiseTerrain/P5/sketch.js
// Edited by SacrificeProductions

var cols, rows;
var scl = 30;
var w = 600;
var h = 800;

var flying = 0;

var terrain = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  cols = w / scl;
  rows = h / scl;

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
}

function draw() {
  flying -= 0.02;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  background(0);
  translate(0, 100, -150);
  rotateX(PI / 3);
  rotateZ(PI / 8);
  //fill(255, 0, 200, 50);
  translate(-w / 2, -h * 0.75);
  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      a = map(terrain[x][y], -50, 50, 0, 1);      
      col = color(255*a, 255*(1-a), 0,100);
      fill(col);
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
    }
    endShape();
  }
}
