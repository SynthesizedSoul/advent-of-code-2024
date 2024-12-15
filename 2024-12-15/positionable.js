export default class Positionable {
  constructor(x, y, width = 1) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.prevX = x;
    this.prevY = y;
  }
}