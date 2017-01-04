var Player = require('./player');
var Block = require('./block');
var Save = require('./save');
var Spike = require('./spike');
var Blower = require('./blower');

class Level {
  constructor(params) {
    this.name = params.name;
    this.data = params.data;
    this.height = this.data.length;
    this.width = this.data[0].length;
  }
  load(game) {
    game.level = this;
    for (var y = 0;y < this.data.length; y++) {
      for (var x = 0; x < this.data[y].length; x++) {
        if (this.data[y][x] == 'player') {
          new Player(game, x * 32, y * 32);
        } else if (this.data[y][x] == 'block') {
          new Block(game, x * 32, y * 32);
        } else if (this.data[y][x] == 'save') {
          new Save(game, x * 32, y * 32);
        } else if (this.data[y][x] == 'spike') {
          new Spike(game, x * 32, y * 32);
        } else if (this.data[y][x] == 'blower') {
          new Blower(game, x * 32, y * 32);
        }
      }
    }
  }
  render(ctx, screen) {

  }
};



module.exports = Level;