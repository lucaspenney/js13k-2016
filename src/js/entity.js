//Entity
var Vector = require('./vector');
var Angle = require('./angle');

class Entity {
  constructor(game, x, y) {
    this.game = game;
    this.pos = new Vector(x, y);
    this.rotation = new Angle();
    this.sprite = null;
    this.layer = 0;
    this.game.entities.push(this);
  }
  render(ctx, screen) {
    if (this.sprite !== undefined) {
      if (this.sprite.loaded) {
        this.sprite.draw(ctx, screen, this.pos.x, this.pos.y);
      }
    }
  }
  update() {

  }
  destroy() {
    for (var i = this.game.entities.length - 1; i >= 0; i--) {
      if (this.game.entities[i] === this) this.game.entities.splice(i, 1);
    }
  }
}

module.exports = Entity;