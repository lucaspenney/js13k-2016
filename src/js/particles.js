var Vector = require('./vector');
var Entity = require('./entity');

class Particle {
	constructor(game, pos, props, step) {
		this.game = game;
		this.pos = pos;
		this.vel = new Vector(0,0);
		this.props = props;
		this.step = step;
		this.lifeTime = 0;
		this.update();
	}
	update() {
		this.step(this, this.lifeTime);
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
		if (this.props.r < 0) this.props.r = 0;
		if (this.props.g < 0) this.props.g = 0;
		if (this.props.b < 0) this.props.b = 0;
		this.lifeTime++;
	}
	render(ctx, screen) {
		ctx.fillStyle = "rgba(" + Math.floor(this.props.r) + "," + Math.floor(this.props.g) + "," + Math.floor(this.props.b) + "," + this.props.a + ")";
		ctx.fillRect(this.pos.x - screen.offset.x, this.pos.y - screen.offset.y, this.props.size, this.props.size);
	}
};

class ParticleSystem extends Entity {
	constructor(game, pos, type) {
		super(game,pos.x,pos.y);
		this.game = game;
		this.pos = pos;
		this.particles = [];
		this.types = {
			'air': {
				amount: null,
				lifeTime: 60,
				rate: 1,
				r: 245,
				g: 245,
				b: 245,
				a:0.3,
				size: 2,
				step: function(particle, time) {
					if (time < 2) particle.vel.y = -4;
					else particle.vel.y += Math.random() * 0.15;
					//particle.vel.x += (Math.random() - 0.5) * 5;
					
				},
				create: () => {
					var pos = this.pos.clone();
					pos.x += (Math.random() - 0.5) * 24;
					pos.y += 14;
					return new Particle(this.game, pos, JSON.parse(JSON.stringify(this.opts)), this.opts.step)
				}
			}
		}
		this.opts = this.types[type];
		this.created = 0;
	}
	update() {
		var amount = (this.opts.amount) ? this.opts.amount : Infinity;
		if (this.created < amount) {
			for (var i=0;i<this.opts.rate;i++) {
				this.particles.push(this.opts.create());
				this.created++;
			}
		}
	}
	render(ctx,screen) {
		for (var i = this.particles.length - 1; i >= 0; i--) {
			if (this.particles[i].lifeTime > this.opts.lifeTime) {
				this.particles.splice(i,1);
				continue;
			}
			this.particles[i].update();
			this.particles[i].render(ctx,screen);
		}
	}
}

module.exports = ParticleSystem;