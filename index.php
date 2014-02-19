<!DOCTYPE html PUBLIC "-//W3C/DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="pt-BR" lang="pt-BR">
<head>
	<title>pong.js</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<base href="<?php echo "http://{$_SERVER["SERVER_NAME"]}/thegamepath/pong.js/" ;?>" />
	
	<script type="text/javascript" src="classes/Ball.js"></script>
	<script type="text/javascript" src="classes/Paddle.js"></script>
	<script type="text/javascript" src="engine/Player.js"></script>
	<script type="text/javascript" src="engine/Computer.js"></script>
	<script type="text/javascript" src="engine/engine.js"></script>

	<style type="text/css">
	* { margin: 0; padding: 0; }
	body { font: 13px Tahoma, Verdana, sans-serif; }
	div.cntrd { width: 520px; margin: 0 auto; }
	div#gameStatus {
		background-color:	#EFEFEF;
		padding:			5px;
		color:				#9A9A9A;
	}
		div#gameStatus span { font-weight: bold; }
		div#gameStatus span#computer { color: red; }
		div#gameStatus span#player { color: blue; }
		
	</style>
</head>
<body>
	<div id="gameStatus">
		<div class="cntrd">
		COMPUTER: <span id="computer">0</span>
		PLAYER: <span id="player">0</span>
		</div>
	</div>
	<div id="canvasPanel" class="cntrd"></div>
</body>
</html>
