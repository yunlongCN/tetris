function Shage(){
	this.top = 0;
	this.left = 0;
	this.moveLeft = function(){
		console.log("i moved left.");
	};
	this.moveRight = function(){
		console.log("i moved right.");	
	};
	this.moveDown = function(){
		console.log("i moved down.");
	};
	this.rotate = function(){
		console.log("i rotated.");
	};
	this.drawMe = function(){
		console.log("drawd myself.");
	};
}