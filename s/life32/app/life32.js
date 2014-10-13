
function new_board(width, height) {
    var board = new Array(height);
    for (var i=0; i < height; ++i) {
	board[i] = new Array(width);
	for (var j=0; j < width; ++j) {
	    board[i][j] = false;
	}
    }
    return board;
}

function next_state(last, near) {
    if (near > 5) return false;
    if (near < 3) return false;
    return true;
}

function for2d(width, height, f) {
    for (var i=0; i < height; ++i) {
	for (var j=0; j < width; ++j) {
	    f(i, j);
	}
    }
}

function for_neighbour8(i, j, width, height, f) {
    const dx = [-1, 0, 1, 0, -1, 1, -1, 1];
    const dy = [0, -1, 0, 1, -1, 1, 1, -1];
    for (var k=0; k < 8; ++k) {
	var x = i + dx[k];
	var y = j + dy[k];
	if (0 <= x && x < width && 0 <= y && y < height) {
	    f(x, y);
	}
    }
}

function Board(width, height) {
    return {
	board: new_board(width, height),
	next: function() {
	    var board = this.board;
	    const dx = [-1, 0, 1, 0, -1, 1, -1, 1];
	    const dy = [0, -1, 0, 1, -1, 1, 1, -1];
	    var tmp = new_board(width, height);
	    var change = 0;
	    for2d(width, height, function(i, j){
		var c = 0;
		for_neighbour8(i, j, width, height, function(x, y){
		    if (board[x][y]) {
			++c;
		    }
		});
		tmp[i][j] = next_state(board[i][j], c);
		if (tmp[i][j] != board[i][j]) {
		    ++change;
		}
	    });

	    this.board = tmp;
	    return change;
	},

	init: function() {
	    var board = this.board;
	    for (var i=9; i < 12; ++i) {
		for (var j=9; j < 12; ++j) {
		    board[i][j] = true;
		}
	    }
	},

	rand_init: function() {
	    var board = this.board;
	    var p = 0.2;
	    for2d(width, height, function(i, j) {
		board[i][j] = Math.random() < p;
	    });
	},
    }
}

function Life32(width, height) {
    var b = Board(width, height);
    //b.rand_init();
    b.init();

    var z_index = 0;
    var o = [-10, -10, z_index];
    var x = [20, 0, z_index];
    var y = [0, 20, z_index];

    this.play = function() {
	b.next();
    }

    this.grid = function() {
	var vertices = [];
	var colors = [];
	function add(arr, more) {
	    return arr.concat(more.map(function(x){return x.slice();}));
	}
	var dx = vec3.scale(vec3.create(), x, 1 / width);
	var dy = vec3.scale(vec3.create(), y, 1 / height);
	var p = o.slice();
	for (var i=0; i < width; ++i) {
	    var p1 = p.slice();
	    for (var j=0; j < height; ++j) {
		var p2 = vec3.add([0,0,0], p1, dx)
		var p3 = vec3.add([0,0,0], p2, dy);
		var p4 = vec3.add([0,0,0], p1, dy);
		var c = [j / height, i / width, 0, 0.5];
		var c1 = [0, 1, 0, 0.5];
		var c2 = [1, 0, 1, 0.5];
		vertices = add(vertices, [p1, p2, p3, p3, p4, p1]);
		if (b.board[i][j]) {
		    c = c1;
		}
		else {
		    c = c2;
		}
		colors = add(colors, [c, c, c, c, c, c]);
		vec3.add(p1, p1, dy);
	    }
	    vec3.add(p, p, dx);
	}

	this.create_model = function(gl) {
	    var model = {};
	    model.size = vertices.length;
	    model.vertex = create_vertex_buffer(gl, vertices);
	    model.color = create_color_buffer(gl, colors);
	    model.mode = gl.TRIANGLES;
	    return model;
	}

	this.line_model = function(gl) {
	    var o1 = o.slice();
	    o1[2] = 1;
	    var vertices = create_grid_vertices(o1, x, y, width, height);
	    var color = [0,0,0,1];
	    return single_color_vertices_to_buffer(gl, vertices, color, gl.LINES);
	}

    }
}

var g_game;

function update() {
    g_game.play();
    var grid = new g_game.grid();
    var model = grid.create_model(g_gl);
    var line = grid.line_model(g_gl);
    g_gl.models = [];
    g_gl.models.push(line);
    g_gl.models.push(model);
    g_gl.display();
}

function init_life32() {
    g_view.ortho_mode = true;
    logger.info = function(){};
    var width = 21;
    var height = 21;
    var game = new Life32(width, height);
    g_game = game;
}
