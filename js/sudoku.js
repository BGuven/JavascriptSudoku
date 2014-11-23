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
      this.grid[row][col] = val;
    },

    getCell: function(row, col) {
      return this.grid[row][col];
    },

    noConflicts: function(row, col, num) {
      return this.isRowOk(row, num) && this.isColOk(col, num) && this.isBoxOk(row, col, num);
    },

    isRowOk: function(row, num) {
      for (var col = 0; col < this.GRID_SIZE; col++)
        if (this.grid[row][col] == num)
          return false;

      return true;
    },

    isColOk: function(col, num) {
      for (var row = 0; row < this.GRID_SIZE; row++)
        if (this.grid[row][col] == num)
          return false;

      return true;
    },

    isBoxOk: function(row, col, num) {
      row = Math.floor(row / 3) * 3;
      col = Math.floor(col / 3) * 3;

      for (var r = 0; r < 3; r++)
        for (var c = 0; c < 3; c++)
          if (this.grid[row + r][col + c] == num)
            return false;

      return true;
    }
  };

  return {
    Sudoku.GRID_SIZE,
    Sudoku.getCell,
    Sudoku.setCell,
    Sudoku.noConflicts
  };
})();
