class Sprite {
	constructor(entity, img) {
		this.entity = entity;
		this.img = new Image();
		this.img.src = img;
		this.scale = 1;
		this.width = 0;
		this.height = 0;
		this.alpha = 1;
		this.loaded = false;
		this.flipHorizontal = false;
		this.img.onload = () => {
			this.loaded = true;
			this.xOffset = 0;
			this.yOffset = 0;
			this.width = this.entity.width || this.img.width;
			this.height = this.entity.height || this.img.height;
			this.imgWidth = this.img.width;
			this.imgHeight = this.img.height;
			this.frameWidth = this.img.width;
			this.frameHeight = this.img.height;
			this.rotationXOffset = 0;
			this.rotationYOffset = 0;
		}
		this.canvas = null;
		this.tick = 0;
	}
	animate(func) {
		var canvas = document.createElement('canvas');
		canvas.width = this.width;
		canvas.height = this.height;
		var ctx = canvas.getContext('2d');
		ctx.drawImage(this.img, 0, 0);
		func(ctx, this.tick);

		this.canvas = canvas;
	}
	draw(ctx, screen, x, y) {
		if (this.loaded) {
			if (this.entity.width && this.entity.height) {
				this.width = this.entity.width;
				this.height = this.entity.height;
			}

			//Draw relative to screen
			x -= screen.offset.x;
			y -= screen.offset.y;
			//Perform the draw
			ctx.save(); 

			ctx.translate(x + this.rotationXOffset, y + this.rotationYOffset);
			ctx.rotate(this.entity.rotation.toRadians());
			if (this.flipHorizontal) {
				
			}
			ctx.translate(-(this.width / 2), -(this.height / 2)); //Rotational axis on center of sprite
			ctx.globalAlpha = this.alpha;

			ctx.translate(this.xOffset, this.yOffset);
			if (this.flipHorizontal) {
				ctx.translate((this.frameWidth*0.5), (this.frameHeight * 0.5));
				ctx.scale(-1,1)
				ctx.translate((this.frameWidth*-0.5), (this.frameHeight * -0.5));
			}
			try {
				if (this.canvas) {
					ctx.drawImage(this.canvas, 0,0, Math.floor(this.frameWidth), Math.floor(this.frameHeight), 0, 0, this.width, this.height);	
				}
				else ctx.drawImage(this.img, 0,0, Math.floor(this.frameWidth), Math.floor(this.frameHeight), 0, 0, this.width, this.height);
			} catch (e) {

			}
			ctx.restore();
		}
	}
}
module.exports = Sprite; 