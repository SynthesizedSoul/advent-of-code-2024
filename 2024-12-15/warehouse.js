import Box from './box.js';
import Moveable from './moveable.js';
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
    this.allObjs = [...walls, ...boxes, robot];

    this.#updateMap(this.allObjs);
  }

  objectAt(x, y) {
    return this.map[y][x];
  }

  tick(count = null) {
    this.robot.tick(this, count);
    this.#updateMap(this.allObjs);
  }

  valid() {
    for (let i = 0; i < this.allObjs.length; i++) {
      const obj = this.allObjs[i];

      for (let j = i + 1; j < this.allObjs.length; j++) {
        const otherObj = this.allObjs[j];

        for (let k = 0; k < obj.width; k++) {
          for (let l = 0; l < otherObj.width; l++) {
            if ((obj.x + k) === (otherObj.x + l) && obj.y === otherObj.y) {
              console.log('Invalid objects: ');
              console.log(obj, otherObj);
              return false;
            }
          }
        }
      }
    }

    return true;
  }

  render(highlightX = null, highlightY = null) {
    const colorize = (color, output) => ['\x1b[', color, 'm', output, '\x1b[0m'].join('');

    for (let i = 0; i < this.map.length; i++) {
      let lastObj = null;

      for (let j = 0; j < this.map[i].length; j++) {
        const obj = this.map[i][j];
        let highlight = false;

        if (highlightX === j && highlightY === i) {
          highlight = true;
        }

        if (obj === null) {
          process.stdout.write(colorize(highlight ? 32 : 30, '.'));
        } else if (obj instanceof Wall) {
          process.stdout.write(colorize(highlight ? 32 : 33, '#'));
        } else if (obj instanceof Box) {
          if (lastObj !== obj) {
            process.stdout.write(colorize(highlight ? 32 : 91, '['));
          } else {
            process.stdout.write(colorize(highlight ? 32 : 91, ']'));
          }
        } else if (obj instanceof Robot) {
          process.stdout.write(colorize(highlight ? 32 : 35, '@'));
        }

        lastObj = obj;
      }

      process.stdout.write('\n');
    }
  }

  #updateMap(objects) {
    for (let i = 0; i < objects.length; i++) {
      const obj = objects[i];

      if (obj instanceof Moveable) {
        for (let j = obj.prevX; j < obj.prevX + obj.width; j++) {
          if (this.map[obj.prevY][j] === obj) {
            this.map[obj.prevY][j] = null;
          }
        }
      }

      for (let j = obj.x; j < obj.x + obj.width; j++) {
        this.map[obj.y][j] = obj;
      }
    }
  }
}