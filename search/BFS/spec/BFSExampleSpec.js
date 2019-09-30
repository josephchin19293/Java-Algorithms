
describe("Escape", function () {
  require('../source/BFSExample.js');
  it('escapes maze 1 with 3 steps', function() {
    //setup
    var grid = [["S",".","."], ["#",".","E"], ["#","#","#"]];

    var bfs = new BFSExample();
    // var q = new Queue([]);

    var result = bfs.escapeMaze(grid);
    expect(result).toBe(3);
  })
})