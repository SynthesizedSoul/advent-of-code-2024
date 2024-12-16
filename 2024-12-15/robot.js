import Moveable from './moveable.js';

export default class Robot extends Moveable {
  constructor(x, y, moves) {
    super(x, y);

    this.moves = moves;
  }

  tick(warehouse, count = null) {
    const direction = this.moves.splice(0, 1);

    const moved = [];
    const succeeded = this.move(warehouse, direction, moved, count);

    if (!succeeded) [...new Set(moved)].forEach((m) => m.reverse());
  }
}