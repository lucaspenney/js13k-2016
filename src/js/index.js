var player = require('./player');
var BigScreen = require('./bigscreen');
var Goo = require('./goo');
var Game = require('./game');

window.onload = function() {
	var game = new Game();
	var g = new Goo({
		fullscreen: true,
		onDraw: (g) => {
			game.update(g.keysDown);
			game.render(g.ctx);
			var fps = g.fps ? g.fps : -1;
			g.ctx.fillStyle = "#FFF";
			g.ctx.fillText(fps.toFixed(2), 10, 10);
		},
	});
	var isFullScreen;
	BigScreen.onexit = function() {
		isFullScreen = false;
	};
	document.getElementsByTagName('canvas')[0].addEventListener('click', function() {
		if (BigScreen.enabled && !isFullScreen) {
			//BigScreen.toggle();
			isFullScreen = true;
		} else {
			// fallback
		}
	}, false);
};