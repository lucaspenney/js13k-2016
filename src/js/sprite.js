var Class = require('./class');

module.exports = Class.extend({
	init: function(entity, img) {
		this.entity = entity;
		this.img = new Image();
		this.img.src = img;
		this.scale = 1;
		this.width = 0;
		this.height = 0;
		this.alpha = 1;
		this.loaded = false;
		var _this = this;
		this.img.onload = function() {
			_this.loaded = true;
			_this.xOffset = 0;
			_this.yOffset = 0;
			_this.width = _this.entity.width || _this.img.width;
			_this.height = _this.entity.height || _this.img.height;
			_this.imgWidth = _this.img.width;
			_this.imgHeight = _this.img.height;
			_this.frameWidth = _this.img.width;
			_this.frameHeight = _this.img.height;
			_this.rotationXOffset = 0;
			_this.rotationYOffset = 0;
		}
	},
	draw: function(ctx, screen, x, y) {
		if (this.loaded) {
			if (this.entity.width && this.entity.height) {
				this.width = this.entity.width;
				this.height = this.entity.height;
			}

			//Draw relative to screen
			x -= screen.xOffset;
			y -= screen.yOffset;
			//Perform the draw
			ctx.save();
			ctx.translate(x + this.rotationXOffset, y + this.rotationYOffset);
			ctx.rotate(this.entity.rotation.toRadians());
			ctx.translate(-(this.width / 2), -(this.height / 2)); //Rotational axis on center of sprite
			ctx.globalAlpha = this.alpha;
			try {
				ctx.drawImage(this.img, this.xOffset, this.yOffset, Math.floor(this.frameWidth), Math.floor(this.frameHeight), 0, 0, this.width, this.height);
			} catch (e) {

			}
			ctx.restore();
		}
	},
});