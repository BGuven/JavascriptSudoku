var SudokuSolver = (function(Sudoku){
  "use strict"

  var SudokuSolver = {
    numberOfTries: 0,
    MAX_BACKTRACK_LIMIT: 50000,

    init: function(){
      // Generate a randomly filled grid to fill.
      SudokuSolver._generateRandomGrid();
      SudokuSolver._solveSudoku();
    },

    _generateRandomGrid: function() {
      var row, col, num = 0;

      for (var i = 0; i < 11; i++) {
        row = SudokuSolver.getRandumIntegerInRange(0, Sudoku.GRID_SIZE);
        col = SudokuSolver.getRandumIntegerInRange(0, Sudoku.GRID_SIZE);
        num = SudokuSolver.getRandumIntegerInRange(1, Sudoku.GRID_SIZE);

        if (Sudoku.noConflicts(row, col, num)) {
          Sudoku.setCell(row, col, num);
        }
      }
    },

    getRandumIntegerInRange: function(lowerBound, upperBound) {
      return lowerBound + Math.floor(Math.random() * upperBound);
    },

    _solveSudoku: function() {
      if (++SudokuSolver.numberOfTries === SudokuSolver.MAX_BACKTRACK_LIMIT) {
        throw new MaxTryReachedError();
      }

      var cell = SudokuSolver._findUnassignedLocation();
      var row = cell[0];
      var col = cell[1];

      // base case: if no empty cell
      if (row == -1) {
        console.log("solved");
        return true;
      }

      for (var num = 1; num <= Sudoku.GRID_SIZE; num++) {

        if (Sudoku.noConflicts(row, col, num)) {
          Sudoku.setCell(row, col, num);

          if (SudokuSolver._solveSudoku()) {
            return true;
          }

          // mark cell as empty (with 0)
          Sudoku.setCell(row, col, 0);
        }
      }

      // trigger back tracking
      return false;
    },

    _findUnassignedLocation: function() {
      for (var row = 0; row < Sudoku.GRID_SIZE; row++)
        for (var col = 0; col < Sudoku.GRID_SIZE; col++)
          if (Sudoku.getCell(row, col) == 0)
            return [row, col];
      return [-1, -1];
    },
  };

  return {
    init: SudokuSolver.init
  };
})(Sudoku);
