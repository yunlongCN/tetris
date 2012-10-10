function Ground(ctx, width, height){
	this.ctx = ctx;
	this.width = width;
	this.height = height;
	this.row = Math.floor(height/CONST.SPACE);
	this.col = Math.floor(width/CONST.SPACE);
	this.body = new Array();
	for (var i=0; i<this.row; i++) {
		this.newLine();
	}
	//this.newLine(false, true);
	this.drawGround();
	console.log("ground is created (row:"
		+this.row+" col:"+this.col+")");
}

Ground.prototype.appendShape = function(shape){
	//append the shape into ground.
	var sTop = shape.top,
		sLeft = shape.left,		 
		sBody = shape.body,
		gBody = this.body;
	var row, col;
	for (var i=0; i<sBody.length; i++) {
		row = Math.floor(sTop/CONST.SPACE) + sBody[i][1];
		col = Math.floor(sLeft/CONST.SPACE) + sBody[i][0];
		if (gBody[row]===undefined) {
			continue;
		}
		gBody[row][col] = CONST.SHAPE; 
	}
	//look up if there are full lines in ground?
	var fullLines = [];
	row_loop:
	for (var j=gBody.length-1; j>=0; j--) {
		col_loop:
		for (var k=0; k<gBody[j].length; k++) {
			if (gBody[j][k]==CONST.NOSHAPE) {
				continue row_loop;
			}
		}
		fullLines.push(j);
	}
	//if there are full lines, re-draw ground, removes them.
	if (fullLines.length>0) {
		var fullLinesCount = fullLines.length;
		for (var m=0; m<fullLines.length; m++) {
			gBody.splice(fullLines[m],1);
		}
		while(fullLinesCount){
			this.newLine(true);
			fullLinesCount--;
		}
		this.drawGround();
		utils.control.mark(fullLines.length);
	}
}

Ground.prototype.drawGround = function(){
	var ctx = this.ctx;
	for (var i=0; i<this.row; i++) {
		for (var j=0; j<this.col; j++) {
			if (this.body[i][j] == CONST.SHAPE){
				utils.graphics.drawRect(ctx, j*CONST.SPACE, i*CONST.SPACE, CONST.COLOR_GROUND);		
			} else {
				utils.graphics.clearRect(ctx, j*CONST.SPACE, i*CONST.SPACE, CONST.COLOR_GROUND);
			}
		}
	}
}

Ground.prototype.newLine = function(addToFront, full){
	var line = new Array();
	for(var j=0; j<this.col; j++){
		if (full) {
			line.push(CONST.SHAPE);
		} else {
			line.push(CONST.NOSHAPE);
		}	
	}
	if (addToFront) {
		this.body.unshift(line);
	} else {
		this.body.push(line);
	}
}

Ground.prototype.dispose = function(){
	this.body = null;
}