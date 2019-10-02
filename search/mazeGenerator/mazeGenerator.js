var cells = [];
var cWidth = 30;

var curr;

function setup() {
  createCanvas(600,600);
  cols = width / cWidth;
  rows = height / cWidth;

  for (let i=0; i<rows; i++) {
    cells.push(new Array(cols));
  }

  for (let i=0; i<rows; i++) {
    for (let j=0; j<cols; j++) {
      var cell = new Cell(i,j);
      cells[i][j] = cell;
    }
  }

  curr = cells[0][0];
}

function draw() {
  background(51);

  for (let i=0; i<rows; i++) {
    for (let j=0; j<cols; j++) {
      cells[i][j].show();
    }
  }

  curr.visited = true;

}

function Cell(i, j) {
  this.i = i;
  this.j = j;

  this.visited = false;

  this.walls = [true, true, true, true];

  this.checkNeighbours = function() {

  }

  this.show = function() {
    var x = this.i * cWidth;
    var y = this.j * cWidth;

    var xCoord = [x, x + cWidth, x + cWidth, x];
    var yCoord = [y, y, y + cWidth, y+cWidth];

    for (let i=0; i<4; i++) {
      if(this.walls[i]) {
        var toI = (i+1) % 4;
        line(xCoord[i], yCoord[i], xCoord[toI], yCoord[toI]);
        stroke(0);
      }
    }

    if (this.visited) {
      fill(0,192,83);
      rect(x, y, cWidth, cWidth);
    }
  }
}
