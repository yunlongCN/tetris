var CONST = {
    SPACE: 20,
    NOSHAPE: 0,
    
    COLOR_SHAPE: [1,2,3,4,5,6,7],
    COLOR_GROUND: 8,
    
    DIRECTION_DOWN: 1,
    DIRECTION_LEFT: 2,
    DIRECTION_RIGHT: 3,
    DIRECTION_ROTATE: 4,

    INIT_SHAPE_TOP: 0,
    INIT_SHAPE_LEFT: 100,
    INIT_SHAPE_VELOCITY: 1000, //1second

    KEYCODE_LEFT: 37,
    KEYCODE_UP: 38,
    KEYCODE_RIGHT: 39,
    KEYCODE_DOWN: 40,
    
    INIT_LEVEL: 1,
    LEVEL_UP_SCORE: 2

};

CONST.DEBUG = false;

CONST.SHAPE = !CONST.NOSHAPE;
CONST.MOVESTEP = CONST.SPACE;
CONST.IMAGE_READY = false;

SHAPE_VELOCITY = CONST.INIT_SHAPE_VELOCITY;
GAME_LEVEL = CONST.INIT_LEVEL;
LEVEL_UP_VELOCITY = 0.1*CONST.INIT_SHAPE_VELOCITY;

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

var img = new Image();
img.onload = function(){
    CONST.IMAGE_READY = true;
}
img.src = "style/image/blocks208.png";
CONST.IMAGE_SHAPE = img;

function $(id) {
    if (typeof id == "string") {
        return document.getElementById(id);
    }
    return id;
}

function fade(options){
    var batch=options.batch||10;
    var interval=options.interval||10;
    var initValue=options.initValue;
    var fadeValue=options.fadeValue;
    var setFunc=options.setFunc;
    var callback=options.callback;
    
    var j=0;
    function callFade(){
            var changedValue=fadeValue*Math.sin(Math.PI*(j+1)/(2*batch));//Math.round();
            var ret=setFunc(initValue,changedValue);
            if( j==batch-1 || ret===false ){
                if(typeof callback=='function'){
                     callback();
                }
                return;
            }
            j++;
            setTimeout(callFade,interval);
    }
    
    callFade();
}

function fadeMove(obj,left,move,callback){
    obj.style.left=left+'px';
    obj.classList.remove('none');
    fade({
        batch : 10,
        interval : 20,
        initValue: left,
        fadeValue: Math.abs(move),
        setFunc : function(initValue, changedValue) {
            obj.style.left = ( initValue + (move>0?changedValue:-changedValue) ) + 'px';
        },
        callback:callback
    });
}

var btnStart = $("btnStart"),
    btnPause = $("btnPause"),
    startView = $("view-start"),
    gameView = $("view-game"),
    btnLeft = $("btnLeft"),
    btnUp = $("btnUp"),
    btnRight = $("btnRight"),
    btnDown = $("btnDown")
    panelGamepad = $("ui-control");

btnStart.onclick = function(){
    if (!CONST.IMAGE_READY) {
        alert("资源加载中...");
        return;
    }
    startView.classList.add('none');

    var view = gameView;
    var opacity = 0;

    function showSplash() {
        opacity += 0.1;
        if (opacity >= 1) {
            opacity = 1;
        }
        view.style.opacity = opacity;
        if (opacity < 1) {
            setTimeout(showSplash, 50);
        } else {
            game.init({
                btnPause : btnPause,
                btnLeft : btnLeft,
                btnUp : btnUp,
                btnRight : btnRight,
                btnDown : btnDown,
                panelGamepad : panelGamepad
            }).start();
        }
    }
    
    view.style.opacity = opacity;
    view.classList.remove('none');
    showSplash();
}

function pauseGame(){
    if (!game.isRunning() || game.isPause()) {
        return;
    }
    game.pause();
    var obj = $('ui-pause');
    var width = gameView.clientWidth;

    fadeMove(obj,-width,width);

    $("btnResume").onclick = function() {
        fadeMove(obj,0,-width,function(){
            obj.classList.add('none');
            game.pause();
        });
    };
    
    $("btnQuit").onclick = function(){
        fadeMove(obj,0,-width,function(){
            obj.classList.add('none');
            game.over();
            gameView.classList.add('none');
            startView.classList.remove('none');
        });
    };
}

btnPause.onclick = pauseGame;

window.onblur = pauseGame;