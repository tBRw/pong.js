/* pong.js - A simple implementation of the pong game
 * 
 * Paddle: implements and renders a paddle 
 */

function Paddle(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
 	this.x_speed = 0;
}

Paddle.prototype.render = function() {
	context.fillStyle = "#FFFFFF";
	context.fillRect(this.x, this.y, this.width, this.height);
}

Paddle.prototype.restart = function() {
	this.x_speed = 0;
	this.x       = CANVAS_WIDTH/2 - this.width/2;
}
