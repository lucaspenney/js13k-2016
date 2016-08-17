//var Class = require('./class');
var Player = require('./player');
var Block = require('./block');
var Save = require('./save');
var Level = require('./level');
var levels = require('./levels');

class Game {
  constructor(screen) {
    this.screen = screen;
    this.entities = [];
    levels[0].load(this);
  } 
  update(input) {
    for (var i = this.entities.length - 1; i >= 0; i--) {
      this.entities[i].update(input);
      this.entities[i].update(input);
    }
  }
  render(ctx, screen) {
    if (!ctx) return;
    this.screen.render(ctx, screen);
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