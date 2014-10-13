
function initGL(canvas) {
    var gl;
    try {
	gl = canvas.getContext("webgl");
	gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch (e) {
    }
    if (!gl) {
        alert("Could not initialise WebGL, sorry :-(");
    }
    return gl;
}

function getShader(gl, id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent;
        }
        k = k.nextSibling;
    }

    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

function initShaders(gl) {
    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute =
	gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    shaderProgram.vertexColorAttribute =
	gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");

    gl.shaderProgram = shaderProgram;
    return shaderProgram;
}

function initGLCanvas(canvas_id) {
    logger.info("init GL Canvas");

    var canvas = document.getElementById(canvas_id);
    var gl = initGL(canvas);
    initShaders(gl);

    gl.mvMatrix = mat4.create();
    gl.pMatrix = mat4.create();

    gl.setMatrixUniforms = function() {
	gl.uniformMatrix4fv(gl.shaderProgram.mvMatrixUniform, false, gl.mvMatrix);
	gl.uniformMatrix4fv(gl.shaderProgram.pMatrixUniform, false, gl.pMatrix);
    }

    //gl.enable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
    //gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.clearColor(0.0, 0.0, 0.0, 0.5);
    return gl;
}

function create_buffer(gl, points, size) {
    var merged = [];
    merged = merged.concat.apply(merged, points);

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(merged), gl.STATIC_DRAW);

    buffer.itemSize = size;
    buffer.numItems = points.length;
    return buffer;
}

function create_vertex_buffer(gl, vertices) {
    return create_buffer(gl, vertices, 3);
}

function create_color_buffer(gl, colors) {
    return create_buffer(gl, colors, 4);
}

function create_single_color_buffer(gl, color, n) {
    var colors = [];
    for (var i=0; i < n; ++i) {
	colors.push(color);
    }
    return create_color_buffer(gl, colors);
}

function draw_model(gl, model) {
    gl.bindBuffer(gl.ARRAY_BUFFER, model.vertex);
    gl.vertexAttribPointer(gl.shaderProgram.vertexPositionAttribute,
			   model.vertex.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, model.color);
    gl.vertexAttribPointer(gl.shaderProgram.vertexColorAttribute,
			   model.color.itemSize, gl.FLOAT, false, 0, 0);
    gl.drawArrays(model.mode, 0, model.size);
}

function single_color_vertices_to_buffer(gl, vertices, color, mode) {
    var model = {};
    model.size = vertices.length;
    model.vertex = create_vertex_buffer(gl, vertices);
    model.color = create_single_color_buffer(gl, color, vertices.length);
    model.mode = mode
    return model;
}

function Logger(prefix) {
    this.prefix = "";
    this.on = true;

    if (prefix) {
	this.prefix = prefix;
    }
    var idx = 0;
    this.info = function(msg) {
	if (this.on) {
	    ++idx;
	    console.log(this.prefix + "[info] " + idx + "# " + msg)
	}
    }
}

var logger = new Logger("<DEBUG-LOG>");

function display(gl) {
    logger.info("display");
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewer.setView();
    gl.models.map(function(m){draw_model(gl, m);});
}

function GLContext(){

}

var g_gl;
var g_viewer;

function webGLStart() {
    logger.info("starting webGL")
    var gl = initGLCanvas("c");
    gl.display = function(){display(gl)};
    gl.viewer = new GLViewer(gl);
    gl.models = [];
    register_default_models(gl);

    g_viewer = gl.viewer;
    g_gl = gl;
    g_gl.display();
}

function update() {
    g_gl.display();
}
