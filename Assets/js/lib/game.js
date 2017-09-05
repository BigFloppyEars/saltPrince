"use strict";

/* 

NOTES



 */

define("game", ["tile"], function(Tile){
	
	class Game {
		constructor(playa, canvas, ctx, map = []) {
			this.init = true;
			this.tiles = [];
			this.chests = [];
			this.map = map;
			this.mapMemory = [];
			this.temp;
			this.playerOne = playa;
			// Canvas
			this.canvas = canvas;
			this.ctx = ctx;
			this.canWidth = canvas.width;
			this.canHeight = canvas.height;
		}
		
		update(current) {
			
			for (var z = 0; z < this.chests.length; z++) {
				this.chests[z].update();
			}
			
			for (var y = 0; y < this.tiles.length; y++) {
				this.tiles[y].update();
			}
			
			this.playerOne.update(current);
			
		};
		
		display() {
			
			for (var t = 0; t < this.tiles.length; t++) {
				this.tiles[t].display(this.ctx);
			}
			
			for (var c = 0; c < this.chests.length; c++) {
				this.chests[c].display(this.ctx);
			}		
			
			this.playerOne.display(this.ctx);
			
		};
		
		tempClear() {
			this.temp = undefined;
		};
		
		//level assemble
		levelCreate(hw, level = this.map) {
			if (this.init) {
				this.init = false;
				for (var i = 0; i*hw < this.canWidth; i++) {
					for (var j = 0; j*hw < this.canHeight; j++) {
						if (level.length === 0) {
							this.temp = new Tile(i*hw, j*hw, hw, hw, "grass");
							this.temp.pos = [parseInt(i.toString()), parseInt(j.toString())];
							this.tiles.push(this.temp);
							this.tempClear();
						}
						if (level[parseInt(i.toString() + j.toString())] === 0) {
							this.temp = new Tile(i*hw, j*hw, hw, hw, "grass");
							this.temp.pos = [parseInt(i.toString()), parseInt(j.toString())];
							this.tiles.push(this.temp);
							this.tempClear();
						}
						else if (level[parseInt(i.toString() + j.toString())] === 1) {
							this.temp = new Tile(i*hw, j*hw, hw, hw, "water");
							this.temp.pos = [parseInt(i.toString()), parseInt(j.toString())];
							this.tiles.push(this.temp);
							this.tempClear();
						}
						else if (level[parseInt(i.toString() + j.toString())] === 2) {
							this.temp = new Tile(i*hw, j*hw, hw, hw, "stone");
							this.temp.pos = [parseInt(i.toString()), parseInt(j.toString())];
							this.tiles.push(this.temp);
							this.tempClear();
						}
					}
				}
			}
			this.mapMemorize();
			return this.tiles;
		};
		
		// Board Controller
		GPS() {
			for (var p = 0; p < this.tiles.length; p++) {
				if (this.tiles[p].pos[0] === this.playerOne.expPosX && this.playerOne.expPosY === this.tiles[p].pos[1]) {
					if(this.tiles[p].id === "stone") {
						this.playerOne.onCantMove();
					}
					if(this.tiles[p].id === "water") {
						this.playerOne.onCantMove();
						console.log("sinking!");
					}
					if(this.tiles[p].occupied) {
						this.playerOne.onCantMove();
					}
				}
			}
			this.chestManager();
			
			//Borders
			if (0 > this.playerOne.x + this.playerOne.velocity_x) {
				this.playerOne.onCantMove();
				this.playerOne.x = 0;
			}
			if (this.canWidth < this.playerOne.x + this.playerOne.width + this.playerOne.velocity_x) {
				this.playerOne.onCantMove();
				this.playerOne.x = this.canWidth - this.playerOne.width;
			}
			if (0 > this.playerOne.y + this.playerOne.velocity_y) {
				this.playerOne.onCantMove();
				this.playerOne.y = 0;
			}
			if (this.canHeight < this.playerOne.y + this.playerOne.height + this.playerOne.velocity_y) {
				this.playerOne.onCantMove();
				this.playerOne.y = this.canHeight - this.playerOne.height;
			}
		};
		
		chestManager(things = []) {
			
			var temp = [];
			
			if (this.chests.length > 0) {
				
				for (var o = 0; o < this.chests.length; o++) {
					if (this.playerOne.pos[0]+1 === this.chests[o].pos[0] && this.playerOne.pos[1] === this.chests[o].pos[1] && this.playerOne.right) {
						this.playerOne.canInteract = true;
						temp.push(this.chests[o]);
					} else
					if (this.playerOne.pos[0]-1 === this.chests[o].pos[0] && this.playerOne.pos[1] === this.chests[o].pos[1] && this.playerOne.left) {
						this.playerOne.canInteract = true;
						temp.push(this.chests[o]);
					} else
					if (this.playerOne.pos[0] === this.chests[o].pos[0] && this.playerOne.pos[1]+1 === this.chests[o].pos[1] && this.playerOne.down) {
						this.playerOne.canInteract = true;
						temp.push(this.chests[o]);
					} else
					if (this.playerOne.pos[0] === this.chests[o].pos[0] && this.playerOne.pos[1]-1 === this.chests[o].pos[1] && this.playerOne.up) {
						this.playerOne.canInteract = true;
						temp.push(this.chests[o]);
					}else 
					if (temp.lenght < 1) {
						this.canInteract = false;
					}
					else {
						this.chests[o].open = false;
					}
					
				}
				
				for (var i = 0; i < temp.length; i++) {
					if (this.playerOne.interacting && this.playerOne.canInteract && !temp[i].open) {
						console.log("should one touch open or close chest");
						//this.playerOne.interacting = false;
						
						temp[i].activate();
						
					}
					
					if (temp[i].open && this.playerOne.interactingSecondary && this.playerOne.canInteract) {
						var want = prompt("Query for item in chest format object property/key with quantity/value pairs EX. [{item:quantity}, {item/quantity}... ]");
						temp[i].contents = temp[i].giveContent(want);
						//this.playerOne.interactingSecondary = false;
					}
				}
				
				
			}
		};
		
		// Map reset
		mapClear() {
			if (!this.init) {
				this.init = true;
				this.map = [];
			}
			return this.map;
		};
		
		// under construction level archiver
		mapMemorize(map = this.tiles) {
			if (!this.init) {
				this.tempClear();
				this.temp = [];
				for (var t = 0; t < map.length; t++) {
					if(map[t].id === "grass") {
						this.temp.push("0");
					}
					if (map[t].id === "water") {
						this.temp.push("1");
					}
					if(map[t].id === "stone") {
						this.temp.push("2");
					}
				}
				this.mapMemory.push(this.temp);
				console.log("current map array and length");
				console.log(map.length);
				console.log(this.temp);
				this.tempClear();
				// overall map in cache
				console.log(this.mapMemory.length);
				return this.mapMemory;
			}
		};
		
		mapRecall() {
			if (this.mapMemory.length > 0) {
				for (var p = 0; p < this.mapMemory.length; p++) {
					console.log(this.mapMemory[p]);
				}
			}
		};
		
	}
		
	return Game;
});