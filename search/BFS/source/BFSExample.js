// Dungeon escape

// Given a grid of '.' or '#' indicating (.) a path and (#) a wall
// write a function that returns how many steps it takes (4-directional)
// to escape the dungeon.
// If it is impossible to escape the dungeon, then the function should return
// -1.

// [[.][.][.][.][.][.][.][.][.][.][.]]
// [[.][#][#][#][.][#][#][.][.][.][.]]
// [[.][#][#][#][.][.][.][#][.][.][.]]
// [[.][#][#][.][.][.][.][#][.][.][.]]
// [[.][#][#][.][.][.][.][#][.][.][.]]
// [[.][#][#][.][#][#][#][#][#][.][.]]
// [[S][#][E][.][.][.][.][.][.][.][.]] >> 18

// [[#][#][E]]
// [[.][#][.]]
// [[S][#][.]] >> -1
var escapeMaze = function(grid) {
  // assuming a regular shaped (rectangular) grid
  var iMax = grid.length;
  var jMax = grid[0].length;

  // A queue of Positions
  var queue = new Queue([]);

  // create a grid (identical to the grid)
  // so we can store if each position has been
  // visited (boolean)
  var visited = [];
  for (let i=0; i<iMax; i++) {
      visited.push(new Array(grid[i].length).fill(false));
  }
  console.log(visited);

  // Find the start position
  // NOT NEEDED IF THE STARTING NODE IS PASSED
  for (let i=0; i<iMax; i++) {
    for (let j=0; j<jMax; j++) {
      if (grid[i][j] == "S") {
        queue.enqueue(new Position(grid[i][j] ,i, j, 0, undefined));
        break;
      }
    }
  }
  console.log(queue);

  // Directions that you can search in
  var iDirections = [-1, 1, 0, 0];
  var jDirections = [0, 0, 1, -1];

  while (queue.size() > 0) {
    var temp = queue.next()

    console.log("temp co'ords are: " + temp.getI() + temp.getJ());

    // If the end is found
    if (temp.getVal() == "E") {
      return temp.getSteps();
    }

    for (i=0; i<4; i++) { // Add here if you add directions
      var iNew = temp.getI() + iDirections[i];
      var jNew = temp.getJ() + jDirections[i];


      // Guard clauses
      // Out of bounds
      if (iNew < 0 || jNew < 0) { continue; }
      if (iNew >= iMax || jNew >= jMax) { continue; }
      // Visited
      if (visited[iNew][jNew]) { continue; }
      // is a wall
      if (grid[iNew][jNew] == '#') { continue; }

      visited[iNew][jNew] = true;
      queue.enqueue(new Position(grid[iNew][jNew], iNew, jNew, temp.getSteps()+1, temp));
    }

    queue.dequeue();
  }

  return -1;

}

// define a class for the queue
// to enqueue and dequeue items (in our case Positions)
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

// define a class to store the points in the queue
class Position {
  constructor(val, i, j, steps, previous) {
    this.val = val;
    this.i = i;
    this.j = j;
    this.steps = steps;
    this.previous = previous;
  }
  getVal()   { return this.val; }
  getI()     { return this.i; }
  getJ()     { return this.j; }
  getSteps() { return this.steps; }
  getPrev()  { return this.previous; }
}
