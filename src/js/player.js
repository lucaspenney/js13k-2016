var Entity = require('./entity');
var Physics = require('./physics');
var BoundingBox = require('./boundingbox');
var Sprite = require('./sprite');
var Angle = require('./angle');

class Player extends Entity {
	constructor(game, x, y) {
		super(game, x, y);
		this.classname = "Player";
		this.game = game;
		this.sprite = new Sprite(this, './assets/img/player.gif');
		this.sprite.flipHorizontal = true;
		this.physics = new Physics(this.game, this, new BoundingBox(this.game, this, 15, 15));
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
			this.sprite.flipHorizontal = true;
			if (this.physics.standing) {			
				this.physics.addVelocity(-0.11,0);
			} else this.physics.addVelocity(-0.09,0);
		}
		if (input[39] || input[68]) { //right
			this.sprite.flipHorizontal = false;
			if (this.physics.standing) { 
				this.physics.addVelocity(0.11,0);
			} else this.physics.addVelocity(0.09, 0);
		}
		if (input[40] || input[83]) { //down
			//this.physics.addVelocity(0,0.2);
		}

		if (this.jumpStep > 0) {
			this.jumpStep += 1;
			this.physics.addVelocity(0, (15 - this.jumpStep) * -0.12);
			(this.sprite.flipHorizontal) ? this.rotation.set(this.jumpStep * -1) : this.rotation.set(this.jumpStep);
		} else this.rotation.set(0);
	}
	render(ctx, screen) {
		//Set the screen position
		screen.setOffset(this.pos.clone());
		this.sprite.draw(ctx, screen, this.pos.x, this.pos.y);
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