// Generated by CoffeeScript 1.8.0
(function() {
  var Board, board, neibour,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  board = function(w, h, f) {
    var _i, _ref, _results;
    return (function() {
      _results = [];
      for (var _i = 0, _ref = h - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this).map(function(i) {
      var _i, _ref, _results;
      return (function() {
        _results = [];
        for (var _i = 0, _ref = w - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this).map(function(j) {
        return f(i, j);
      });
    });
  };

  neibour = function(x, y, f) {
    var dx, dy, _i, _len, _ref, _results;
    _ref = [-1, 0, 1];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      dy = _ref[_i];
      _results.push((function() {
        var _j, _len1, _ref1, _results1;
        _ref1 = [-1, 0, 1];
        _results1 = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          dx = _ref1[_j];
          if (dx !== 0 || dy !== 0) {
            _results1.push(f(x + dx, y + dy));
          }
        }
        return _results1;
      })());
    }
    return _results;
  };

  Board = (function() {
    function Board(width, height) {
      this.width = width;
      this.height = height;
      this.board = board(this.width, this.height, function() {
        return false;
      });
    }

    Board.prototype.next = function() {
      var b, f, h, w;
      w = this.width;
      h = this.height;
      b = this.board;
      f = function(i, j) {
        var c, g;
        c = 0;
        g = function(x, y) {
          if (0 <= x && x < h && 0 <= y && y < w) {
            if (b[x][y]) {
              return c += 1;
            }
          }
        };
        neibour(i, j, g);
        return 3 <= c && c <= 5;
      };
      return this.board = board(this.width, this.height, f);
    };

    Board.prototype.show = function() {
      this.board.map(function(r) {
        return console.log((r.map(function(c) {
          if (c) {
            return "*";
          } else {
            return ".";
          }
        })).join(""));
      });
      return console.log("");
    };

    return Board;

  })();

  Window.Board = (function(_super) {
    __extends(Board, _super);

    function Board() {
      return Board.__super__.constructor.apply(this, arguments);
    }

    return Board;

  })(Board);

}).call(this);
