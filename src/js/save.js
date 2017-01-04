var Entity = require('./entity');
var Physics = require('./physics');
var BoundingBox = require('./boundingbox');
var Sprite = require('./sprite');
var Player = require('./player');

class Save extends Entity {
	constructor(game, x, y) {
		super(game, x, y);
		this.classname = "Player";
		this.game = game;
		this.sprite = new Sprite(this, 'floppy.gif', 1.5);
		//this.sprite.img = document.getElementsByTagName('img')[0];
		//this.physics = new Physics(this.game, this, new BoundingBox(this.game, this, 16,16));
		//this.physics.static = true;
	}
	update(input) {
		//this.physics.update();
		for (var i=0;i<this.game.entities.length;i++) {
			if (this.game.entities[i] instanceof Player) {
				if (this.game.entities[i].pos.distance(this.pos) < 40) {
					this.game.entities[i].lastSave = this;
				}
			}
		}
	}
	render(ctx, screen) {
		this.sprite.animate((data, tick) => {
			for (var i=0;i<data.data.length;i+=4) {
				//data.data[i] -= 1 * tick;
				//data.data[i+1] += 10 * tick;
				//data.data[i+2] += 10 * tick;
				if (tick > 50) data.data[i+3] -= 1.5 * tick;
				else data.data[i+3] -= 1.5 * (100 - tick);
			}
			if (tick > 100) { 
				this.sprite.tick = 0;
			}
			return data;
		});
		this.sprite.draw(ctx, screen, this.pos.x, this.pos.y);
	}
}

module.exports = Save;