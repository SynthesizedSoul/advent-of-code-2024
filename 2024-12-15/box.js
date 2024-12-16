import Pushable from './pushable.js';

export default class Box extends Pushable {
  gpsCoordinate() {
    return 100 * this.y + this.x;
  }
}