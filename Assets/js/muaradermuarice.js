"use strict";

/*

NOTES



 */

	// Initialize "requirejs" Module handling.
	requirejs.config({
		//By default load any module IDs from js/lib
		baseUrl: 'js/lib'
	});

	// Load all Modules.
	requirejs(
		["sprite",
			"tile",
			"char",
			"game",
			"background",
			"clock",
			"chest"
		],
	// All Modules Loaded.


// Start "root" or "main" module/ script.
function(Sprite, Tile, Char, Game, Background, Clock, Chest){

	// CONTROLS.KEYS variables
	var keyW = false;
	var keyA = false;
	var keyS = false;
	var keyD = false;
	var keyI = false;
	var keyJ = false;
	var keyK = false;
	var keyL = false;
	var keyT = false;
	var keySPACE = false;
	var keyUA = false;
	var keyDA = false;
	var mouseClick = false;
	var mouseCords = [0, 0];

	// Event listener
	window.addEventListener("keydown", onKeyDown, false);
	window.addEventListener("keyup", onKeyUp, false);
	window.addEventListener("click", onClick, false);

	function onClick(event) {
		var rect = canvas.getBoundingClientRect();
		if (!mouseClick){
			if (event.clientX - rect.left > 0 && event.clientY - rect.top > 0) {
				if (event.clientX - rect.left < canvas.width && event.clientY - rect.top < canvas.height) {
					mouseClick = true;
					mouseCords[0] = event.clientX - rect.left;
					mouseCords[1] = event.clientY - rect.top;
				}
			}
		}
		else if (mouseClick){
			mouseClick = false;
		}
	}

	function onKeyDown(event) {
		var keyCode = event.keyCode;
		console.log(keyCode);
		switch (keyCode) {
			case 68:
				// D key
				keyD = true;
				break;
			case 83:
				// S key
				keyS = true;
				break;
			case 65:
				// A key
				keyA = true;
				break;
			case 87:
				// W key
				keyW = true;
				break;
			case 73:
				// I Key
				keyI = true;
				break;
			case 74:
				// J Key
				keyJ = true;
				break;
			case 75:
				// K Key
				keyK = true;
				break;
			case 76:
				// L key
				keyL = true;
				break;
			case 84:
				// T key
				keyT = true;
				break;
			case 32:
				// SPACEBAR
				keySPACE = true;
				break;
			case 38:
				// Up Arrow
				keyUA = true;
				break;
			case 40:
				// Down Arrow
				keyDA = true;
				break;
		}
	}

	function onKeyUp(event) {
		var keyCode = event.keyCode;

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
			case 73:
				// I Key
				keyI = false;
				break;
			case 74:
				// J Key
				keyJ = false;
				break;
			case 75:
				// K Key
				keyK = false;
				break;
			case 76:
				// L Key
				keyL = false;
				break;
			case 84:
				// T Key
				keyT = false;
				break;
			case 32:
				// SPACEBAR
				keySPACE = false;
				break;
			case 38:
				// Up Arrow
				keyUA = false;
				break;
			case 40:
				// Down Arrow
				keyDA = false;
				break;
		}
	}
	// End Game Controls Object

	window.requestAnimFrame = (function(callback) {

		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||

		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};

	})();

	// Level Editting/Creation buttons
	var chestBTN = document.getElementById('chestBTN');
	var chestPlace = false;

	chestBTN.addEventListener('click', function(event) {
		if (thisGame !==undefined) {
			chestPlace = true;
			console.log(chestPlace);
		}
	});

	// Part of Main Object with Mainloop being a method of said Object.

		var canvas = document.getElementById('myCanvas');
		var ctx = canvas.getContext('2d');
		// Size reference variables
		canvas.width = 800;
		canvas.height = 500;
		var halfCanvasWidth = (canvas.width/2);
		var halfCanvasHeight = (canvas.height/2);
		var horizon = canvas.height * (4 / 5);

		// Time and Game Clock
		var current = 0;
		var gameClock = new Clock();

		// Tone/ Background
		var background = new Background(canvas, ctx);

		var player = new Char(0, 0, 50, 50, "player");

		var ocean = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
					1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

		var thisGame = new Game(player, canvas, ctx);

		thisGame.levelCreate(50);

		thisGame.mapMemory.push(ocean);

		var running;

		function Mainloop() {
			running = true;
			current = gameClock.secondsElapsed();
			// Key Events and Log
			if(keySPACE) {
				console.log(thisGame.mapMemory);
			}
			else {
				if (keyD) {
					keyA = false;
					keyW = false;
					keyS = false;
					player.dir = "D";
				}
				if (keyA) {
					keyD = false;
					keyW = false;
					keyS = false;
					player.dir = "A";
				}
				if (keyW) {
					keyA = false;
					keyD = false;
					keyS = false;
					player.dir = "W";
				}
				if (keyS) {
					keyA = false;
					keyW = false;
					keyD = false;
					player.dir = "S";
				}
				if (!keyD && !keyA && !keyW && !keyS) {
					player.dir = " ";
				}
				if (keyI === true) {
					player.interacting = true;
					console.log("I is Pressed");
					keyI = false;
				}
				else {
					player.interacting = false;
				}
				if (keyJ === true) {
					console.log("J is Pressed");
					player.interactingSecondary = true;
					keyJ = false;
				}
				else {
					player.interactingSecondary = false;
				}
				if (keyK === true) {
					player.interactingThird = true;
				}
				else {
					player.interactingThird = false;
				}
				if (keyL=== true) {
					player.interactingFourth = true;
					running = false;
					keyL = false;
				}
				else {
					player.interactingFourth = false;
				}
			}


			thisGame.update(current);
			//board controller
			thisGame.GPS();

			//game rendering
			background.display();

			thisGame.display();

			//level editing mouse tool
			if (mouseClick) {
				for (var w = 0; w < thisGame.tiles.length; w++) {
					if (mouseCords[0] > thisGame.tiles[w].x && mouseCords[0] < thisGame.tiles[w].x + thisGame.tiles[w].width) {
						if (mouseCords[1] > thisGame.tiles[w].y && mouseCords[1] < thisGame.tiles[w].y + thisGame.tiles[w].height) {
							if (chestPlace === true) {
								thisGame.tempClear();
								thisGame.temp = new Chest(thisGame.tiles[w].x, thisGame.tiles[w].y, 50, 50, "chest");
								thisGame.chests.push(thisGame.temp);
								thisGame.tiles[w].worldObject.push(thisGame.temp);
								chestPlace = false;
								mouseClick = false;
								for (var b = 0; b < thisGame.chests.length; b++) {
									console.log(thisGame.chests[b]);
								}
							}
							else {
								var newId = prompt("Enter a new ID.");
								if (newId !== null) {
									thisGame.tiles[w].idUpdate(newId);
								}
								mouseClick = false;
								console.log(thisGame.tiles[w]);
							}
						}
					}
				}
			}
			//unused game exit
			if (!running) {
				return;
			}

			window.requestAnimFrame(Mainloop);
		}

	$(document).ready(function(){

		document.documentElement.style.overflow = 'hidden';
		document.body.scroll = "no";

		gameClock.beginTimer();

		window.requestAnimFrame(Mainloop);

	});

});
