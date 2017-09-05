"use strict";

/* 

NOTES



 */

define("tile", ["sprite"], function(Sprite){
	
	class Tile extends Sprite {
		constructor(x, y, width, height, id) {
			super(x, y, width, height, id);
			this.occupied = false;
			this.worldObject = [];
			this.idUpdate(id);
		}

		//Tile.prototype = Object.create(Sprite.prototype);
		//Tile.prototype.constructor = Tile;

		update() {
			if (this.worldObject.length < 1) {
				this.occupied = false;
			}
			else if (this.worldObject.length === 1) {
				this.occupied = true;
			}
			else if (this.worldObject.length > 1) {
				this.worldObject = [this.worldObject[0]];
			}
		}
		
		idUpdate(anID) {
			
			this.id = anID;
			
			if (this.id === "grass") {
				this.color = "green";
			}
			else if (this.id === "water") {
				this.color = "blue";
			}
			else if (this.id === "stone") {
				this.color = "darkgrey";
			}
			else if (this.id === "dead") {
				this.color = "black";
			}
			
		}
		
		display(ctx) {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
		
	}
	
	return Tile;
});