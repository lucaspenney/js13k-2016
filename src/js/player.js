var Entity = require('./entity');
var Physics = require('./physics');
var BoundingBox = require('./boundingbox');

class Player extends Entity {
	constructor(game, x, y) {
		super(game, x, y);
		this.classname = "Player";
		this.game = game;
		this.physics = new Physics(this.game, this, new BoundingBox(this.game, this, 20, 20));
		this.physics.gravity = true;
		this.lastJump = 0;
		this.jumpStep = 0;
	}
	update(input) {
		this.physics.update();
		if (input[38] || input[87]) { //up
			//this.physics.addVelocity(0,-0.6);
			this.jump();
		}
		if (input[37] || input[65]) { //left
			if (this.physics.standing) {
				this.physics.addVelocity(-0.12,0);
			} else this.physics.addVelocity(-0.10,0);
		}
		if (input[39] || input[68]) { //right
			if (this.physics.standing) {
				this.physics.addVelocity(0.12,0);
			} else this.physics.addVelocity(0.10, 0);
		}
		if (input[40] || input[83]) { //down
			//this.physics.addVelocity(0,0.2);
		}

		if (this.jumpStep > 0) {
			this.jumpStep += 1;
			this.physics.addVelocity(0, (15 - this.jumpStep) * -0.13);
		}
	}
	render(ctx, screen) {
		ctx.fillStyle = "#FFF";
		ctx.fillRect(this.pos.x, this.pos.y, 20, 20);
	}
	jump() {
		if (Date.now() - this.lastJump > 500 && this.physics.standing) {
			this.lastJump = Date.now();
			this.jumpStep = 1;
			setTimeout(() => {
				this.jumpStep = 0;
			}, 100);
		}
	}
}

module.exports = Player;