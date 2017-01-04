var Sprite = require('./sprite');
var Vector = require('./vector');
var Color = require('./randomcolor')

class Screen {
    constructor() {
        this.ctx = null;
        this.offset = new Vector(0,0);
        this.maxOffset = new Vector(500,500);
        this.width = 600;
        this.height = 400;
        this.buildBackground();
    }
    setCtx(ctx) {
        this.ctx = ctx;
    }
    setOffset(v) {
        this.offset = v.clone();
        if (v.x > 0) {
            this.offset.x = v.x - (this.width/2);
        }
        if (v.x - (this.width/2) < 0) {
            this.offset.x = 0;
        }
        if (v.x + - (this.width/2)> this.maxOffset.x) {
            this.offset.x = this.maxOffset.x;
        }

        if (v.y > 0) {
            this.offset.y = v.y - (this.height/2);
        }
        if (v.y - (this.height/2) < 0) {
            this.offset.y = 0;
        }
        if (v.y + - (this.height/2)> this.maxOffset.y) {
            this.offset.y = this.maxOffset.y;
        }
        //this.offset.x = Math.floor(this.offset.x);
        //this.offset.y = Math.floor(this.offset.y);
    }
    buildBackground() {
        this.backgroundCanvas = document.createElement('canvas');
        this.backgroundCanvas.width = this.width *5;
        this.backgroundCanvas.height = this.height * 5;
        this.backgroundCtx = this.backgroundCanvas.getContext('2d');

        var colors = Color({ hue:"blue", luminosity:'light', count:100});
        var blockSize = 25;
        for (var x=0;x<this.backgroundCanvas.width/blockSize;x++) {
            for (var y=0;y<this.backgroundCanvas.height/blockSize;y++) {
                this.backgroundCtx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
                this.backgroundCtx.globalAlpha = Math.random() * 0.2;
                if (Math.random() > 0.2) {
                    this.backgroundCtx.fillRect(y * blockSize,x * blockSize,blockSize,blockSize);    
                }
                
                this.backgroundCtx.save();
                if (Math.random() > 0.7) {
                    this.backgroundCtx.translate(y * blockSize,x * blockSize);
                    this.backgroundCtx.rotate(Math.PI * Math.random());
                    this.backgroundCtx.fillRect(0,0,blockSize,blockSize);
                }
                this.backgroundCtx.restore(); 
            }
        }
        /*
        var image = this.backgroundCtx.getImageData(0,0,this.backgroundCanvas.width,this.backgroundCanvas.height);
        for (var i=0;i<image.data.length;i+=4) {

        }
        this.backgroundCtx.putImageData(image, 0, 0);
        */
    }
    render(ctx) {
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
        ctx.fillStyle = "#000";
        ctx.fillRect(0,0,this.width,this.height);
        ctx.drawImage(this.backgroundCanvas, (this.width*-2) + this.offset.x/-2, (this.height * -2) + this.offset.y/-4);
    }
} 

module.exports = Screen;