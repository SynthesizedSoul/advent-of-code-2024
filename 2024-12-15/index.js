import fs from 'fs';
import Box from './box.js';
import Robot from './robot.js';
import Wall from './wall.js';
import Warehouse from './warehouse.js';

const [mapDescription, movesDescription] = fs.readFileSync('input', { encoding: 'utf8' }).split(/^\n/m);
const moves = movesDescription.replaceAll('\n', '').split('');

const mapDescriptionLines = mapDescription.trim().split('\n');
const walls = [];
const boxes = [];
let robot = [];
let width = null;
let height = mapDescriptionLines.length;

for (let i = 0; i < mapDescriptionLines.length; i++) {
  const line = mapDescriptionLines[i].split('');

  width = line.length;

  for (let j = 0; j < line.length; j++) {
    const c = line[j];

    switch (c) {
      case '#':
        walls.push(new Wall(j, i));
        break;
      case 'O':
        boxes.push(new Box(j, i));
        break;
      case '@':
        robot = new Robot(j, i, moves);
        break;
      default:
        break;
    }
  }
}

const warehouse = new Warehouse(width, height, walls, boxes, robot);

warehouse.render();

const moveLength = moves.length;
for (let i = 0; i < moveLength; i++) {
  warehouse.tick();
}

console.log();
warehouse.render();
console.log();
console.log(boxes.reduce((s, b) => s += b.gpsCoordinate(), 0));