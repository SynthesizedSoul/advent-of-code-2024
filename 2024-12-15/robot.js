import Moveable from './moveable.js';

export default class Robot extends Moveable {
  constructor(x, y, moves) {
    super(x, y);

    this.moves = moves;
  }

  tick(warehouse) {
    const direction = this.moves.splice(1, 1);

    this.move(warehouse, direction);
  }
}