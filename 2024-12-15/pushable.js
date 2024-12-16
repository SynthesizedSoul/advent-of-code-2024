import Moveable from './moveable.js';

export default class Pushable extends Moveable {
  push(warehouse, direction, moved = []) {
    return this.move(warehouse, direction, moved);
  }
}