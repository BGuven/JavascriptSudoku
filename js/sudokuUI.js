var SudokuUI = $.extend({}, Sudoku, (function(){
  "use strict"

  var SudokuUI = {
    init: function(){
      this.setupHtml();
      this.setupHoverEffect();
    },

    printGrid: function() {
      var res = "";

      for (var i = 0; i < this.GRID_SIZE; i++) {
        for (var j = 0; j < this.GRID_SIZE; j++) {
          res += this.getCell(i, j);
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

      for (var i = 0; i < this.GRID_SIZE; i++) {
        var $row = $('<div />', {
          "class": "row"
        });

        for (var j = 0; j < this.GRID_SIZE; j++) {
          $div.html(this.getCell(i, j));
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
})());
