"use strict";

/* 

NOTES



 */

define("char", ["sprite"], function(Sprite){
	
	class Char extends Sprite{
		constructor(x, y, width, height, id) {
			super(x, y, width, height, id);
			this.dir = " ";
			this.cantMove = false;
			this.canInteract = false;
			this.interacting = false;
			this.interactingSecondary = false;
			this.interactingThird = false;
			this.interactingFourth = false;
			this.inventrory = [];
		}

		//Char.prototype = Object.create(Sprite.prototype);
		
		//Char.prototype.constructor = Char;
		
		// receiveContent() should take an array of objects and push them onto its contents.
		recieveContent(items = []) {
			if (items !== Array || items.length < 1) {
				console.log("Please enter contents in an array holding object property/key with quantity/value pairs EX. [{item:quantity}, {item/quantity}... ]");
			}
			else {
				for (var i = 0; i < items; i++) {
					this.inventory.push(items[i]);
				}
			}
		};

		display(ctx) {
			if (this.down) {
				ctx.drawImage(spriteSheet, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
			}
			else if (this.up) {
				ctx.drawImage(spriteSheet, 50, 0, this.width, this.height, this.x, this.y, this.width, this.height);
			}
			else if (this.left) {
				ctx.drawImage(spriteSheet, 150, 0, this.width, this.height, this.x, this.y, this.width, this.height);
			}
			else if (this.right) {
				ctx.drawImage(spriteSheet, 100, 0, this.width, this.height, this.x, this.y, this.width, this.height);
			}
		};

		update(curr) {
			
			// "reset" if block
			if (this.x === this.expected_x && this.y === this.expected_y && this.reset === false) {
				this.pos = [this.x/50, this.y/50];
				this.reset = true;
				this.velocity_x = 0;
				this.velocity_y = 0;
				this.original_x = this.x;
				this.original_y = this.y;
				this.expected_x = this.original_x;
				this.expected_y = this.original_y;
				this.expPosX = this.x/50;
				this.expPosY = this.y/50;
				return;
			}
			
			if (this.cantMove) {
				this.dir = " ";
				this.expected_x = this.original_x;
				this.expected_y = this.original_y;
				this.velocity_x = 0;
				this.velocity_y = 0;
				this.cantMove = false;
			}
			
			//"state/directional" if block
			if (this.reset || this.reset === undefined) {
				this.reset = false;
				this.stamp = curr;
				if(this.dir === "D") {
					this.up = false;
					this.down = false;
					this.left = false;
					this.right = true;
					this.original_x = this.x;
					this.expected_x = this.original_x + this.width;
					this.expected_y = this.y;
					this.expPosX = (this.x/50) + 1;
					this.expPosY = this.y/50;
					return;
				}
				if(this.dir === "A") {
					this.up = false;
					this.down = false;
					this.left = true;
					this.right = false;
					this.original_x = this.x;
					this.expected_x = this.original_x - this.width;
					this.expected_y = this.y;
					if (this.expPosX > 0) {
						this.expPosX = (this.x/50) - 1;
						this.expPosY = this.y/50;
					}
					return;
				}
				if(this.dir === "W") {
					this.left = false;
					this.right = false;
					this.up = true;
					this.down = false;
					this.original_y = this.y;
					this.expected_y = this.y - this.height;
					this.expected_x = this.x;
					if (this.expPosY > 0) {
						this.expPosX = this.x/50;
						this.expPosY = (this.y/50) - 1;
					}
					return;
				}
				if(this.dir === "S") {
					this.left = false;
					this.right = false;
					this.up = false;
					this.down = true;
					this.original_y = this.y;
					this.expected_y = this.y + this.height;
					this.expected_x = this.x;
					this.expPosX = this.x/50;
					this.expPosY = (this.y/50) + 1;
					return;
				}
			}
			// "action" if block
			if(this.reset === false) {
				this.interacting = false;
				this.interactingSecond = false;
				this.interactingThird = false;
				this.interactingFourth = false;
				// horizontal movement
				if (this.expected_x > this.x || this.expected_x < this.x) {
					this.x += (this.expected_x - this.original_x)/10;
					this.velocity_x = (this.expected_x - this.original_x)/10;
					return;
				}
				// vertical movement
				if (this.expected_y < this.y || this.expected_y > this.y) {
					this.y += (this.expected_y - this.original_y)/10;
					this.velocity_y = (this.expected_y - this.original_y)/10;
					return;
				}
			}
			
			
		};
		
		onCantMove() {
			this.cantMove = true;
		};
		
	}
	
	return Char;
});