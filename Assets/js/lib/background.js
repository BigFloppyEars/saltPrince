"use strict";

/* 

NOTES



 */

define("background", function(){
	// Background
	class Background{
		constructor(canvas, ctx) {
			this.blankSlate = ctx.clearRect(0, 0, canvas.width, canvas.height);
		}

		display() {
			this.blankSlate;
		}
	}
	
	return Background;
});