/* pong.js - A simple implementation of the pong game
 *  Julio Cesar Martins - theBurningRobotWorkshop
 *  feb, 2014
 *
 * Engine: Core of the pong.js.
 */

/* --- DECLARATIONS --- */

// Constants Definition
var CANVAS_WIDTH  =	480; 
var CANVAS_HEIGHT = 640;
var PADDLE_WIDTH  = 80;
var PADDLE_HEIGHT = 13;
var BALL_RADIUS   = 6;
var BALL_SPEED    = 7;

// Animation Frame
var animate = window.requestAnimationFrame
              || window.webkitRequestAnimationFrame
              || window.mozRequestAnimationFrame
              || function(callback)
                 { window.setTimeout(callback, 1000/1000); }

// Canvas & Context
var canvas    = document.createElement('canvas');
canvas.width  = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

var context = canvas.getContext('2d');

// Instances
var player   = new Player();
var computer = new Computer;
var ball     = new Ball(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);

/* --- GENERAL FUNCTIONS --- */

window.onload = function() {
	document.body.appendChild(canvas);
	animate(step); // runs at 60fps, as defined in animate variable
                       // setTimeout parameter: 1000ms/60
}

// Step function: updates paddle positioning, ball positioning and
// points counting
var step = function() {
	update();
	render();
	animate(step);
}

var update = function() { 
	player.update();
	ball.update(player.paddle, computer.paddle);
}

var render = function() {
	context.fillStyle = "#EFEFEF";
	context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	
	player.render();
	computer.render();
	ball.render();
}

/* --- EVENT LISTENERS --- */
var keysDown = {};
window.addEventListener("keydown", function(event) {
	keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
	delete keysDown[event.keyCode];
});

/* --- INSTANCES FUNCTIONALITY --- */
// *** Player
function Player() {
	this.paddle = new Paddle(CANVAS_WIDTH/2 - PADDLE_WIDTH/2,
                             CANVAS_HEIGHT - PADDLE_HEIGHT, 
                             PADDLE_WIDTH, PADDLE_HEIGHT);
}

Player.prototype.render = function() {
	this.paddle.render();
}

Player.prototype.update = function() {
	var PADDLE_STEP = BALL_SPEED;

	/*
	If there's anything at keysDown array (a click to left or right), the
 	paddle moves accordingly. There is a verification if the paddle reached
	the left or right border
	*/
	for (var key in keysDown) {
		var val = Number(key);
		switch (val) {
			case 37:  // left arrow
				if (this.paddle.x >= PADDLE_STEP)
					this.paddle.x -= PADDLE_STEP;
				else
					this.paddle.x = 0;
				break;
			case 39: // right arrow
				var pWidth = CANVAS_WIDTH - PADDLE_WIDTH - PADDLE_STEP;
				if (this.paddle.x <= pWidth)
					this.paddle.x += PADDLE_STEP;
				else
					this.paddle.x = CANVAS_WIDTH - PADDLE_WIDTH;
				break;
		}
	}
}

// *** Computer
function Computer() {
	var xPaddle = CANVAS_WIDTH/2 - PADDLE_WIDTH/2;
	this.paddle = new Paddle(xPaddle, 0, PADDLE_WIDTH, PADDLE_HEIGHT);
}

Computer.prototype.render = function() {
	this.paddle.render();
}




