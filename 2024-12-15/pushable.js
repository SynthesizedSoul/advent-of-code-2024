import Moveable from './moveable.js';

export default class Pushable extends Moveable {
  push(warehouse, direction) {
    this.move(warehouse, direction);
  }
}