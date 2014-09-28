
function register_default_models(gl) {
    gl.models.push(Grid_1(gl));
    gl.models.push(Grid_2(gl));
    gl.models.push(Polygon(gl));
}

var default_z_index = 0;

function Grid_1(gl) {
    var vertices = create_grid_vertices(
	[-5, -5, default_z_index],
	[10, 0, 10],
	[0, 10, 10],
	10, 10);

    var green = [0, 1, 0, 1];
    var model = single_color_vertices_to_buffer(gl, vertices, green, gl.LINES);
    return model;
}

function Grid_2(gl) {
    var vertices = create_grid_vertices(
	[-5, -5, 0],
	[10, 0, 0],
	[0, 10, 0],
	20, 20);
    var red = [1, 0, 0, 0];
    var model = single_color_vertices_to_buffer(gl, vertices, red, gl.LINES);
    return model;
}

function Polygon(gl) {
    var w = 1.5;
    var h = 1.5;
    var vertices = [
	[0, 0, 0],
	[w, 0, 0],
	[w, h, 0],
	[w, h, 0],
	[0, h, 0],
	[0, 0, 0],
    ];

    var blue = [0, 0, 1, 0.5];
    var model = single_color_vertices_to_buffer(gl, vertices, blue, gl.TRIANGLES);
    return model;
}

function create_grid_vertices(o, p, q, np, nq) {
    var vertices = [];
    function add_line(s, t) {
	vertices.push(s.slice());
	vertices.push(t.slice());
    }
    function f(s, t, v, n) {
	add_line(s, t);
	var d = vec3.scale(vec3.create(), v, 1 / n);
	for (var i=0; i < n; ++i) {
	    vec3.add(s, s, d);
	    vec3.add(t, t, d);
	    add_line(s, t);
	}
    }
    f(o.slice(), vec3.add(o.slice(), o, p), q, nq);
    f(o.slice(), vec3.add(o.slice(), o, q), p, np);
    return vertices;
}

function chessboard(gl){

}
