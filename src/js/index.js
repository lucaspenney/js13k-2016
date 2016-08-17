var player = require('./player');
var Goo = require('./goo');
var Game = require('./game');
var Screen = require('./screen');

window.onload = function() {
	var screen = new Screen();
	var game = new Game(screen);
	var g = new Goo({
		fullscreen: false,
		width:600,
		height:400,
		onDraw: (g) => {
			game.update(g.keysDown);
			game.render(g.ctx, game.screen);
			var fps = g.fps ? g.fps : -1;
			g.ctx.fillStyle = "#FFF";
			g.ctx.fillText(fps.toFixed(2), 10, 10);
		},
	});
	document.body.appendChild(g.canvas);
	screen.setCtx(g.ctx);
};