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
	context.fillStlye = "#FFFFFF";
	context.fill();
}

Ball.prototype.update = function(player, computer) {
	this.x += this.x_speed;
	this.y += this.y_speed;

	var left   = this.x - this.radius;
	var right  = this.x + this.radius;
	var top    = this.y + this.radius;
	var bottom = this.y - this.radius;

	// --- Collision Checking
    // Check canvas left and right borders
	if ((this.x - this.radius) <= 0) this.x_speed = -this.x_speed;
	if ((this.x + this.radius) >= CANVAS_WIDTH)
		this.x_speed = -this.x_speed;

	// Check canvas top and bottom borders, restarts game
	if (this.y - this.radius <= 0) { // Top Border
		resetGame(player.paddle, computer.paddle, this);
		PLAYER_POINTS++;
		document.getElementById("player").innerHTML = PLAYER_POINTS;
	}
	if (this.y + this.radius >= CANVAS_HEIGHT) { // Bottom Border
		resetGame(player.paddle, computer.paddle, this);
		COMPUTER_POINTS++;
		document.getElementById("computer").innerHTML = COMPUTER_POINTS;
	}
	
	computer.checkCollision(ball);
	player.checkCollision(ball);
}

Ball.prototype.restart = function() {
	this.x = CANVAS_WIDTH/2;
	this.y = CANVAS_HEIGHT/2;
	this.x_speed = 0;
	this.y_speed = 0;
}

Ball.prototype.go = function() {
	this.y_speed = BALL_SPEED;
}

function resetGame(player, computer, ball) {
	player.restart();
	computer.restart();
	ball.restart();
	setTimeout("ball.go()", 500);
}
