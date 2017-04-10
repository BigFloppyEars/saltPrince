//jshint esversion:6 

"use strict";
	
// Start "root" or "main" module/ script.	

	//let spriteSheet = document.getElementById("spriteSheet");

	let rAF;
	// PLAYER 1 KEYS
	let keyW = false;
	let keyA = false;
	let keyS = false;
	let keyD = false;
	// PLAYER 2 KEYS
	let keyLA = false;
	let keyUA = false;
	let keyRA = false;
	let keyDA = false;

	// Event listener
	window.addEventListener("keydown", onKeyDown, false);
	window.addEventListener("keyup", onKeyUp, false);

	function onKeyDown(event) {
		let keyCode = event.keyCode;
		//console.log(event, keyCode, event.key);
		switch (keyCode) {
			case 68:
				// D
				keyD = true;
				break;
			case 83:
				// S
				keyS = true;
				break;
			case 65:
				// A
				keyA = true;
				break;
			case 87:
				// W
				keyW = true;
				break;
			// PLAYER 2
			case 37:
				//left arrow
				keyLA = true;
				break;
			case 38:
				//up arrow
				keyUA = true;
				break;
			case 39:
				//right arrow
				keyRA = true;
				break;
			case 40:
				//down arrow
				keyDA = true;
				break;
		}
	}

	function onKeyUp(event) {
		let keyCode = event.keyCode;

		switch (keyCode) {
			case 68:
				// D key
				keyD = false;
				break;
			case 83:
				// S key
				keyS = false;
				break;
			case 65:
				// A key
				keyA = false;
				break;
			case 87:
				// W key
				keyW = false;
				break;
			// PLAYER 2
			case 37:
				// Left arrow
				keyLA = false;
				break;
			case 38:
				// Up arrow
				keyUA = false;
				break;
			case 39:
				// Right srrow
				keyRA = false;
				break;
			case 40:
				// Down arrow
				keyDA = false;
				break;
		}
	}

	// Canvas Object/Factory

	const Canvas = (can, width = undefined, height = undefined) => {
		const canvas = document.getElementById(can);
		const ctx = canvas.getContext('2d');
		canvas.width = width || document.body.clientWidth; 
		canvas.height = height || document.body.clientHeight;
	 
		return {
			clear : function () {
				ctx.clearRect(0, 0, width, height);
			},
			display : function (displayedGameObjs) {
				if (Array.isArray(displayedGameObjs)) {
					displayedGameObjs.forEach(function(obj) {
						let {rect, color} = obj.show();
						ctx.fillStyle = "black";
						ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
						ctx.fillStyle = color;
						ctx.fillRect(rect.x+(rect.width*(10/100)), rect.y+(rect.width*(10/100)), rect.width-(rect.width*(20/100)), rect.height-(rect.width*(20/100)));
					});
				}
			}
		};
		
	};

	// Components

	const stateManager = (states) => ({
		activated: function() {
			let {isActivated} = states;
			isActivated = true;
			console.log(isActivated);
			return isActivated;
		}
	});

	const render = (color, rect) => ({
		show: function() {
			return {color, rect};
			//console.log("displayed");
		}
	});

	const moveable = ({isMoving}, rect) => ({
		posUpdate: function() {
			return {x:rect.x/rect.width, y:rect.y/rect.height};
		},
		move: function({x=0, y=0, z=0}) {
			rect.x += x;
			rect.y += y;
		}
	});

	// Game Object Factory

	const gameObject = (seed = {x:1,y:1,w:64,h:64,id:"sprite"})  => {
		const rect = {
					x:seed.x,
					y:seed.y,
					width:seed.w,
					height:seed.h
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
			case "PlayerOne":
				components.push(moveable(states, rect));
				components.push(render("blue", rect));
				break;
		}
		// Return object of Sprite Factory
		let temp = Object.assign({}, ...components);
		temp.activated();
		return temp;
	};

	// Clock/Timer Factory

	const Clock = () => {
		let start;
		let last = 0;
		let delta = 0;
		let end;
		let fps;
		let current = 0;
		return {
			FPS : function() { return fps; },
			DELTA : function() { return delta; },
			beginTimer : function() {
				start = start || Date.now();
				return start;
			},
			secondsElapsed : function(frame) {
				last = current || frame;
				end = Date.now();
				current = frame/1000;
				delta = current - last;
				fps = 1/(current - last);
				return current;
			}
		};
	};

	// Game

	const Screen = Canvas("myCanvas", 500, 500);
	const gameClock = Clock();
	const playerOne = gameObject({x:100, y:200, w:100, h:100, id:"PlayerOne"});

	let current = 0;

	let velocity = {};

	let tiles = [];

	for (let j = 0; j*25 < 500; j++ ) {
		for (let i = 0; i*25 < 500; i++) {
			let temp = gameObject({x:i*25, y:j*25, w:25, h:25, id:"sprite"});
			tiles.push(temp);
		}
	}

	let allSpritesList = [...tiles, playerOne];

		// For Debugging
		allSpritesList.forEach( gameObj => console.log(gameObj));

	function Mainloop( tFrame ) {

		//console.log(tFrame/1000);
		//console.log( current );
		current = gameClock.secondsElapsed(tFrame);
		//console.log(gameClock.FPS());
		// Key Events and Log
		// Player 1
		if (keyDA) {
			$.ajax({
				url: 'http://localhost:3000/laststand',
				data: {"data": "TEST"},
				type: 'POST',
				success: function (data) {
					let ret = jQuery.parseJSON(data);
					$('#response').html(ret.data.toString());
					console.log('Success: ' + ret.data);
				},
				error: function (xhr, status, error) {
					console.log('Error: ' + error.message);
					$('#response').html('Error connecting to the server.');
				},
			});
		}
		if (keyA) {
			velocity = {x:-1,y:0,z:0};
		} else if (keyD) {
			velocity = {x:1,y:0,z:0};
		} else if (keyW) {
			velocity = {x:0,y:-1,z:0};
		} else if (keyS) {
			velocity = {x:0,y:1,z:0};
		} else {
			velocity = {x:0,y:0,z:0};
		}
		playerOne.move(velocity);
		
		Screen.clear();
		Screen.display(allSpritesList);
		
		rAF = window.requestAnimationFrame(Mainloop);
		
	}

	gameClock.beginTimer();

	$(document).ready(function(){
		window.requestAnimationFrame(Mainloop);
	});
	