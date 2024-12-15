import Box from './box.js';
import Robot from './robot.js';
import Wall from './wall.js';

export default class Warehouse {
  constructor(width, height, walls, boxes, robot) {
    this.width = width;
    this.height = height;
    this.map = Array.from({ length: height }, () => Array(width).fill(null));
    this.walls = walls;
    this.boxes = boxes;
    this.robot = robot;

    console.log(this.width, this.height);

    this.#updateMap(walls);
    this.#updateMap(boxes);
    this.#updateMap([robot]);
  }

  objectAt(x, y) {
    return this.map[y][x];
  }

  tick() {
    this.robot.tick(this);
    this.#updateMap(this.boxes);
    this.#updateMap([this.robot]);
  }

  render() {
    for (let i = 0; i < this.map.length; i++) {
      let row = '';

      for (let j = 0; j < this.map[i].length; j++) {
        const obj = this.map[i][j];

        if (obj === null) {
          row += '.';
        } else if (obj instanceof Wall) {
          row += '#';
        } else if (obj instanceof Box) {
          row += 'O';
        } else if (obj instanceof Robot) {
          row += '@';
        }
      }

      console.log(row);
    }
  }

  #updateMap(objects) {
    for (let i = 0; i < objects.length; i++) {
      const obj = objects[i];

      if (this.map[obj.prevY][obj.prevX] === obj) {
        this.map[obj.prevY][obj.prevX] = null;
      }
      
      this.map[obj.y][obj.x] = obj;
    }
  }
}