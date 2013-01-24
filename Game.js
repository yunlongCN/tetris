var game = {
	ctx: null,
	ground: null,
	shape: null,
    btnLeft: null,
    btnUp: null,
    btnRight: null,
    btnDown: null,
    panelGamepad: null,
	// btnStart: null,
	btnPause: null,
	
	init: function(options){
		if(!this.ctx){
			var canvas = document.getElementById('gamePanel');
			this.ctx = canvas.getContext('2d'); 
		    this.ground = new Ground(this.ctx, canvas.width, canvas.height);
            this.btnLeft = options.btnLeft;
            this.btnUp = options.btnUp;
            this.btnRight = options.btnRight;
            this.btnDown = options.btnDown;
            this.panelGamepad = options.panelGamepad;
            //this.btnStart = btnStart;
            this.btnPause = options.btnPause;
		}
		// this.shape = ShapeFactory.newShape(this.ctx);
		return this;
	},
	isRunning: function(){
	    return !!this.shape;  
	},
	start: function(){
		var This = this;
		This.onKeypress = function(e){
		  	utils.control.gamePad(e, This);
		};
		document.addEventListener("keypress", This.onKeypress);
		function doListen(callback){
		    return function(e){
		        e.preventDefault();
                e.stopPropagation();
                callback();
		    };
		}
		This.btnLeft.onclick = doListen(function(){
		    This.moveShapeLeft();
		});
		This.btnUp.onclick = doListen(function(){
		    This.rotateShape();
		});
		This.btnRight.onclick = doListen(function(){
		    This.moveShapeRight();
		});
		This.btnDown.onclick = doListen(function(){
		    This.moveShapeDown();
		});
		This.newShape();
		console.log("game start.");
	},
	pause: function(){
		var This = this;
		if (This.pauseFlag) {
			This.shape.auto(This);
			document.addEventListener("keypress", This.onKeypress);
			This.btnPause.classList.remove("none");
			This.panelGamepad.classList.remove("none");
			This.pauseFlag = false;
		} else {
			This.shape.auto(This, true);
			document.removeEventListener("keypress", This.onKeypress);
			This.btnPause.classList.add("none");
			This.panelGamepad.classList.add("none");
			This.pauseFlag = true;
		}
	},
	isPause: function(){
	    return !!this.pauseFlag;
	},
	moveShapeLeft: function(){
		if (utils.logic.canMoveLeft(this)) {
			this.shape.moveLeft();
		}
	},
	moveShapeRight: function(){
		if (utils.logic.canMoveRight(this)) {
			this.shape.moveRight();
		}
	},
	moveShapeDown: function(){
		if (utils.logic.canMoveDown(this)) {
			this.shape.moveDown();
		}
	},
	rotateShape: function(){
		if (utils.logic.canRotate(this)) {
			this.shape.rotate();
		}
	},
	over: function(quit){
		var This = this;
		This.shape.auto(This, true);
		This.shape.dispose();
		This.shape = null;
		if (quit) {
		  This.ground.dispose();
		  This.ground = null;  
		  This.ctx = null;
		} else {
		  This.ground.clear();
		  This.btnPause.classList.remove("none");
		  This.panelGamepad.classList.remove("none");
		  This.pauseFlag = false;
		}
		utils.control.markClear();
		document.removeEventListener("keypress", This.onKeypress);
	},
	newShape: function(){
		this.shape = null;
		this.shape = ShapeFactory.newShape(this.ctx);
		this.shape.drawShape();
		this.shape.auto(this);
	},
	upLevel: function(){
	    if (SHAPE_VELOCITY==LEVEL_UP_VELOCITY) {
	        LEVEL_UP_VELOCITY *= 0.1;
	    }
	    SHAPE_VELOCITY -= LEVEL_UP_VELOCITY;
	    GAME_LEVEL += 1;
	},
	test: function(){
		console.log("test draw");
		this.newShape();
		//this.shape.drawShape();
		//this.shape.auto(this);
		// window.setInterval(function(){
			// shape.rotate();
		// }, 2000);
		//utils.graphics.drawRect(this.ctx, CONST.LEFT, CONST.TOP);
	},
};