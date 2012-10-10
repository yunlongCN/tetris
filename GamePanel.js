var gamePanel = {
	ctx : null,
	ground : null,
	shape : null,
	btnStart : null,
	btnPause : null,
	
	init : function(btnStart, btnPause){
		if(!this.ctx){
			var canvas = document.getElementById('gamePanel');
			this.ctx = canvas.getContext('2d'); 
		}
		this.ground = new Ground(this.ctx, 500, 800);
		this.btnStart = btnStart;
		this.btnPause = btnPause;
		// this.shape = ShapeFactory.newShape(this.ctx);
		return this;
	},
	start : function(){
		var This = this;
		This.onKeypress = function(e){
			utils.control.gamePad(e, This);
		};
		document.addEventListener("keypress", This.onKeypress);
		This.newShape();
		console.log("game start.");
	},
	pause : function(){
		var This = this;
		This.btnPause.disabeld = true;
		if (This.pauseFlag) {
			This.shape.auto(This);
			document.addEventListener("keypress", This.onKeypress);
			This.btnPause.innerHTML = "Pause";
			This.pauseFlag = false;
		} else {
			This.shape.auto(This, true);
			document.removeEventListener("keypress", This.onKeypress);
			This.btnPause.innerHTML = "Continue";
			This.pauseFlag = true;
		}
		This.btnPause.disabeld = false;
	},
	moveShapeLeft : function(){
		if (utils.logic.canMoveLeft(this)) {
			this.shape.moveLeft();
		}
	},
	moveShapeRight : function(){
		if (utils.logic.canMoveRight(this)) {
			this.shape.moveRight();
		}
	},
	moveShapeDown : function(){
		if (utils.logic.canMoveDown(this)) {
			this.shape.moveDown();
		}
	},
	rotateShape : function(){
		if (utils.logic.canRotate(this)) {
			this.shape.rotate();
		}
	},
	over : function(){
		var This = this;
		this.shape.dispose();
		this.ground.dispose();
		this.shape = null;
		this.ground = null;
		this.btnStart.disabled = false;
		this.btnPause.disabled = true;
		document.removeEventListener("keypress", This.onKeypress);
	},
	newShape : function(){
		this.shape = null;
		this.shape = ShapeFactory.newShape(this.ctx);
		this.shape.drawShape();
		this.shape.auto(this);
	},
	test : function(){
		console.log("test draw");
		this.shape.drawShape();
		this.shape.auto(this);
		// window.setInterval(function(){
			// shape.rotate();
		// }, 2000);
		//utils.graphics.drawRect(this.ctx, CONST.LEFT, CONST.TOP);
	},
};