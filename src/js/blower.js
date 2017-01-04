var Entity = require('./entity');
var Physics = require('./physics');
var BoundingBox = require('./boundingbox');
var Sprite = require('./sprite');
var Player = require('./player');
var Particles = require('./particles');

class Blower extends Entity {
	constructor(game, x, y) {
		super(game, x, y);
		this.classname = "Spike";
		this.sprite = new Sprite(this, 'blower.gif', 2);
		this.physics = new Physics(this.game, this, new BoundingBox(this.game, this, 0, 0));
		this.physics.static = true;
		this.area = 15;
		this.particles = new Particles(this.game,this.pos.clone(),'air');
	}
	update(input) {
		this.physics.update();
		for (var i=0;i<this.game.entities.length;i++) {
			var distance = this.game.entities[i].pos.distance(this.pos)
			if (this.game.entities[i] instanceof Player && distance  < 120) {
				if (this.game.entities[i].pos.x > this.pos.x - this.area && this.game.entities[i].pos.x < this.pos.x + this.area) {
					if (this.game.entities[i].physics.vel.y > 0 && this.game.entities[i].physics.vel.y < 0.7) {
						this.game.entities[i].physics.addVelocity(0, -0.4);
					} else {
						this.game.entities[i].physics.addVelocity(0, -1.0);
					}
					
				}
			}
		}
	}
	render(ctx, screen) {
		this.sprite.animate((data, tick) => {
			var length = data.data.length - (this.sprite.width * 4 * 4);
			for (var i=0;i<length;i+=4) {
				//data.data[i] -= 1 * tick;
				//data.data[i+1] += 10 * tick;
				//data.data[i+2] += 10 * tick;
				if (tick > 3) data.data[i+3] -= 3.5 * tick;
				else data.data[i+3] -= 1.5 * (100 - tick);
			}
			if (tick > 6) {
				this.sprite.tick = 0;
			}
			return data;
		});
		this.sprite.draw(ctx, screen, this.pos.x, this.pos.y);
	}
}

module.exports = Blower;