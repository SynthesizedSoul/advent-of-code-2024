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
    const colorize = (color, output) => ['\x1b[', color, 'm', output, '\x1b[0m'].join('');

    for (let i = 0; i < this.map.length; i++) {
      let lastObj = null;

      for (let j = 0; j < this.map[i].length; j++) {
        const obj = this.map[i][j];

        if (obj === null) {
          process.stdout.write(colorize(30, '.'));
        } else if (obj instanceof Wall) {
          process.stdout.write(colorize(33, '#'));
        } else if (obj instanceof Box) {
          if (lastObj !== obj) {
            process.stdout.write(colorize(91, '['));
          } else {
            process.stdout.write(colorize(91, ']'));
          }
        } else if (obj instanceof Robot) {
          process.stdout.write(colorize(35, '@'));
        }

        lastObj = obj;
      }

      process.stdout.write('\n');
    }
  }

  #updateMap(objects) {
    for (let i = 0; i < objects.length; i++) {
      const obj = objects[i];

      for (let j = 0; j < obj.width; j++) {
        if (this.map[obj.prevY][obj.prevX + j] === obj) {
          this.map[obj.prevY][obj.prevX + j] = null;
        }
      }
      
      for (let j = 0; j < obj.width; j++) {
        this.map[obj.y][obj.x + j] = obj;
      }
    }
  }
}