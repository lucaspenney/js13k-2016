var Vector = require('./vector');

class BoundingBox {
	constructor(game,entity,width,height) {
		this.entity = entity;
		this.pos = entity.pos.clone();
		this.width = width;
		this.height = height;
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
		if (this.pos.x + this.width > e.bounds.pos.x && this.pos.x < e.bounds.pos.x + e.bounds.width) {
			if (this.pos.y + this.height > e.bounds.pos.y && this.pos.y < e.bounds.pos.y + e.bounds.height) {
				return true;
			}
		}
		return false;
	}
	getDistBetween(e) {
		var point1a = this.pos.x + (this.width / 2);
		var point1b = this.pos.y + (this.height / 2);
		var point1 = new Vector(point1a, point1b);
		var point2a = e.bounds.pos.x + (e.bounds.width / 2);
		var point2b = e.bounds.pos.y + (e.bounds.height / 2);
		var point2 = new Vector(point2a, point2b);
		var distance = point1.distance(point2);
		return distance;
	}
	isPointIn(x, y) {
		if (this.pos.x === undefined || this.pos.y === undefined || this.pos.x === null || this.pos.y === null) return -1;
		if (this.pos.x + this.width > x && this.pos.x < x) {
			if (this.pos.y + this.height > y && this.pos.y < y) {
				return true;
			}
		}
		return false;
	}
}

module.exports = BoundingBox;