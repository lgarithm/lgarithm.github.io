
var g_keys = g_keys || {};

var currentlyPressedKeys = g_keys;

function key_action(code, trans) {
    // 0, 1, ... -> 48, 49 ...
    // a, b, ... -> 65, 66

    switch(code){
    case 32: {
	trans.move.revert();
	break;
    }
    case 49: {
	trans.move.zoom(0.9);
	break;
    }
    case 50: {
	trans.move.zoom(1.1);
	break;
    }
    case 51:
    case 65: {
	trans.move.rotateZ(-10);
	break;
    }
    case 52:
    case 68: {
	trans.move.rotateZ(10);
	break;
    }
    case 53: {
	trans.move.rotateY(-10);
	break;
    }
    case 54: {
	trans.move.rotateY(10);
	break;
    }
    case 55: {
	trans.move.rotateX(-10);
	break;
    }
    case 56: {
	trans.move.rotateX(10);
	break;
    }
    default: {
	logger.info("no action defined; keycode: " + code);
	break;
    }
    }
}

function handleKeyDown(e) {
    currentlyPressedKeys[e.keyCode] = true;
    var trans = g_trans
    key_action(e.keyCode, trans);
    update();
}

function handleKeyUp(e) {
    currentlyPressedKeys[e.keyCode] = false;
}
