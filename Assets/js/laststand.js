//jshint esversion:6 

"use strict";

requirejs.config({
		//By default load any module IDs from js/lib
		baseUrl: 'js'
	});

	// Load all Modules.
	requirejs(
		[
		"GameObject",
		"Canvas",
		"Clock",
		"BoardManager"
		],	
	// All Modules Loaded.
	
	
// Start "root" or "main" module/ script.	
function(GameObject, Canvas, Clock, BoardManager){

	//let spriteSheet = document.getElementById("spriteSheet");

	let rAF;
	
	const Keys = [{key:"a", pressed:false}, {key:"s", pressed:false},
				{key:"d", pressed:false}, {key:"w", pressed:false},
				{key:"ArrowDown", pressed:false}, {key:"UpArrow", pressed:false},
				{key:"LeftArrow", pressed:false}, {key:"RightArrow", pressed:false},
				];

	// Event listener
	window.addEventListener("keydown", onKeyDown, false);
	window.addEventListener("keyup", onKeyUp, false);

	function onKeyDown(event) {
		Keys.forEach(function(k){
			if(event.key === k.key){
				k.pressed = true;
			}
			else {
				k.pressed = false;
			}
		});
	}

	function onKeyUp(event) {
		Keys.forEach(function(k){
			if(event.key === k.key){
				k.pressed = false;
			}
		});
	}
	
	//stuff for skeleton games 
	
	const basicUnit = 4;
	let gameUnit = basicUnit*basicUnit; 
	let playerUnit = gameUnit * basicUnit;
	
	let blankLevel = function(unit){
		let temp = [];
		for (let j = 0; j*unit < 512; j++ ) {
			for (let i = 0; i*unit < 512; i++) {
				temp.push(GameObject({x:i*unit, y:j*unit, w:unit, h:unit, id:"sprite"}));
			}
		}
		return temp;
	}	
	let blockStairs = function(unit) {
		let temp = [];
		let num = 7;
		for (let i = 1; i*unit<512; i++) {
			if (num !== 1) {
				temp.push(GameObject({x:i*unit, y:(num--)*64, w:unit, h:unit, id:"block"}));
			} else {
				temp.push(GameObject({x:i*unit, y:128, w:unit, h:unit, id:"block"}));
			}
		}
		return temp;
	}
	
	// Game

	const Screen = Canvas("myCanvas", 512, 512);
	
	const gameClock = Clock();
	
	let current = 0;
	
	let velocity = {};
	
	const drones = [GameObject({x:0, y:448, w:playerUnit, h:playerUnit, id:"drone"})];
	
	let blocks = blockStairs(playerUnit);
	console.log(blocks.length);
	
	let tiles = blankLevel(gameUnit);
	console.log(tiles.length);
	
	const player = GameObject({x:256, y:192, w:playerUnit, h:playerUnit, id:"player"});
	
	let allSpritesList = [...tiles, ...blocks, ...drones, player];

	const Game = BoardManager(Screen.rect(), allSpritesList);

	// For Debugging
	
	let spawn = 0;
	
	let knightFall = false;
	
	let running = false;

	function Mainloop( tFrame ) {
		
		if (running) {
		
			current = gameClock.secondsElapsed(tFrame);
			
			if(2 < (current - spawn) && drones[drones.length-1].rect().x > 64){
				let temp = GameObject({x:0, y:448, w:playerUnit, h:playerUnit, id:"drone"});
				spawn = current;
				drones.push(temp);
				allSpritesList.push(temp);
			}
			
			// Key Events and Log
			// Player 1
			if (Keys[4].pressed) {
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
			
			// A
			if (Keys[0].pressed) {
				velocity = {x:-1,y:0,z:0};
			// D
			} else if (Keys[2].pressed) {
				velocity = {x:1,y:0,z:0};
			// W
			} else if (Keys[3].pressed) {
				velocity = {x:0,y:-1,z:0};
			// S
			} else if (Keys[1].pressed) {
				velocity = {x:0,y:1,z:0};
			} else {
				velocity = {x:0,y:0,z:0};
			}
			Game.spriteListUpdate(drones, blocks);
			
			Game.stepCheck(drones);
			
			drones.forEach(function(drone){
				if (knightFall) {
					return;
				}
				knightFall = Game.knightFall(drone);
			});
			
			if (knightFall && player.rect().health < 1){
				Game.doKill(allSpritesList, player);
			}
			
			drones.forEach(function(drone){
				Game.tileMove(drone.stairClimb(), gameClock.DELTA(), drone.rect());
			});
			
			drones.forEach(function(drone){
				Game.blockCheck(drone.rect());
			});
			
			drones.forEach(function(drone){
				Game.borderCheck(drone.rect());
			});
			
			drones.forEach(function(drone){
				Game.droneVplayer(drone, Game.stepCheck(drones));
			});
			
			drones.forEach(function(drone){
				if(drone.rect().y <= 64 && drone.rect().x >= 448){
					drone.deactivate();
					Game.doKill(drones, drone);
					Game.doKill(allSpritesList, drone);
				}
			});
			
			Screen.clear();
			Screen.display(allSpritesList);
			
			$("progress").attr("value", player.rect().health);
			
			$("#stop").click(function(){
				console.log("goodbye");
				running = false;
				$("progress").attr("value", 0);
			});
			
			rAF = window.requestAnimationFrame(Mainloop);
		}
		else {
			$("#start").click(function(){
				console.log("hello");
				running = true;
				$("progress").attr("value", 100);
			});
			rAF = window.requestAnimationFrame(Mainloop);
		}
	}

	$(document).ready(function(){
		gameClock.beginTimer();
		window.requestAnimationFrame(Mainloop);
	});
	
});