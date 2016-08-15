var Entity = require('./entity');
var Physics = require('./physics');
var BoundingBox = require('./boundingbox');

class Block extends Entity {
	constructor(game, x, y) {
		super(game, x, y);
		this.classname = "Player";
		this.game = game;
		this.physics = new Physics(this.game, this, new BoundingBox(this.game, this, 100, 20));
		this.physics.static = true;
	}
	update(input) {
		this.physics.update();
	}
	render(ctx, screen) {
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(this.pos.x, this.pos.y, 100, 20);
	}
}

module.exports = Block;