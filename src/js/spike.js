var Entity = require('./entity');
var Physics = require('./physics');
var BoundingBox = require('./boundingbox');
var Sprite = require('./sprite');
var Player = require('./player');

class Spike extends Entity {
	constructor(game, x, y) {
		super(game, x, y);
		this.classname = "Spike";
		this.sprite = new Sprite(this, 'spike.gif', 2);
		this.physics = new Physics(this.game, this, new BoundingBox(this.game, this, 12, 18));
		this.physics.static = true;
		this.physics.events.on('collide', (entity) => {
			if (entity instanceof Player) {
				entity.die();
			}
		})
	}
	update(input) {
		this.physics.update();
		for (var i=0;i<this.game.entities.length;i++) {
			if (this.game.entities[i] instanceof Player) {
				if (this.game.entities[i].pos.distance(this.pos) < 17) {
					this.game.entities[i].die();
				}
			}
		}
	}
	render(ctx, screen) {
		this.sprite.draw(ctx, screen, this.pos.x, this.pos.y);
	}
}

module.exports = Spike;