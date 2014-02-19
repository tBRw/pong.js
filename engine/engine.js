/* pong.js - A simple implementation of the pong game
 *  Julio Cesar Martins - theBurningRobotWorkshop
 *  feb, 2014
 *
 * Engine: Core of the pong.js.
 */

/* --- DECLARATIONS --- */

// Constants Definition
var CANVAS_WIDTH    = 520; 
var CANVAS_HEIGHT   = 640;
var PADDLE_WIDTH    = 80;
var PADDLE_HEIGHT   = 13;
var BALL_RADIUS     = 6;
var BALL_SPEED      = 5.5;
var PLAYER_POINTS   = 0;
var COMPUTER_POINTS = 0;

// Animation Frame
var animate = window.requestAnimationFrame
              || window.webkitRequestAnimationFrame
              || window.mozRequestAnimationFrame
              || function(callback)
                 { window.setTimeout(callback, 1000/60); }

// Canvas & Context
var canvas    = document.createElement('canvas');
canvas.width  = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

var context = canvas.getContext('2d');

// Instances
var player   = new Player();
var computer = new Computer();
var ball     = new Ball(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);

/* --- GENERAL FUNCTIONS --- */

window.onload = function() {
	document.getElementById("canvasPanel").appendChild(canvas);
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
	ball.update(player, computer);
	computer.update(ball);
}

var render = function() {
	context.fillStyle = "#000000";
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
