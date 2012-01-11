var GamePanel = {
	graphic:null,
	ground:null,
	shape:null,
	init: function(){
		if(!this.graphic){
			canvas = document.getElementById('canvas');
			this.graphic = canvas.getContext('2d'); 
		}
	},
	display: function(ground, shape){
		console.log("gamepanel displays.");
		this.ground = ground;
		this.shape = shape;
		this.drawMe();
	},
	drawMe: function(){
		this.ground.drawMe(this.canvas);
		this.shape.drawMe(this.canvas);
	}
};