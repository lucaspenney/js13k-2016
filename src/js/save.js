var Entity = require('./entity');
var Physics = require('./physics');
var BoundingBox = require('./boundingbox');
var Sprite = require('./sprite');

class Save extends Entity {
	constructor(game, x, y) {
		super(game, x, y);
		this.classname = "Player";
		this.game = game;
		this.sprite = new Sprite(this, './assets/img/floppy.gif');
		this.physics = new Physics(this.game, this, new BoundingBox(this.game, this, 64, 16));
		this.physics.static = true;
	}
	update(input) {
		this.physics.update();
	}
	render(ctx, screen) {
		this.sprite.animate((ctx2, tick) => {
			for (var i = 0; i < this.sprite.height-1; i++) {
				ctx2.globalAlpha = this.sprite.tick / 150;
				if (this.sprite.tick > 100) {
					ctx2.globalAlpha = 1 - (this.sprite.tick / 150);
				}
				ctx2.globalAlpha *= 0.5;
				ctx2.fillStyle = "#FFF";
				ctx2.fillRect(1, i, this.sprite.width-2, 2);
			}
			this.sprite.tick++;
			if (this.sprite.tick > 200) {
				this.sprite.tick = 0;
			}
		});
		ctx.fillStyle = "#FF0000";
		this.sprite.draw(ctx, screen, this.pos.x, this.pos.y);
	}
}

module.exports = Save;