import Positionable from './positionable.js';

export default class Moveable extends Positionable {
  static DIRECTIONS = {
    '^': [0, -1],
    '>': [1, 0],
    'v': [0, 1],
    '<': [-1, 0],
  };

  constructor(x, y, width = 1) {
    super(x, y, width);

    this.locationsVisited = [[x, y]];
    this.prevX = this.x;
    this.prevY = this.y;
  }

  reverse() {
    const lastLoc = this.locationsVisited.pop();
    const newLastLoc = this.locationsVisited[this.locationsVisited.length - 1];

    this.x = lastLoc[0];
    this.y = lastLoc[1];
    this.prevX = newLastLoc ? newLastLoc[0] : lastLoc[0];
    this.prevX = newLastLoc ? newLastLoc[1] : lastLoc[1];
  }

  move(warehouse, direction, moved = [], tickCount = null) {
    const movement = Moveable.DIRECTIONS[direction];
    const newX = this.x + movement[0];
    const newY = this.y + movement[1];
    const collisionObjs = [];

    for (let i = newX; i < newX + this.width; i++) {
      const collisionObj = warehouse.objectAt(i, newY);

      if (collisionObj !== null && collisionObj !== this && collisionObjs.indexOf(collisionObj) === -1 && moved.indexOf(collisionObj) === -1) {
        collisionObjs.push(collisionObj);
      }
    }

    const m = collisionObjs.filter((collisionObj) => {
      return typeof collisionObj.push === 'function' && collisionObj.push(warehouse, direction, moved, tickCount);
    });

    if (m.length !== collisionObjs.length) {
      return false;
    }

    this.locationsVisited.push([this.x, this.y]);
    this.prevX = this.x;
    this.prevY = this.y;
    this.x = newX;
    this.y = newY;

    moved.push(this);

    return true;
  }
}