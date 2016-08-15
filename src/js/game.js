//var Class = require('./class');
var Player = require('./player');
var Block = require('./block');

class Game {
  constructor() {
    this.entities = [];
    this.entities.push(new Player(this, 0,0));
    this.entities.push(new Block(this, 20,270));
    this.entities.push(new Block(this, 150,350));
    this.entities.push(new Block(this, 350,280));
    this.entities.push(new Block(this, 550,320));
  } 
  update(input) {
    for (var i = this.entities.length - 1; i >= 0; i--) {
      this.entities[i].update(input);
    }
  }
  render(ctx, screen) {
    if (!ctx) return;
    //screen.render(ctx, screen);
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    this.entities.sort(function(a, b) {
      if (a === null) return 1;
      if (b === null) return -1;
      if (a.layer === undefined) a.layer = 0;
      if (b.layer === undefined) b.layer = 0;
      if (a.layer > b.layer)
        return -1;
      if (a.layer < b.layer)
        return 1;
      return 0;
    });
    for (var i = this.entities.length - 1; i >= 0; i--) {
      this.entities[i].render(ctx, screen);
    }
  }
};

module.exports = Game;