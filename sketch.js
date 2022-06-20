let tileWidth = 100;
let tileHeight = 230;
let frame = 20;
let padding = 50;

let minYchange = -10; // line width
let maxYchange = 150; // line overlap
let rotStripe = 30; // rotation of each stripe; try 10 or 90;
let layers = 7; // layers of lines
let alph = 35; // alpha from 0 to 255
let lines = false; // false to hide borders
let filling = true; // false to hide color filling
let colorLines = false;  // false for black lines
let sw = 3;

let table;
let extraBlackAlph = 255;



function preload() {
  table = loadTable('assets/colorPalette.csv', 'csv', 'header');
}

function setup() {

  let canv = createCanvas(windowWidth, windowHeight);
  canv.mousePressed(setup);

  if (lines == true) {
    stroke(0, 0, 0, extraBlackAlph);
    strokeWeight(sw);
  } else {
    noStroke();
  }

  let palette = [];
  for (let c = 0; c < table.getColumnCount(); c++) {
    append(palette, table.getString(int(random(0, 24)), c));
  }

  angleMode(DEGREES);
  let end = height / 2 + 500;

  for (let i = 0; i < layers; i++) {
    let y1;
    if (i == 0) {
      y1 = -height / 2 - 300;
    } else {
      y1 = -height / 2 + (height / layers) * i;
    }
    //starting height for each layer
    let y2 = y1,
      y3 = y1,
      y4 = y1,
      y5 = y1,
      y6 = y1;
    let rotLayer = random(359); //layer rotation
    let rotThisStripe = 0;
    //keep going until all the lines are at the bottom
    while (
      (y1 < end) &
      (y2 < end) &
      (y3 < end) &
      (y4 < end) &
      (y5 < end) &
      (y6 < end) &
      (-maxYchange < minYchange)
    ) {
      y1 += random(minYchange, maxYchange);
      y2 += random(minYchange, maxYchange);
      y3 += random(minYchange, maxYchange);
      y4 += random(minYchange, maxYchange);
      y5 += random(minYchange, maxYchange);
      y6 += random(minYchange, maxYchange);

      // Creating a color from the palette and giving alpha to it
      let myColor = color(palette[int(random(0, 4))]);
      myColor._array[3] = alph / 255;

      if (filling == true) {
        fill(myColor);
      } else {
        noFill();
      }
      if (colorLines == true) {
        stroke(myColor);
      }

      push();
      translate(width / 2, height / 2);
      rotThisStripe += rotStripe; //rotating after each stripe
      rotate(rotThisStripe + rotLayer);
      let xStart = -width / 2;
      beginShape();
      curveVertex(xStart - 300, height / 2 + 500);
      curveVertex(xStart - 300, y1);
      curveVertex(xStart + (width / 5) * 1, y2);
      curveVertex(xStart + (width / 5) * 2, y3);
      curveVertex(xStart + (width / 5) * 3, y4);
      curveVertex(xStart + (width / 5) * 4, y5);
      curveVertex(width / 2 + 300, y6);
      curveVertex(width / 2 + 300, height / 2 + 500);
      endShape(CLOSE);
      pop();
    }
  }

  let tilesAcross = floor((width - frame * 2) / (tileWidth + padding));
  let tilesDown = floor((height - frame * 2) / (tileHeight + padding));
  let canvas2 = createGraphics(width, height);
  let extraWidth = round((width-(tilesAcross * (tileWidth + padding) + frame * 2 - padding))/2)
  let extraHeight = round((height-(tilesDown * (tileHeight + padding) + frame * 2 - padding))/2)
  for (i = 0; i < tilesAcross; i++) {
    for (j = 0; j < tilesDown; j++) {
      let tile = get(
        floor(random(width - tileWidth)),
        floor(random(height - tileHeight)),
        tileWidth,
        tileHeight
      );
      let x = i * (tileWidth + padding) + frame + extraWidth;
      let y = j * (tileHeight + padding) + frame + extraHeight;
      //image(tile, x ,y)
      canvas2.image(tile, x, y)
    }
  }
  background(0);
  image(canvas2, 0,0);
}
