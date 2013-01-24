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

utils.graphics = {
    drawRect: function(ctx, x, y, color){
    	if (!color) {
    		color = 1;
    	}
    	ctx.save();
    	//ctx.fillStyle=color;
    	//ctx.fillRect(x, y, CONST.SPACE, CONST.SPACE);
    	ctx.drawImage(CONST.IMAGE_SHAPE,
    	    (color-1)*CONST.SPACE, 0,
    	    CONST.SPACE, CONST.SPACE, 
    	    x, y, 
    	    CONST.SPACE, CONST.SPACE);
    	ctx.restore();
    },
    clearRect: function(ctx, x, y){
	   ctx.clearRect(x, y, CONST.SPACE, CONST.SPACE);
    }
}

utils.logic = {
    canMoveDown: function(game){
    	return utils.logic.canMoveTo(game, CONST.DIRECTION_DOWN);
    },
    canMoveLeft: function(game){
    	return utils.logic.canMoveTo(game, CONST.DIRECTION_LEFT);
    },
    canMoveRight: function(game){
    	return utils.logic.canMoveTo(game, CONST.DIRECTION_RIGHT);
    },
    canRotate: function(game){
    	return utils.logic.canMoveTo(game, CONST.DIRECTION_ROTATE);
    },
    canMoveTo: function(game, direction){
    	var shape = game.shape,
    		ground = game.ground, 
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
    },
    isGameOver: function(game){
    	var ground = game.ground,
    		gBody = ground.body;
    	for (var i=0; i<gBody[0].length; i++) {
    		if (gBody[0][i]==CONST.SHAPE) {
    			return true;
    		}
    	}
    	return false;
    }
}

utils.score = 0;

utils.control = {
    shapeLand: function(game){
    	var shape = game.shape,
    		ground = game.ground;
    	shape.land();
    	var score = ground.appendShape(shape);
    	if (score > 0) {
    	    this.mark(score);
    	    utils.score += score;
    	    if (utils.score > GAME_LEVEL*CONST.LEVEL_UP_SCORE) {
                game.upLevel();
            }
    	}
    	if (!utils.logic.isGameOver(game)) {
    		shape.dispose();
    		game.newShape();
    	} else {
    		game.over();
    		var obj = $('ui-over');
            var width = gameView.clientWidth;
    
            fadeMove(obj,-width,width);
    
            $('btnReplay').onclick = function() {
                fadeMove(obj,0,-width,function(){
                    obj.classList.add('none');
                    game.start();
                });
            };
            $('btnQuit2').onclick = function() {
                fadeMove(obj,0,-width,function(){
                    obj.classList.add('none');
                    gameView.classList.add('none');
                    startView.classList.remove('none');
                });
            };
    	}
    },
    gamePad: function(e, game){
    	switch(e.keyCode){
    		case CONST.KEYCODE_LEFT:
    			game.moveShapeLeft();
    			break;
    		case CONST.KEYCODE_UP:
    			game.rotateShape();
    			break;
    		case CONST.KEYCODE_RIGHT:
    			game.moveShapeRight();
    			break;
    		case CONST.KEYCODE_DOWN:
    			game.moveShapeDown();
    			break;
    		default:
    			return;
    	}
    },
    mark: function(score){
        window.setTimeout(function(){
            var scoreboard = utils.scoreboard,
                origScore;
            if (!scoreboard) {
                scoreboard = $("score")
                //utils.control.scoreboard = document.getElementById("score");
                //scoreboard = utils.control.scoreboard;
            }
            try{
                origScore = parseInt(scoreboard.innerHTML);
            } catch (e){
                origScore = 0;
            }
            scoreboard.innerHTML = origScore + score;
        }, 100);
    },
    markClear: function(){
        var scoreboard = utils.control.scoreboard;
        if (!scoreboard) {
            utils.control.scoreboard = document.getElementById("score");
            scoreboard = utils.control.scoreboard;
        }
        scoreboard.innerHTML = 0;
    }
}