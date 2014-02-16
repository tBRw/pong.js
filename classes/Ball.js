/* pong.js - A simple implementation of the pong game
 * 
 * Ball: implements and renders a ball. Provides update functionality 
 */

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

Ball.prototype.update = function(player, computer) {
	this.x += this.x_speed;
	this.y += this.y_speed;


	var left   = this.x - this.radius;
	var right  = this.x + this.radius;
	var top    = this.y + this.radius;
	var bottom = this.y - this.radius;


	if ((this.x - this.radius) <= 0) this.x_speed = -this.x_speed;
	if ((this.x + this.radius) >= CANVAS_WIDTH)
		this.x_speed = -this.x_speed;


	if (this.y - this.radius <= 0) this.y_speed = -this.y_speed;
	if (this.y + this.radius >= CANVAS_HEIGHT)
		this.y_speed = -this.y_speed;
	
	if (this.y >= player.y && 
		(this.x >= player.x && this.x <= (player.x + player.width))) {
		this.y_speed = -this.y_speed;

		if (this.x == (player.x + (player.width/2)))
			this.x_speed = 0;
		else if (this.x > (player.x + (player.width/2)))
			this.x_speed = BALL_SPEED;
		else 
			this.x_speed = -BALL_SPEED;
	}

	if (this.y <= (computer.y + computer.height) &&
		(this.x >= computer.x && this.x <= (computer.x + computer.width)))
		this.y_speed = -this.y_speed;

	computer.x = this.x - computer.width/2;
}

Ball.prototype.checkCollision = function(object) {
}
