import Positionable from './positionable.js';

export default class Moveable extends Positionable {
  static DIRECTIONS = {
    '^': [0, -1],
    '>': [1, 0],
    'v': [0, 1],
    '<': [-1, 0],
  };

  move(warehouse, direction) {
    const movement = Moveable.DIRECTIONS[direction];
    const newX = this.x + movement[0];
    const newY = this.y + movement[1];
    const collisionObj = warehouse.objectAt(newX, newY);

    if (collisionObj !== null) {
      if (typeof collisionObj.push === 'function') {
        const result = collisionObj.push(warehouse, direction);

        if (!result) return false;
      } else {
        return false;
      }
    }

    this.prevX = this.x;
    this.prevY = this.y;
    this.x += movement[0];
    this.y += movement[1];

    return true;
  }
}