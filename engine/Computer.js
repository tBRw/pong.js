function Computer() {
	var xPaddle = CANVAS_WIDTH/2 - PADDLE_WIDTH/2;
	this.paddle = new Paddle(xPaddle, 0, PADDLE_WIDTH, PADDLE_HEIGHT);
}

Computer.prototype.render = function() {
	this.paddle.render();
}

Computer.prototype.update = function(ball) {
	if (ball.y_speed > 0) {
		// ball is going towars player
		this.paddle.x_speed = 0;
	} else {
		var midpoint = this.paddle.x + this.paddle.width/2;
		var PADDLE_STEP = BALL_SPEED * .9;
		if (midpoint != ball.x) {
			if (midpoint > ball.x) this.paddle.x_speed = -PADDLE_STEP;
			else this.paddle.x_speed = PADDLE_STEP;
		
			this.paddle.x += this.paddle.x_speed;
		}
	}
}

Computer.prototype.checkCollision = function(ball) {
	var x0 = this.paddle.x;
	var xf = this.paddle.x + this.paddle.width;
	var y  = this.paddle.y + this.paddle.height;
	var midpoint = this.paddle.x + this.paddle.width/2;

	if ((ball.y - ball.radius) <= y && (ball.x >= x0 && ball.x <= xf)) {
		// Collision occurred
		ball.y_speed = -ball.y_speed;

		// Ball returns with a certain angle depending on the position
		// it collided with the paddle:
		// 0-MIDPOINT: returns with x_speed = -X_SPEED
		// MIDPOINT: returns with x_speed = 0
		// MIDPOINT-END: returns with x_speed = X_SPEED
		if (ball.x == midpoint) ball.x_speed = 0;
		else if (ball.x < midpoint) ball.x_speed = -BALL_SPEED;
		else ball.x_speed = BALL_SPEED;
	}	
}
