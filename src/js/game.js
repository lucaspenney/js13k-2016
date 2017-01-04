var Level = require('./level');
var levels = require('./levels');

class Game {
  constructor(screen) {
    this.screen = screen;
    this.entities = [];
    levels[0].load(this);
    this.tick = 0;
  } 
  update(input) {
    this.tick++;
    for (var i = this.entities.length - 1; i >= 0; i--) {
      this.entities[i].update(input);
    }
  }
  render(ctx, screen) {
    this.screen.render(ctx, screen);
    this.entities.sort(function(a, b) {
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