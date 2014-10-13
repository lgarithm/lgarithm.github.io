
var g_view = g_view || {};
var g_trans = g_trans || {};

(function(view) {
    view.ortho_mode = false;

    view.fovy = 45;
    view.aspect = 1;
    view.near = 0.1;
    view.far = 2000;

    view.width = 20;
    view.height = 20;
    view.left = - view.width / 2;
    view.right = view.width / 2
    view.top = view.height / 2;
    view.bottom = - view.height / 2;

    view.eye = [0, 0, 20];
    view.center = [0, 0, 0];
    view.up = [0, 1, 0];
})(g_view);

(function(trans) {
    trans.move = {
	zoom: function(x) {
	    vec3.scale(trans.scale, trans.scale, x);
	},
	rotateX: function(r) {
	    mat4.rotateX(trans.rotate, trans.rotate, r * Math.PI / 180);
	},
	rotateY: function(r) {
	    mat4.rotateY(trans.rotate, trans.rotate, r * Math.PI / 180);
	},
	rotateZ: function(r) {
	    mat4.rotateZ(trans.rotate, trans.rotate, r * Math.PI / 180);
	},
	revert: function() {
	    trans.scale = [1, 1, 1];
	    trans.rotate = mat4.create();
	    mat4.identity(trans.rotate);
	},
    };
})(g_trans);

g_trans.move.revert();

function GLViewer(gl) {
    this.setView = function() {
	var view = g_view;
	var trans = g_trans;

	mat4.identity(gl.pMatrix);
	if (view.ortho_mode) {
	    mat4.ortho(gl.pMatrix,
		       view.left, view.right, view.bottom, view.top,
		       view.near, view.far);
	} else {
	    mat4.perspective(gl.pMatrix,
			     view.fovy * Math.PI / 180,
			     view.aspect, view.near, view.far);
	}
	mat4.identity(gl.mvMatrix);
	mat4.lookAt(gl.mvMatrix, view.eye, view.center, view.up);
	mat4.scale(gl.mvMatrix, gl.mvMatrix, trans.scale);
	mat4.mul(gl.mvMatrix, gl.mvMatrix, trans.rotate);
	gl.setMatrixUniforms();
    }
}
