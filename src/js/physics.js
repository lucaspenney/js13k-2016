var Vector = require('./vector');

class Physics {
	constructor(game, entity, bounds) {
		this.game = game;
		this.entity = entity;
		this.vel = new Vector(0, 0);
		this.accel = new Vector(0, 0);
		this.rv = 0;
		this.ra = 0;
		this.maxVelocity = 7;
		this.mass = 100;
		this.bounds = bounds;
		this.collidesWith = [];
		this.hasCollided = [];
		this.static = false;
		this.timeScale = 1;
		this.gravity = false;
		this.standing = false;
	}
	update(entities) {
		if (this.gravity) {
			this.applyGravity();
		}

		this.applyDrag();
		this.standing = false;

		if (!this.static) {
			//Do collision and movement
			var vel = this.vel.clone();
			var collision = false;
			var colliding = null;
			var v = vel.clone();
			for (var i = 0; i < this.game.entities.length; i++) {
				if (this.game.entities[i] == this.entity) continue;
				colliding = this.game.entities[i];
				collision = this.bounds.wouldCollide(v, this.game.entities[i].physics);
				if (collision) break;
			}
			if (collision) {
				this.collide(colliding, v);
				this.bounds.update();
			} else {
				this.entity.pos.add(v);
				this.bounds.update();
			}
		} else {
			this.bounds.update();
		}

		//Reset acceleration as it's now been applied to the current velocity
		this.accel = new Vector(0, 0);
		this.ra = 0;
		this.hasCollided = [];
	}
	applyGravity() {
		this.addVelocity(0, 0.12);
	}
	applyDrag() {
		if (this.standing) {
			this.vel.x *= 0.93;	
		} else {
			this.vel.x *= 0.98;
		}
		this.vel.y *= 0.97;
	}
	collide(entity, velocity) {
		var e = entity.physics;

		//Try to fix
		var v = velocity.clone();
		v.y = 0;
		if (!this.bounds.wouldCollide(v, entity.physics)) {
			this.entity.pos.add(v);
			var pDiff = this.entity.pos.clone().subtract(entity.pos);
			if (velocity.y > 0 && pDiff.y < 0) {
				this.standing = true;
			}
		} else {
			v = velocity.clone();
			v.x = 0;
			if (!this.bounds.wouldCollide(v, entity.physics)) {
				this.entity.pos.add(v);
			}
		}

		//if (this.eventManager.dispatch('pre-collide', this.entity, entity).indexOf(false) !== -1) return false;


		//this.eventManager.dispatch('post-collide', this.entity, entity);
		//entity.physics.eventManager.dispatch('collision', entity.physics, this.entity);
	}
	addVelocity(x, y, r) {
		x = x || 0;
		y = y || 0;
		r = r || 0;

		if (this.vel.x > this.maxVelocity) this.vel.x = this.maxVelocity;
		else if (this.vel.x < this.maxVelocity * -1) this.vel.x = this.maxVelocity * -1;

		if (this.vel.y > this.maxVelocity) this.vel.y = this.maxVelocity;
		else if (this.vel.y < this.maxVelocity * -1) this.vel.y = this.maxVelocity * -1;

		if (this.rv > this.maxVelocity) this.rv = this.maxVelocity;
		else if (this.rv < this.maxVelocity * -1) this.rv = this.maxVelocity * -1;

		this.vel.x += x;
		this.vel.y += y;
	}
	on(event, func) {
		//Add event listener for collision
	}
}
module.exports = Physics;