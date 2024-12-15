import Positionable from "./positionable.js";

const DIRECTIONS = {
  '^': [0, -1],
  '>': [1, 0],
  'v': [0, 1],
  '<': [-1, 0],
};

export default class Moveable extends Positionable {
  constructor(x, y) {
    this.prevX = x;
    this.prevY = y;
  }

  move(direction) {
    const movement = DIRECTIONS[direction];

    this.prevX = this.x;
    this.prevY = this.y;

    this.x += movement[0];
    this.y += movement[1];
  }
}