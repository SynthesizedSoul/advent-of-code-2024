export default class Robot {
  constructor(initialX, initialY, vX, vY) {
    this.x = initialX;
    this.y = initialY;
    this.vX = vX;
    this.vY = vY;
  }

  move(map, iterations = 1) {
    this.x = (((this.x + (this.vX * iterations)) % map.width) + map.width) % map.width;
    this.y = (((this.y + (this.vY * iterations)) % map.height) + map.height) % map.height;
  }
}