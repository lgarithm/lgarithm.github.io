
function register_default_models(gl) {
    var ms = create_cube_grid(5, gl);
    for (var i in ms) {
	gl.models.push(ms[i]);
    }
}

function create_polygon_vertices(vec) {
    if (vec.length < 3) {
	return [];
    }
    var vertices = [];
    vec = vec.slice();
    var o = vec.shift();
    var p = vec.shift();
    while (vec.length > 0) {
	var q = vec.shift();
	vertices.push(o.slice());
	vertices.push(p.slice());
	vertices.push(q.slice());
	p = q;
    }
    return vertices;
}

function create_quad_grid(a, b, c, d, m, n){
    var vertices = [];
    function f(s, s1, t, t1, k) {
	function add_line(s, t) {
	    vertices.push(s.slice());
	    vertices.push(t.slice());
	}

	function d(s, s1) {
	    var ds = vec3.sub(vec3.create(), s1, s);
	    vec3.scale(ds, ds, 1 / k);
	    return ds;
	}
	var ds = d(s, s1);
	var dt = d(t, t1);
	add_line(s, t);
	s = s.slice();
	t = t.slice();
	for (var i=0; i < k; ++i) {
	    vec3.add(s, s, ds);
	    vec3.add(t, t, dt);
	    add_line(s, t);
	}
    }
    f(a, b, d, c, m);
    f(a, d, b, c, n);
    return vertices;
}

function create_grid_vertices(o, p, q, np, nq) {
    var o1 = o.slice();
    var o2 = o.slice();
    var o3 = o.slice();
    vec3.add(o1, o, p);
    vec3.add(o2, o1, q);
    vec3.add(o3, o, q);
    return create_quad_grid(o, o1, o2, o3, np, nq);
}

function gen_cube_vertices(r) {
    var p = [0,0,0];
    for (var i=0; i < 3; ++i) {
	p = [p.slice(), p.slice()];
    }
    var x = r;
    var y = r;
    var z = r;
    var px = [-x, x];
    var py = [-y, y];
    var pz = [-z, z];
    var vertices = [];
    for (var i in px) {
	for (var j in py) {
	    for (var k in pz) {
		var vertice = [px[i], py[j], pz[k]];
		vertices.push(vertice);
	    }
	}
    }
    return vertices;
}

function gen_cube_faces(vertices) {
    const idx = [
	[0, 1, 3, 2],
	[4, 6, 7, 5],
	[0, 4, 5, 1],
	[2, 3, 7, 6],
	[0, 2, 6, 4],
	[1, 5, 7, 3],
    ];
    var faces = [];
    for (var i = 0; i < 6; ++i) {
	var face = [];
	for (var j=0; j < 4; ++j) {
	    face.push(vertices[idx[i][j]].slice());
	}
	faces.push(face);
    }
    return faces;
}

function create_cube_grid(r, gl) {
    var vertices = gen_cube_vertices(r);
    function m(f1, f2) {
	var f = [];
	for (var i=0; i < 4; ++i) {
	    var p = [0,0,0];
	    vec3.add(p, f1[i], f2[(4-i)%4]);
	    vec3.scale(p, p, 0.5);
	    f.push(p);
	}
	return f;
    }
    function f(face) {
	var n = 32;
	return create_quad_grid(face[0], face[1], face[2], face[3], n, n);
    }
    var faces = gen_cube_faces(vertices);
    var c = [];
    c.push(m(faces[0], faces[1]));
    c.push(m(faces[2], faces[3]));
    c.push(m(faces[4], faces[5]));

    var models = [];
    for (var i in faces) {
	var vv = f(faces[i]);
	var color = [.3, .5, .7, 0.3];
	models.push(single_color_vertices_to_buffer(gl, vv, color, gl.LINES));
    }

    for (var i in c) {
	var vv = create_polygon_vertices(c[i]);
	var color = [0, 0, 0, 0.3];
	color[i] = 1;
	models.push(single_color_vertices_to_buffer(gl, vv, color, gl.TRIANGLES));
    }
    return models;
}

function chessboard(gl){

}
