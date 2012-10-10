var CONST = {};
CONST.SPACE = 50;
CONST.NOSHAPE = 0;
CONST.SHAPE = !CONST.NOSHAPE;
CONST.TOP = 100;
CONST.LEFT = 200;
CONST.AUTO = 1000;
CONST.MOVESTEP = CONST.SPACE;

CONST.COLOR_SHAPE = ["#FF0000", "#00FF00", "#0000FF"];
CONST.COLOR_GROUND = "#909090";

CONST.DIRECTION_DOWN = 1;
CONST.DIRECTION_LEFT = 2;
CONST.DIRECTION_RIGHT = 3;
CONST.DIRECTION_ROTATE = 4;

CONST.INIT_SHAPE_TOP = 0;
CONST.INIT_SHAPE_LEFT = 200;

CONST.KEYCODE_LEFT = 37;
CONST.KEYCODE_UP = 38;
CONST.KEYCODE_RIGHT = 39;
CONST.KEYCODE_DOWN = 40;

CONST.DEBUG = false;

var console = {
	panel: null,
	log: function(msg){
		if (!CONST.DEBUG) {
			return;
		}
		var This = this;
		if (!This.panel) {
			This.panel = document.getElementById('console');
		}
		window.setTimeout(function(){
			This.panel.innerHTML = ""+ msg+ "<br/>" + This.panel.innerHTML;
		}, 100);
	}
}