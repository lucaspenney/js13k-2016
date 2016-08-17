var Player = require('./player');
var Block = require('./block');
var Save = require('./save');

class Level {
  constructor(params) {
    this.name = params.name;
    this.data = params.data;
  }
  load(game) {
    for (var y = 0;y < this.data.length; y++) {
      for (var x = 0; x < this.data[y].length; x++) {
        if (this.data[y][x] == 'player') {
          new Player(game, x * 64, y * 64);
        } else if (this.data[y][x] == 'block') {
          new Block(game, x * 64, y * 64);
        }
      }
    }
  }
  render(ctx, screen) {

  }
};



module.exports = Level;