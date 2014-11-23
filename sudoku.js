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

    init: function() {
      // this.generateRandomGrid();
      // this.solveSudoku();
      // this.setupHtml();
      // this.setupHoverEffect();
    },

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

  return Sudoku;
})();


var SudokuSolver = (function(sudoku){
  var SudokuSolver = {
    sudokuObject: Sudoku,
    numberOfTries: 0,
    MAX_BACKTRACK_LIMIT: 50000,

    init: function(){
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

    getRandumIntegerInRange: function(low, up) {
      return low + Math.floor(Math.random() * up);
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

var SudokuUI = (function(sudoku){
  var SudokuUI = {
    init: function(){
      this.setupHtml();
      this.setupHoverEffect();
    },

    printGrid: function() {
      var res = "";

      for (var i = 0; i < sudoku.GRID_SIZE; i++) {
        for (var j = 0; j < sudoku.GRID_SIZE; j++) {
          res += sudoku.getCell(i, j);
        }
        res += "\n";
      }
      console.log(res);
    },

    setupHtml: function() {
      var $div = $('<div />', {
        "class": "cell",
        "contenteditable": "true"
      });

      for (var i = 0; i < sudoku.GRID_SIZE; i++) {
        var $row = $('<div />', {
          "class": "row"
        });

        for (var j = 0; j < sudoku.GRID_SIZE; j++) {
          $div.html(sudoku.getCell(i, j));
          $row.append($div.clone());
        };

        $('#content').append($row);
      }
    },

    setupHoverEffect: function() {
      var sel = null; // Reference to selected elements.

      $('.cell').hover(function() {
        var num = $(this).html();
        if (num) {
          sel = $(".cell:contains('" + num + "')");
          $.each(sel, function() {
            $(this).addClass('hover');
          });
        }
      }, function() {
          $.each(sel, function() {
            $(this).removeClass('hover');
          });
      });
    }
  };

  return SudokuUI;
})(Sudoku);

SudokuSolver.init();
SudokuUI.init();
