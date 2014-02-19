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

Player.prototype.checkCollision = function(ball) {
	var x0 = this.paddle.x;
	var xf = this.paddle.x + this.paddle.width;
	var y  = this.paddle.y;
	var midpoint = this.paddle.x + this.paddle.width/2;

	if (ball.y >= y && (ball.x >= x0 && ball.x <= xf)) {
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
