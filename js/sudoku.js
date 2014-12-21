var Sudoku = (function() {
  "use strict"

  var Sudoku = {
    GRID_SIZE: 9,

    grid: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],

    setCell: function(row, col, val){
      Sudoku.grid[row][col] = val;
    },

    getCell: function(row, col) {
      return Sudoku.grid[row][col];
    },

    noConflicts: function(row, col, num) {
      return Sudoku._isRowOk(row, num) && Sudoku._isColOk(col, num) && Sudoku._isBoxOk(row, col, num);
    },

    _isRowOk: function(row, num) {
      for (var col = 0; col < Sudoku.GRID_SIZE; col++)
        if (Sudoku.grid[row][col] == num)
          return false;

      return true;
    },

    _isColOk: function(col, num) {
      for (var row = 0; row < Sudoku.GRID_SIZE; row++)
        if (Sudoku.grid[row][col] == num)
          return false;

      return true;
    },

    _isBoxOk: function(row, col, num) {
      row = Math.floor(row / 3) * 3;
      col = Math.floor(col / 3) * 3;

      for (var r = 0; r < 3; r++)
        for (var c = 0; c < 3; c++)
          if (Sudoku.grid[row + r][col + c] == num)
            return false;

      return true;
    }
  };

  return {
    GRID_SIZE:   Sudoku.GRID_SIZE,
    getCell:     Sudoku.getCell,
    setCell:     Sudoku.setCell,
    noConflicts: Sudoku.noConflicts
  };
})();
