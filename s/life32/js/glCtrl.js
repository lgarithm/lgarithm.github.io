
function Controller(viewer){
    var viewer = viewer;

    this.left = function(){
	console.log("left");
	viewer.model_x(-1);
    }
    this.right = function(){
	console.log("right");
	viewer.model_x(1);
    }
    this.up = function(){
	console.log("up");
    }
    this.down = function(){
	console.log("down");
    }
    this.page_up = function(){
	console.log("page up");
	viewer.move_back(1);
    }
    this.page_down = function(){
	console.log("page down");
	viewer.move_back(-1);
    }
}

var ctrl;
function initCtrl(gl){
    ctrl = new Controller(gl.viewer);
}

var currentlyPressedKeys = {};

function handleKeyDown(event) {
    currentlyPressedKeys[event.keyCode] = true;
    console.log(event.keyCode);

    switch (event.keyCode) {
    case 33:
	ctrl.page_up();
	break;
    case 34:
	ctrl.page_down();
	break;
    case 37:
	ctrl.left();
	break;
    case 38:
	ctrl.up();
	break;
    case 39:
	ctrl.right();
	break;
    case 40:
	ctrl.down();
	break;
    default:
	break;
    }
}

function handleKeyUp(event) {
    currentlyPressedKeys[event.keyCode] = false;
}
