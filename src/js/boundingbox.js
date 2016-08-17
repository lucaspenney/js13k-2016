var Vector = require('./vector');

class BoundingBox {
	constructor(game,entity,width,height) {
		this.entity = entity;
		this.pos = entity.pos.clone();
		this.width = width;
		this.height = height;
		this.offset = new Vector(width/2, height/2);
	}
	update() {
		this.pos = this.entity.pos.clone()
	}
	setDimensions(width, height) {
		this.width = width;
		this.height = height;
	}
	wouldCollide(v, e) {
		var wouldCollide = false;
		this.pos.add(v);
		if (this.isColliding(e)) wouldCollide = true;
		this.pos.subtract(v);
		return wouldCollide;
	}
	isColliding(e) {
		if (e === undefined) return false;
		if (this.pos.x - this.offset.x + this.width > e.bounds.pos.x - e.bounds.offset.x && this.pos.x - this.offset.x < e.bounds.pos.x - e.bounds.offset.x + e.bounds.width) {
			if (this.pos.y - this.offset.y + this.height > e.bounds.pos.y - e.bounds.offset.y && this.pos.y - this.offset.y < e.bounds.pos.y - e.bounds.offset.y + e.bounds.height) {
				return true;
			}
		}
		return false;
	}
}

module.exports = BoundingBox;