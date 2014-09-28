
function GLViewer(gl) {
    var viewer = new GL2dViewer(20, 20);
    //var viewer = new GL3dViewer(gl);
    this.setView = function() {
	viewer.setView(gl);
    }
}

function GL2dViewer(width, height) {
    var left = -width / 2;
    var right = width / 2;
    var bottom = -height / 2;
    var top = height / 2;
    var near = 0.1;
    var far = 2000;

    var eye = [0, 0, 1000];
    var center = [0, 0, 0];
    var up = [0, 1, 0];

    this.setView = function(gl) {
	mat4.identity(gl.pMatrix);
	mat4.ortho(gl.pMatrix,
		   left, right, bottom, top, near, far);
	mat4.identity(gl.mvMatrix);
	mat4.lookAt(gl.mvMatrix, eye, center, up);
	gl.setMatrixUniforms();
    }
}

function GL3dViewer() {
    // model transform
    var tx = 0;
    var ty = 0;
    var tz = 0;

    var thx = 0;
    var thy = 0;
    var thz = 0;

    var sx = 1;
    var sy = 1;
    var sz = 1;

    var sr = 1;

    // view transform
    var fovy = 45;
    var aspect = 1;
    var near = 0.1;
    var far = 2000;

    var eye = [0, 0, 100];
    var center = [0, 0, 0];
    var up = [0, 1, 0];

    this.setView = function(gl) {
	logger.info("setting view");
	mat4.identity(gl.pMatrix);
	mat4.perspective(gl.pMatrix, fovy, aspect, near, far);
	mat4.identity(gl.mvMatrix);
	mat4.lookAt(gl.mvMatrix, eye, center, up);
	gl.setMatrixUniforms();
    }
}
