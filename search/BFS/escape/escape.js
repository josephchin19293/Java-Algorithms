var cells = [];
var cWidth = 20;

var iDirections = [1, 0, -1, 0];
var jDirections = [0, 1, 0, -1];
var q;

var start, end;

function setup() {

  frameRate(100);

  createCanvas(600,600);
  cols = width / cWidth;
  rows = height / cWidth;

  for (let i=0; i<rows; i++) {
    cells.push(new Array(cols));
  }

  for (let i=0; i<rows; i++) {
    for (let j=0; j<cols; j++) {
      var cell = new Cell(i,j,false);
      if(random(1) < 0.3) { cell.makeWall(); }
      cells[i][j] = cell;
    }
  }

  start = cells[0][0];
  end = cells[floor(random(rows))][floor(random(cols))];
  // end = cells[1][1];
  start.wall = false;
  end.wall = false;
  start.isStart = true;
  end.isEnd = true;

  q = new Queue([]);
  q.enqueue(start);
  for (let i=0; i<rows; i++) {
    for (let j=0; j<cols; j++) {
      cells[i][j].show();
    }
  }
}

function draw() {
  // background(51);


  if(q.size() > 0) {
    var temp = q.next();

    if(temp.isEnd) {
      start.makePrevious(undefined);
      drawPath(temp);
      for (let i=0; i<rows; i++) {
        for (let j=0; j<cols; j++) {
          cells[i][j].show();
        }
      }
      return;
    }

    for(let x=0; x<4; x++) {
      var iNew = temp.i + iDirections[x];
      var jNew = temp.j + jDirections[x];

      if(iNew < 0 || jNew < 0) { continue; }
      if(iNew >= cols || jNew >= rows) { continue; }

      var newCell = cells[iNew][jNew];

      if(newCell.visited) { continue; }
      if(newCell.wall) { continue; }

      newCell.visit();
      newCell.makePrevious(temp);
      newCell.makeSteps(temp.steps + 1);
      newCell.show();

      q.enqueue(newCell);
    }

    q.dequeue();


  }
}

function Cell(i, j, wall) {
  this.i = i;
  this.j = j;
  this.steps = 0;
  this.previous = undefined;
  this.visited = false;

  this.isStart = false;
  this.isEnd = false;
  this.isPath = false;

  this.wall = wall;

  // this.checkNeighbours = function() {
  //
  // }

  this.show = function() {
    var x = this.i * cWidth;
    var y = this.j * cWidth;


    if (this.wall) {
      fill(27,24,24);
      stroke(27,24,24);
      rect(x+1, y+1, cWidth-1, cWidth-1);
    } else if (this.isStart) {
      fill(255,0,9);
      stroke(255,0,9);
      rect(x+1, y+1, cWidth-1, cWidth-1);
    } else if (this.isEnd) {
      fill(0,255,17);
      stroke(0,255,17);
      rect(x+1, y+1, cWidth-1, cWidth-1);
    } else if (this.isPath) {
      fill(132,33,126);
      stroke(132,33,126);
      rect(x+1, y+1, cWidth-1, cWidth-1);
    } else if (this.visited) {
      fill(135,87,132);
      stroke(135,87,132);
      rect(x+1, y+1, cWidth-1, cWidth-1);
    } else {
      fill(51);
      stroke(51);
      rect(x+1, y+1, cWidth-1, cWidth-1);
    }
  }

  this.visit = function() {
    this.visited = true;
  }

  this.makeWall = function() {
    this.wall = true;
  }

  this.makePrevious = function(prev) {
    this.previous = prev;
  }

  this.makeSteps = function(steps) {
    this.steps = steps;
  }
}

function escapeMaze(iMax, jMax) {
  var q = new Queue([]);
  q.enqueue(start);

  var iDirections = [1, 0, -1, 0];
  var jDirections = [0, 1, 0, -1];

  while(q.size() > 0) {
    console.log(q);
    var temp = q.next();

    if(temp.isEnd) {
      start.makePrevious(undefined);
      drawPath(temp);
      console.log(temp)
      return;
    }

    for(let x=0; x<4; x++) {
      var iNew = temp.i + iDirections[x];
      var jNew = temp.j + jDirections[x];

      if(iNew < 0 || jNew < 0) { continue; }
      if(iNew >= iMax || jNew >= jMax) { continue; }

      var newCell = cells[iNew][jNew];

      if(newCell.visited) { continue; }
      if(newCell.wall) { continue; }

      newCell.visit();
      console.log("making " + temp.i + temp.j + " previous");
      newCell.makePrevious(temp);
      newCell.makeSteps(temp.steps + 1);

      q.enqueue(newCell);
    }
    q.dequeue();
  }
  console.log("done");
}

function drawPath(cell) {
  var some = cell;
  while(some.previous != undefined) {
    some = some.previous;
    some.isPath = true;
    some.show();
  }
}

class Queue {
  constructor(data) {
    this.data = data;
  }

  enqueue(item) {
    this.data.unshift(item);
  }

  dequeue() {
    this.data.pop();
  }

  size() {
    return this.data.length;
  }

  first() {
    return this.data[0];
  }

  next() {
    return this.data[this.size() - 1];
  }
}
