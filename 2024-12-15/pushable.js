import Moveable from './moveable.js';

export default class Pushable extends Moveable {
  push(warehouse, direction, moved = [], tickCount = null) {
    return this.move(warehouse, direction, moved, tickCount);
  }
}