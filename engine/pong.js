/*
 * pong.js
 *
 * A simple implementation of the pong game
 *
 *  Julio Cesar Martins - theBurningRobotWorkshop
 *  feb, 2014
 */

var animate = window.requestAnimationFrame
			|| window.webkitRequestAnimationFrame
			|| window.mozRequestAnimationFrame
			|| function(callback) { window.setTimeout(callback, 1000/60); }

var canvas = document.createElement('canvas');
var CANVAS_WIDTH  = 640; canvas.width = CANVAS_WIDTH;
var CANVAS_HEIGHT = 480; canvas.height = CANVAS_HEIGHT;

var PADDLE_WIDTH  = 80;
var PADDLE_HEIGHT = 13;
var BALL_RADIUS   = 6;
var BALL_SPEED    = 3;

var context = canvas.getContext('2d');

var player   = new Player();
var computer = new Computer;
var ball     = new Ball(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);

window.onload = function() {
	document.body.appendChild(canvas);
	animate(step);
}

var step = function() {
	update();
	render();
	animate(step);
}

var update = function() { 
	player.update();
	ball.update();
}

var render = function() {
	context.fillStyle = "#EFEFEF";
	context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	
	player.render();
	computer.render();
	ball.render();
}

function Paddle(x, y) {
	this.x = x;
	this.y = y;
	this.width = PADDLE_WIDTH;
	this.height = PADDLE_HEIGHT;
 	this.x_speed = 0;
	this.y_speed = 0;
}

Paddle.prototype.render = function() {
	context.fillStyle = "#000000";
	context.fillRect(this.x, this.y, this.width, this.height);
}

function Player() {
	this.paddle = new Paddle(CANVAS_WIDTH/2 - PADDLE_WIDTH/2,
							 CANVAS_HEIGHT - PADDLE_HEIGHT - 10, 50, 10);
}

Player.prototype.render = function() {
	this.paddle.render();
}

Player.prototype.update = function() {
	var PADDLE_STEP = 5;

	for (var key in keysDown) {
		var val = Number(key);
		switch (val) {
			case 37:  // left arrow
				if (this.paddle.x >= PADDLE_STEP)
					this.paddle.x -= PADDLE_STEP;
				else
					this.paddle.x = 0;
				break;
			case 39:
				if (this.paddle.x <= CANVAS_WIDTH 
									 - PADDLE_WIDTH - PADDLE_STEP)
					this.paddle.x += PADDLE_STEP;
				else
					this.paddle.x = CANVAS_WIDTH - PADDLE_WIDTH;
				break;
		}
	}
}

function Computer() {
	this.paddle = new Paddle(CANVAS_WIDTH/2 - PADDLE_WIDTH/2, 10, 50, 10);
}

Computer.prototype.render = function() {
	this.paddle.render();
}

function Ball(x, y) {
	this.x = x;
	this.y = y;
	this.x_speed = 0;
	this.y_speed = BALL_SPEED;
	this.radius =  BALL_RADIUS;
}

Ball.prototype.render = function() {
	context.beginPath();
	context.arc(this.x, this.y, this.radius, 2*Math.PI, false);
	context.fillStlye = "#6699CC";
	context.fill();
}

Ball.prototype.update = function() {
	this.x += this.x_speed;
	this.y += this.y_speed;
}


var keysDown = {};
window.addEventListener("keydown", function(event) {
	keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
	delete keysDown[event.keyCode];
});
