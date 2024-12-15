import Positionable from './positionable.js';

export default class Moveable extends Positionable {
  static DIRECTIONS = {
    '^': [0, -1],
    '>': [1, 0],
    'v': [0, 1],
    '<': [-1, 0],
  };

  reverse() {
    this.x = this.prevX;
    this.y = this.prevY;
  }

  move(warehouse, direction) {
    const movement = Moveable.DIRECTIONS[direction];
    const newX = this.x + movement[0];
    const newY = this.y + movement[1];
    const collisionObjs = Array(this.width)
                          .fill(null)
                          .map((_, index) => warehouse.objectAt(newX + index, newY))
                          .filter((o, index, self) => self.indexOf(o) === index && o !== null && o !== this);

    const moved = collisionObjs.filter((collisionObj) => {
      if (typeof collisionObj.push === 'function') {
        const result = collisionObj.push(warehouse, direction);

        if (!result) return false;
      } else {
        return false;
      }

      return true;
    });

    if (moved.length !== collisionObjs.length) {
      moved.forEach((m) => m.reverse());
      return false;
    }

    this.prevX = this.x;
    this.prevY = this.y;
    this.x += movement[0];
    this.y += movement[1];

    return true;
  }
}