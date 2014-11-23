var SudokuSolver = (function(sudoku){
  "use strict"

  var SudokuSolver = {
    numberOfTries: 0,
    MAX_BACKTRACK_LIMIT: 50000,

    init: function(){
      // Generate a randomly filled grid to fill.
      this.generateRandomGrid();
      this.solveSudoku();
    },

    generateRandomGrid: function() {
      var row, col, num = 0;

      for (var i = 0; i < 11; i++) {
        row = this.getRandumIntegerInRange(0, sudoku.GRID_SIZE);
        col = this.getRandumIntegerInRange(0, sudoku.GRID_SIZE);
        num = this.getRandumIntegerInRange(1, sudoku.GRID_SIZE);

        if (sudoku.noConflicts(row, col, num)) {
          sudoku.setCell(row, col, num);
        }
      }
    },

    getRandumIntegerInRange: function(lowerBound, upperBound) {
      return lowerBound + Math.floor(Math.random() * upperBound);
    },

    solveSudoku: function() {
      if (++this.numberOfTries === this.MAX_BACKTRACK_LIMIT) {
        throw new MaxTryReachedError();
      }

      var cell = this.findUnassignedLocation();
      var row = cell[0];
      var col = cell[1];

      // base case: if no empty cell
      if (row == -1) {
        console.log("solved");
        return true;
      }

      for (var num = 1; num <= sudoku.GRID_SIZE; num++) {

        if (sudoku.noConflicts(row, col, num)) {
          sudoku.setCell(row, col, num);

          if (this.solveSudoku()) {
            return true;
          }

          // mark cell as empty (with 0)
          sudoku.setCell(row, col, 0);
        }
      }

      // trigger back tracking
      return false;
    },

    findUnassignedLocation: function() {
      for (var row =0; row < sudoku.GRID_SIZE; row++)
        for (var col =0; col < sudoku.GRID_SIZE; col++)
          if (sudoku.getCell(row, col) == 0)
            return [row, col];
      return [-1, -1];
    },
  };

  return SudokuSolver;
})(Sudoku);
