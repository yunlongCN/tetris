function Shape(ctx, body, top, left, color){
	this.body = utils.clone(body);
	this.ctx = ctx;
	this.top = top;
	this.left = left;
	this.oldtop = top;
	this.oldleft = left;
	this.oldbody = utils.clone(body);
	this.rotated = false;
	this.color = color;
}

Shape.prototype.moveLeft = function(){
	this.left -= CONST.MOVESTEP;
	this.drawShape();
	console.log("moved left");
}

Shape.prototype.moveRight = function(){
	this.left += CONST.MOVESTEP;
	this.drawShape();
	console.log("moved right");
}

Shape.prototype.moveDown = function(){
	this.top += CONST.MOVESTEP;
	this.drawShape();
	console.log("moved down");
}

Shape.prototype.rotate = function(){
	var bd = this.body, len = bd.length;
	for (var i=0; i<len; i++) {
		[bd[i][0], bd[i][1]] = [bd[i][1], 0-bd[i][0]];
	}
	this.rotated = true;
	this.drawShape();
	console.log("rotated");	
}

Shape.prototype.drawShape = function(){
	var ctx = this.ctx,
		bd = this.body, 
		oldbd = this.oldbody, 
		top = this.top, 
		left = this.left,
		oldtop = this.oldtop, 
		oldleft = this.oldleft,
		color = this.color,
		moved = false;
	if (top!=oldtop || left!=oldleft) {
		moved = true;
	}
	if (moved) {
		ctx.save();
		ctx.translate(oldleft, oldtop);
		for (var i=0; i<bd.length; i++) {
			utils.graphics.clearRect(ctx, bd[i][0]*CONST.SPACE, 
				bd[i][1]*CONST.SPACE);
		}
		ctx.restore();
		this.oldtop = top;
		this.oldleft = left;
	}
	if (this.rotated){
		ctx.save();
		ctx.translate(left, top);
		for (var i=0; i<oldbd.length; i++) {
			utils.graphics.clearRect(ctx, oldbd[i][0]*CONST.SPACE, 
				oldbd[i][1]*CONST.SPACE);
		}
		ctx.restore();
		this.oldbody = utils.clone(bd);
		this.rotated = false;
	}
	ctx.save();
	ctx.translate(left, top);
	for (var i=0; i<bd.length; i++) {
		utils.graphics.drawRect(ctx, bd[i][0]*CONST.SPACE, 
			bd[i][1]*CONST.SPACE, color);
	}
	ctx.restore();
	console.log("shape:("+bd+")"+" drew at :"+"("+top +","+left+")");
}

Shape.prototype.auto = function(gamePanel, pause){
	var This = this;
	if (pause) {
		if (This.interval) {
			window.clearInterval(this.interval);
		}
	} else {
		this.interval = window.setInterval(function(){
			if (utils.logic.canMoveDown(gamePanel)) {
				This.moveDown();
			} else {
				utils.control.shapeLand(gamePanel);
			}
		}, CONST.AUTO);
	}
}

Shape.prototype.land = function(){
	window.clearInterval(this.interval);
	this.color = CONST.COLOR_GROUND;
	this.drawShape();
	console.log("landed");
}

Shape.prototype.dispose = function(){
	this.body = null;
	this.oldbody = null;
}