"use strict";

/* 

NOTES



 */

define("sprite", function(){
	// Basic Sprite & Platform constructor
	class Sprite {
		
		constructor(x, y, width, height, id) {
			this.id = id;
			this.x = x;
			this.y = y;
			this.pos = [this.x/50, this.y/50];
			this.width = width;
			this.height = height;
			this.velocity_x = 0;
			this.velocity_y = 0;
			this.stamp = 0;
			this.up = false;
			this.down = true;
			this.left = false;
			this.right = false;
			this.reset;
			this.original_x = this.x;
			this.original_y = this.y;
			this.expected_x = this.original_x;
			this.expected_y = this.original_y;
			this.expPosX = 0;
			this.expPosY = 0;
			Sprite.prototype.count = Sprite.prototype.count ? Sprite.prototype.count + 1 : 1; 
			//this.serialUpdate();
		}
		
		serialUpdate() {
			console.log(this.count);
		};
		
		update(dir, curr) {
			this.pos = [this.x/50, this.y/50];
		};
		
		display(color) {
			ctx.fillStyle = color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		};
		
	}
	
	return Sprite;

});