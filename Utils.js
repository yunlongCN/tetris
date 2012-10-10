var utils = {};

utils.clone = function(obj){
	var newObj = (obj instanceof Array) ? [] : {};
  	for (i in obj) {
    	if (i == 'clone') continue;
    	if (obj[i] && typeof obj[i] == "object") {
      		newObj[i] = utils.clone(obj[i]);
    	} else {
    		newObj[i] = obj[i];
    	}
  	} 
  	return newObj;
}

utils.graphics = {};

utils.graphics.drawRect = function(ctx, x, y, color){
	if (!color) {
		color = CONST.COLOR_SHAPE;
	}
	ctx.save();
	ctx.fillStyle=color;
	ctx.fillRect(x, y, CONST.SPACE, CONST.SPACE);
	ctx.restore();
}

utils.graphics.clearRect = function(ctx, x, y){
	ctx.clearRect(x, y, CONST.SPACE, CONST.SPACE);
}

utils.logic = {};

utils.logic.canMoveDown = function(gamePanel){
	return utils.logic.canMoveTo(gamePanel, CONST.DIRECTION_DOWN);
}

utils.logic.canMoveLeft = function(gamePanel){
	return utils.logic.canMoveTo(gamePanel, CONST.DIRECTION_LEFT);
}

utils.logic.canMoveRight = function(gamePanel){
	return utils.logic.canMoveTo(gamePanel, CONST.DIRECTION_RIGHT);
}

utils.logic.canRotate = function(gamePanel){
	return utils.logic.canMoveTo(gamePanel, CONST.DIRECTION_ROTATE);
}

utils.logic.canMoveTo = function(gamePanel, direction){
	var shape = gamePanel.shape,
		ground = gamePanel.ground, 
		sTop = shape.top,
		sLeft = shape.left,
		sBody = shape.body,
		gRow = ground.row,
		gCol = ground.col,
		gBody = ground.body;
	switch(direction){
		case CONST.DIRECTION_DOWN:
			sTop += CONST.MOVESTEP;
			break;
		case CONST.DIRECTION_LEFT:
			sLeft -= CONST.MOVESTEP;
			break;
		case CONST.DIRECTION_RIGHT:
			sLeft += CONST.MOVESTEP;
			break;
		case CONST.DIRECTION_ROTATE:
			var sBody = utils.clone(sBody),
				len = sBody.length;
			for (var i=0; i<len; i++) {
				[sBody[i][0], sBody[i][1]] = [sBody[i][1], 0-sBody[i][0]];
			}
			break;
		default:
			return false;
	}
	var row, col;
	for (var i=0; i<sBody.length; i++){
		row = Math.floor(sTop/CONST.SPACE) + sBody[i][1];
		col = Math.floor(sLeft/CONST.SPACE) + sBody[i][0];
		if (row>=gRow || col<0 || col>=gCol) {
			return false;
		}
		if (gBody[row]===undefined) {
			continue;
		}
		if (gBody[row][col]) {
			return false;
		}
	}
	return true;
}

utils.logic.isGameOver = function(gamePanel){
	var ground = gamePanel.ground,
		gBody = ground.body;
	for (var i=0; i<gBody[0].length; i++) {
		if (gBody[0][i]==CONST.SHAPE) {
			return true;
		}
	}
	return false;
}

utils.control = {};

utils.control.shapeLand = function(gamePanel){
	var shape = gamePanel.shape,
		ground = gamePanel.ground;
	shape.land();
	ground.appendShape(shape);
	if (!utils.logic.isGameOver(gamePanel)) {
		shape.dispose();
		gamePanel.newShape();
	} else {
		gamePanel.over();
		alert("Game over!");
	}
}

utils.control.gamePad = function(e, gamePanel){
	switch(e.keyCode){
		case CONST.KEYCODE_LEFT:
			gamePanel.moveShapeLeft();
			break;
		case CONST.KEYCODE_UP:
			gamePanel.rotateShape();
			break;
		case CONST.KEYCODE_RIGHT:
			gamePanel.moveShapeRight();
			break;
		case CONST.KEYCODE_DOWN:
			gamePanel.moveShapeDown();
			break;
		default:
			return;
	}
}

utils.control.mark = function(score){
	var scoreboard = utils.control.scoreboard;
	if (!scoreboard) {
		utils.control.scoreboard = document.getElementById("score");
		scoreboard = utils.control.scoreboard;
	}
	try{
		origScore = parseInt(scoreboard.innerHTML);
	} catch (e){
		origScore = 0;
	}
	scoreboard.innerHTML = origScore + score;
}
