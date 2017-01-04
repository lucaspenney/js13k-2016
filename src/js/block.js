var Entity = require('./entity');
var Physics = require('./physics');
var BoundingBox = require('./boundingbox');
var Sprite = require('./sprite');

class Block extends Entity {
	constructor(game, x, y) {
		super(game, x, y);
		this.classname = "Player";
		this.sprite = new Sprite(this, 'block.gif', 2);
		this.physics = new Physics(this.game, this, new BoundingBox(this.game, this, 32, 32));
		this.physics.static = true;
	}
	update(input) {
		this.physics.update();
	}
	render(ctx, screen) {
		this.sprite.draw(ctx, screen, this.pos.x, this.pos.y);
	}
}

module.exports = Block;