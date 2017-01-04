class Sprite {
	constructor(entity, img, scale) {
		this.entity = entity;
		this.img = document.getElementsByClassName(img)[0];
		this.scale = scale || 1;
		this.height = 0;
		this.alpha = 1;
		this.loaded = true;
		this.flipHorizontal = false;
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
		this.tick = 0;
		if (this.scale !== 1) {
			this.canvas = document.createElement('canvas');
			this.canvas.width = this.width * this.scale;
			this.canvas.height = this.height * this.scale;
			var ctx = this.canvas.getContext('2d');
			ctx.imageSmoothingEnabled = false;
			ctx.webkitImageSmoothinEnabled = false;
			ctx.drawImage(this.img, 0,0,this.width*this.scale,this.width*this.scale);
			this.img = this.canvas;
			this.canvas = null;
			this.frameWidth *= this.scale;
			this.frameHeight *= this.scale;
			this.width *= this.scale;
			this.height *= this.scale;
		}

	}
	animate(func) {
		if (!this.loaded) return;
		var canvas = document.createElement('canvas');
		canvas.width = this.width;
		canvas.height = this.height;
		var ctx = canvas.getContext('2d');
		ctx.drawImage(this.img, 0, 0);
		var data = ctx.getImageData(0,0,this.width,this.height);
		var newData = func(data, this.tick);
		ctx.putImageData(data,0,0);
		this.tick++;
		this.canvas = canvas;
	}
	draw(ctx, screen, x, y) {
		if (this.loaded) {
			var buffer = 32;
			if (x - buffer > screen.width + screen.offset.x || x + buffer < screen.offset.x) {
				return;
			}
			if (y - buffer > screen.height + screen.offset.y || y + buffer < screen.offset.y) {
				return;
			}

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
				else {
					ctx.drawImage(this.img, 0,0, Math.floor(this.frameWidth), Math.floor(this.frameHeight), 0, 0, this.width, this.height);
				}
			} catch (e) {

			}
			ctx.restore();
		}
	}
}
module.exports = Sprite; 