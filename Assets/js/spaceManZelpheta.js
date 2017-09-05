"use strict";

requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/libSpaceMan/'
});

requirejs(["sprite", "enemy", "player", "stateEngine", "clock"],

function(Sprite, badGuy, Char, collideCloud, Clock){

window.requestAnimFrame = (function(callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||

	function(callback) {
		window.setTimeout(callback, 1000 / 60);
	};

})();

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
if (document.body.clientWidth < canvas.width){canvas.width = document.body.clientWidth;}
if (document.body.clientHeight < canvas.height){canvas.height = document.body.clientHeight;}
var halfCanvasWidth = (canvas.width/2);
var halfCanvasHeight = (canvas.height/2);
var horizon = canvas.height * (4 / 5);
var spriteSheet = document.getElementById("spriteSheet");
var backTheGround = document.getElementById("backTheGround");

// PLAYER 1 KEYS
var keyW = false;
var keyA = false;
var keyS = false;
var keyD = false;
var keyL = false;
var keyT = false;
var keySPACE = false;
var mouseClick = false;
var mouseCords = [0, 0];
var running = true;

// Event listener
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);
window.addEventListener("click", onClick, false);

function onClick(event) {
	var rect = canvas.getBoundingClientRect();
	if (!mouseClick){
		if (event.clientX - rect.left > 0 && event.clientY - rect.top > 0) {
			if (event.clientX - rect.left < canvas.width && event.clientY - rect.top < canvas.height) {
				mouseCords[0] = event.clientX - rect.left;
				mouseCords[1] = event.clientY - rect.top;
				mouseClick = true;
			}
		}
	}
	else if (mouseClick){
		mouseClick = false;
	}
	return;
}

function onKeyDown(event) {
    var keyCode = event.keyCode;
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
    }
}

// Background
function background() {
    this.display = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "lightblue";
		ctx.fillRect(0, 0, canvas.width, canvas.width);
    };
}

var vx = 5;
var vy = 5;
var current = 0;

var cloud = new collideCloud();
var gameClock = new Clock();
var foreground = new background();

var playerOne = new Char(halfCanvasWidth - (halfCanvasWidth * (1/6)), horizon - 100, 100, 100, "Player");
var playerOne_Group = [playerOne];

var missileList = [];

function Mainloop() {
	if (running) {
		if (playerOne.health < 0.5) {
			cloud.doKill(playerOne_Group, playerOne);
			keyT = false;
			running = false;
		}
		current = gameClock.secondsElapsed();
		// Key Events and Log
		// Player 1
		if (keyD && !playerOne.onLadder) {
			playerOne.velocity_x = vx;
		}
		if (keyA && !playerOne.onLadder) {
			playerOne.velocity_x = vx * -1;
		}
		if (keyW && playerOne.nearLadder) {
			playerOne.climb(-1);
		}
		else {
			keyW = false;
		}
		if (keyS && playerOne.nearLadder) {
			playerOne.climb(1);
		}
		else {
			keyS = false;
		}
		if (keyT) {
			playerOne.toss(current, missileList);
		}
		else {
			playerOne.tossing = false;
		}
		if (!keyA&& !keyD) {
			playerOne.velocity_x = 0;
		}
		if (!keyW && !keyS && !playerOne.jumping) {
			playerOne.velocity_y = 0;
		}
		if (keyL) {
			console.log(cloud.tangled.length, playerOne.nearLadder, playerOne.onGround, playerOne.onPlatform, playerOne.x);
			if (cloud.tangled.length > 0) {
				console.log(cloud.tangled[0].id);
			}
		}
		if (keySPACE) {
			playerOne.jump(current);
		}
		if (!keyS && !keyW && playerOne.onGround || keySPACE) {
			playerOne.onLadder = false;
		}
		foreground.display();
		cloud.rectDetect(allSpritesList, playerOne, current);
		cloud.stateActivate(playerOne, allSpritesList);
		cloud.levelPush(allSpritesList, playerOne);
		cloud.missileControl(allSpritesList, missileList, current);
		cloud.worldStrings(allSpritesList, missileList, playerOne_Group, current, ctx);

		if (mouseClick) {
		mouseClick = false;
		for (var w = 0; w < allSpritesList.length; w++) {
			if (mouseCords[0] > allSpritesList[w].x && mouseCords[0] < allSpritesList[w].x + allSpritesList[w].width) {
				if (mouseCords[1] > allSpritesList[w].y && mouseCords[1] < allSpritesList[w].y + allSpritesList[w].height) {
					console.log(allSpritesList[w].id);
				}
			}
		}
	}

		window.requestAnimFrame(function() {Mainloop();});
	}
	else {
		alert("Game Over, Refresh to Restart.");
		return;
	}
}

var allSpritesList = cloud.bigBang([

	[4000, -300, 100, 2800, "portal"],
	[0, -300, 100, 2800, "portal"],
	[0, 2500, screen.width, screen.height - horizon, "platform1"],
    [100, horizon, 400, 50, "platform2"],
    [750 , horizon, 200, 50, "platform2"],
    [1200 , horizon, 200, 50, "platform2"],
	[1650 , horizon, 200, 50, "platform2"],
	[2100 , horizon, 200, 50, "platform2"],
    [2550 , horizon, 200, 50, "platform2"],
    [3000 , horizon, 200, 50, "platform2"],
    [3450 , horizon, 200, 50, "platform2"],
    [3900 , horizon, 200, 50, "platform2"],
    [800 , 2300, 200, 50, "platform2"],
    [1300 , 2300, 200, 50, "platform2"],
    [1650 , 1300, 200, 50, "platform2"],
    [2100 , 1300, 200, 50, "platform2"],
    [2550 , 1300, 200, 50, "platform2"],
    [3000 , 1300, 200, 50, "platform2"],
    [3450 , 1300, 200, 50, "platform2"],
    [3900 , 1300, 200, 50, "platform2"],
    [2550 , 2200, 200, 50, "platform2"],
    [3000 , 2200, 200, 50, "platform2"],
    [3450 , 2300, 200, 50, "platform2"],
    [3900 , 2300, 200, 50, "platform2"],
    [800 , 2300, 200, 50, "platform2"],
    [1300 , 2300, 200, 50, "platform2"],
    [2400, horizon, 50, 1500, "ladder"],
    [1300, 1800, 50, horizon + 300, "ladder"],
    [1300, 500, 50, horizon + 400, "ladder"],
    [1700, 2500 - 100, 100, 100, "Jerk"],
    [1000, 2500 - 100, 100, 100, "Jerk"]
]);

function buttons() {
	function BTN(x, y, message) {
		this.x = x;
		this.y = y;
		this.message = message;
		this.display = function() {
			ctx.font = "50px serif";
			ctx.fillText(this.message, this.x, this.y);
		}
	}
	this.startBTN = new BTN(325, 300, "Start Game");
	this.display = function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		this.startBTN.display();
	}
}

var theButtons = new buttons();

function startScreen() {

	theButtons.display();

	if (mouseClick) {
		mouseClick = false;
		if (mouseCords[0] >= 325 && mouseCords[0] <= 550) {
			if (mouseCords[1] >= 250 && mouseCords[1] <= 300) {
				gameClock.beginTimer();
				return window.requestAnimFrame(function() {Mainloop();});
			}
		}
	}

	window.requestAnimFrame(function() {startScreen();});
}


$("Art").ready(function(){

	window.requestAnimFrame(function() {startScreen();});

});

});
