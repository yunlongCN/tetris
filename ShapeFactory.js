var ShapeFactory = {
	Shapes: [
		[ [ 0, -1 ], [ 0, 0 ], [ -1, 0 ], [ -1, 1 ] ],
		[ [ 0, -1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ] ],
		[ [ 0, -1 ], [ 0, 0 ], [ 0, 1 ], [ 0, 2 ] ],
		[ [ -1, 0 ], [ 0, 0 ], [ 1, 0 ], [ 0, 1 ] ],
		[ [ 0, 0 ], [ 1, 0 ], [ 0, 1 ], [ 1, 1 ] ],
		[ [ -1, -1 ], [ 0, -1 ], [ 0, 0 ], [ 0, 1 ] ],
		[ [ 1, -1 ], [ 0, -1 ], [ 0, 0 ], [ 0, 1 ] ]
	],
	newShape: function(ctx){
		var body, shape, color,
			shapes = this.Shapes,
			colors = CONST.COLOR_SHAPE,
			colorCount = colors.length,
			count = shapes.length;
		body = shapes[Math.floor(Math.random()*count)];
		color = colors[Math.floor(Math.random()*colorCount)];
		shape = new Shape(ctx, body, CONST.INIT_SHAPE_TOP,
			 CONST.INIT_SHAPE_LEFT, color);
		console.log("a shape created by factory. bd:"+body);
		return shape;
	}
};