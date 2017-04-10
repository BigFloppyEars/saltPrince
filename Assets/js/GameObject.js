define("GameObject", function() {
	
	// Components
	// needs seperate module for components
	// Doesn't work like planned
	const stateManager = (states) => ({
		states: function() {
			return states;
		},
		activate: function() {
			states.isActivated = true;
		},
		deactivate: function() {
			states.isActivated = false;
		}
	});

	const render = (color, rect) => ({
		rect: function () {
			return rect;
		},
		show: function() {
			return {color, rect};
			//console.log("displayed");
		}
	});

	const moveable = ({isMoving}, rect) => ({
		posUpdate: function() {
			return {x:Math.round(Math.floor(rect.x/rect.width)), y:Math.round(Math.floor(rect.y/rect.height))};
		},
		stepUpdate: function() {
			let astep;
			Math.floor(rect.x/rect.width) + 0.09 <  rect.x/rect.width ? astep = Math.round(Math.floor(rect.x/rect.width)) + 2: astep = Math.round(Math.floor(rect.x/rect.width))+1;
			return {step:astep};
		},
		move: function({x=0, y=0, z=0}) {
			rect.x += x;
			rect.y += y;
		},
		stairClimb:function(){
			if(rect.predictX === rect.x && rect.predictY === rect.y && rect.dir === " ") {
				if(rect.y <= 64 && !rect.cantMove){
				rect.vertical = false;
				rect.horizontal = true;
				}	
				if (rect.vertical&& !rect.cantMove) {
					rect.vertical = false;
					rect.horizontal = true;
					return {x:0,y:-1,z:0};
				}
				else if (rect.horizontal&& !rect.cantMove) {
					rect.vertical = true;
					rect.horizontal = false;
					return {x:1,y:0,z:0};
				}
				else {
					return {x:0,y:0,z:0};
				}
			}
			else if (rect.cantMove) {
				//rect.vertical = false;
				//rect.horizontal = false;
			}
		}
	});

	// Game Object Factory

	const GameObject = (seed = {x:1,y:1,w:64,h:64,id:"sprite"})  => {
		const rect = {
					x:seed.x,
					y:seed.y,
					width:seed.w,
					height:seed.h,
					predictX:seed.x,
					predictY:seed.y,
					dir:" ",
					vertical: false,
					horizontal: true,
					cantMove:false,
					health:100
		};
		const type = seed.id;
		const states = {
			isActivated: false,
		};
		// Logic for sprite components available
		let components = [stateManager(states)];
		switch(type){
			case "sprite":
				components.push(render("green", rect));
				break;
			case "block":
				components.push(render("red", rect));
				break;
			case "drone":
				components.push(moveable(states, rect));
				components.push(render("blue", rect));
				break;
			case "player":
				components.push(moveable(states, rect));
				components.push(render("yellow", rect));
				break;
		}
		// Return object of Sprite Factory
		let temp = Object.assign({type:type}, ...components);
		temp.activate();
		return temp;
	};
	
	return GameObject;
	
});