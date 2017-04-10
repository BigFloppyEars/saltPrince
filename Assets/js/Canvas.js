define("Canvas", function() {
	
	const Canvas = (can, width = undefined, height = undefined) => {
		const canvas = document.getElementById(can);
		const ctx = canvas.getContext('2d');
		canvas.width = width || document.body.clientWidth; 
		canvas.height = height || document.body.clientHeight;
	 
		return {
			rect: function() {
				return {x:0,y:0,width:canvas.width,height:canvas.height}
			},
			clear : function () {
				ctx.clearRect(0, 0, width, height);
			},
			display : function (displayedGameObjs) {
				if (Array.isArray(displayedGameObjs)) {
					displayedGameObjs.forEach(function(obj) {
						let {rect, color} = obj.show();
						if (obj.type === "drone" || obj.type === "player") {
							ctx.fillStyle = "black";
							ctx.fillRect(rect.x, rect.y-64, rect.width, rect.height*2);
							ctx.fillStyle = color;
							ctx.fillRect(rect.x+(rect.width*(10/100)), rect.y-rect.height+(rect.height)*(10/100), rect.width-(rect.width*(20/100)), (rect.height*2)-(rect.width*(20/100)));
						}
						else {
							ctx.fillStyle = "black";
							ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
							ctx.fillStyle = color;
							ctx.fillRect(rect.x+(rect.width*(10/100)), rect.y+(rect.height*(10/100)), rect.width-(rect.width*(20/100)), rect.height-(rect.height*(20/100)));
						}
					});
				}
			}
		};
		
	};
	
	return Canvas;
	
});