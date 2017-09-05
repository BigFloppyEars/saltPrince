"use strict";

/* 

NOTES

You need to finish up the receiveContent() function, and make it accessible in the game module.
After finnishing the Char's recieveContent() and giveContent() functions, hook them up to the respective chest functions. 

 */
 
define("chest", ["sprite"], function(Sprite){
	
	class Chest extends Sprite{
		constructor(x, y, width, height, id) {
			super(x, y, width, height, id);
			this.color = "brown";
			// Contents
			this.contents = [{id: "Gold", quantity:250}, {id: "Mysterious Sword", quantity:1}, {id:"Wooden Shield", quantity:1}];
			this.open = false;
			this.empty = false;
			this.update();
		}
		
		display(ctx) {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x + (this.width*0.1), this.y + (this.height*0.1), this.width - (this.width*0.2), this.height - (this.height*0.2));
		};
		
		update() {
			
			if (this.contents.length < 1) {
				this.empty = true;
			}
			
			if (this.open) {
				this.printContents();
			}
			
		};
		
		activate() {
				console.log("closed");
			if (this.open) {
				this.open = false;
				console.log("closed");
				return this.open;
			}
			else {
				this.open = true;
				return this.open;
			}
		};
		
		// receiveContent() should take an array of objects and push them onto its contents.
		recieveContent() {
			if (this.open) {
				this.open = false;
			}
			else {
				/*for (var i = 0; i < this.temp.length; i++) {
					
				}*/
			}
		};
		
		giveContent(num) {
			var temp = [];
			if (this.open) {
				if (num > this.contents.length || isNaN(num)) {
					console.log(num);
					return this.contents;
				}
				else if (num == -1) {
					this.contents = [];
					return this.contents;
				}
				else {
					console.log(this.contents.length);
					for (var c = 0; c < this.contents.length; c++) {
						console.log(num + " " + c);
						if (parseInt(num) !== c) {
							temp.push(this.contents[c]);
						}
					}
					console.log(temp);
					this.contents = temp;
					return this.contents;
				}
			}
		};
		
		printContents() {
			if (this.open) {
				for (var i = 0; i < this.contents.length; i ++) {
					console.log(this.contents[i]);
				}
			}
		};
	}
		
	return Chest;
});