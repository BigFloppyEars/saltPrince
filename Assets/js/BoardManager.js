define("BoardManager", function() {
	
	const BoardManager = (screen, allSprites) => {
		const Steps = [{step:1, occupied:false}, {step:2, occupied:false}, {step:3, occupied:false}, {step:4, occupied:false},
						{step:5, occupied:false}, {step:6, occupied:false}, {step:7, occupied:false}, {step:8, occupied:false}];
		let playerOne;
		let drones = [];
		let blocks = [];
		let tiles = [];
		for (let i = 0; i < allSprites.length; i++) {
			if (allSprites[i].type === "sprite") {
				tiles.push(allSprites[i]);
			}
			else if (allSprites[i].type === "block") {
				blocks.push(allSprites[i]);
			}
			else if (allSprites[i].type === "drone") {
				drones.push(allSprites[i]);
			}
			else if (allSprites[i].type === "player") {
				playerOne =  allSprites[i];
			}
		}
		const lsSTEP = playerOne.stepUpdate().step;
		let lastDrone;
		return {
			// takes a velocity for direction and turns it into tile based movement of tile size based on the own units dimensions
			// has dt variable for time based movement
			spriteListUpdate:function(AIbots, walls){
				/*Steps.forEach(function(s){
					if(s.occupied){
						console.log(s);
					}
				});*/
				drones = AIbots;
				blocks = walls;
			},
			tileMove:function(velocity, dt, p){
				if (p.x === p.predictX && p.y === p.predictY && p.dir === " ") {
					if(velocity.x < 0) {
						p.dir = "A";
						p.predictX = p.x - p.width;
					} else if (velocity.x > 0) {
						p.dir = "D";
						p.predictX = p.x + p.width;
					}
					if(velocity.y > 0) {
						p.dir = "S";
						p.predictY = p.y + p.height;
					} else if (velocity.y < 0) {
						p.dir = "W";
						p.predictY = p.y - p.height;
					}
				}
				if(p.x !== p.predictX || p.y !== p.predictY && p.dir !== " ") {
					if (p.dir === "A") {
						p.x -= 2;
					}
					if (p.dir === "D") {
						p.x += 2;
					}
					if (p.dir === "S") {
						p.y += 2;
					}
					if (p.dir === "W") {
						p.y -= 2;
					}
					if (p.x === p.predictX && p.y === p.predictY) {
						p.dir = " ";
					}
				}
			},
			borderCheck:function(p){
				if(p.id !== "drone") {
					if(p.x < screen.x){
						p.x = screen.x;
						p.predictX = p.x;
						p.dir = " ";
					}
					if(p.x + p.width > screen.x + screen.width){
						p.x = screen.width;
						p.predictX = p.x;
						p.dir = " ";
					}
					if(p.y < screen.y){
						p.y = screen.y;
						p.predictY = p.y;
						p.dir = " ";
					}
					if(p.y + p.height > screen.y + screen.height){
						p.y = screen.height - p.height;
						p.predictY = p.y;
						p.dir = " ";
					}
				}
			},
			blockCheck:function(p){
				for (let i = 0; i < blocks.length; i++) {
					b = blocks[i].rect();
					// top
					if (p.x >= b.x && p.x <= b.x + b.width && p.y >= b.y && p.y <= b.y + b.height &&
					p.x + p.width >= b.x && p.x + p.width <= b.x + b.width && p.y >= b.y && p.y <= b.y + b.height) {
						if (p.dir === "W") {
							p.y = b.y + p.height;
							p.predictY = p.y;
							p.dir = " ";
						}
					}
					// bottom 
					else if (p.x >= b.x && p.x <= b.x + b.width && p.y + p.height >= b.y && p.y + p.height <= b.y + b.height &&
					p.x + p.width >= b.x && p.x + p.width <= b.x + b.width && p.y + p.height >= b.y && p.y + p.height <= b.y + b.height){
						if (p.dir === "S") {
							p.y = b.y - p.height;
							p.predictY = p.y;
							p.dir = " ";
						}
					}
					// right
					else if (p.x >= b.x && p.x <= b.x + b.width && p.y >= b.y && p.y <= b.y + b.height &&
					p.x >= b.x && p.x <= b.x + b.width && p.y + p.height >= b.y && p.y + p.height <= b.y + b.height) {
						if (p.dir === "A") {
							p.x = b.x + p.width;
							p.predictX = p.x;
							p.dir = " ";
						}
					}
					// left
					else if (p.x + p.width >= b.x && p.x + p.width <= b.x + b.width && p.y >= b.y && p.y <= b.y + b.height &&
					p.x + p.width >= b.x && p.x + p.width <= b.x + b.width && p.y + p.height >= b.y && p.y + p.height <= b.y + b.height) {
						if (p.dir === "D") {
							p.x = b.x - p.width;
							p.predictX = p.x;
							p.dir = " ";
						}
					}
				}
			},
			stepCheck:function(AIS){
				temp = [];
				AIS.forEach(function(d){
					Steps.forEach(function(s){
						if(d.stepUpdate().step === s.step){
							temp.push(s.step);
						}
					});
					Steps.forEach(function(s){
						if(temp.indexOf(s.step) !== -1){
							s.occupied = true;
						}
						else {
							s.occupied = false;
						}
					//console.log(s);
					});
				});
				return temp;
			},
			knightFall:function(){
				for (let i = 0; i < drones.length; i++){
					if(drones[i].stepUpdate().step + 1 === lsSTEP){
						return true;
					}
					else {
						return false;
					}
				}
			},
			droneVplayer:function(d, t){
				if (d.stepUpdate().step + 1 === lsSTEP && playerOne.rect().health > 0) {
					d.rect().cantMove = true;
					playerOne.rect().health -=1;
				}
				else if (d.stepUpdate().step + 1 === lsSTEP && playerOne.rect().health < 1) {
					d.rect().cantMove = false;
				}
			},
			doKill:function(arr, sprite) {
				//console.log(sprite.stepUpdate().step);
				if(!sprite.states().isActivate) {
					if (arr.indexOf(sprite) > -1) {
						arr.splice(arr.indexOf(sprite), 1);
					}
				}
			}
		}
	}
	
	return BoardManager;
	
});