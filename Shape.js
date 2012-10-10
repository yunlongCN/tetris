function Shape(body, status){
	this.body = body;
	this.status = status;
	this.top = 0;
	this.left = 0;
	this.moveLeft = function(){
		console.log("shape moved left.");
	};
	this.moveRight = function(){
		console.log("shape moved right.");	
	};
	this.moveDown = function(){
		console.log("shape moved down.");
	};
	this.rotate = function(){
		console.log("shape rotated.");
	};
	this.drawMe = function(){
		console.log("shape drew itself.");
	};
	windown.setInterval(function(){
		this.moveDown();
	}, 1000);
}