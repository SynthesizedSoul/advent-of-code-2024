import fs from 'fs';
import * as readline from 'readline/promises';
import Box from './box.js';
import Robot from './robot.js';
import Wall from './wall.js';
import Warehouse from './warehouse.js';

const awaitInput = false;
const validate = false;
const beginFrom = 0;
const rl = readline.createInterface(process.stdin, process.stdout);
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

  width = line.length * 2;

  for (let j = 0; j < line.length; j++) {
    const c = line[j];

    switch (c) {
      case '#':
        walls.push(new Wall(j * 2, i, 2));
        break;
      case 'O':
        boxes.push(new Box(j * 2, i, 2));
        break;
      case '@':
        robot = new Robot(j * 2, i, moves);
        break;
      default:
        break;
    }
  }
}

const warehouse = new Warehouse(width, height, walls, boxes, robot);
const moveLength = moves.length;

console.log(`Moves: ${moveLength}`);

for (let i = 0; i < moveLength; i++) {
  const shouldAwait = awaitInput && i >= beginFrom;
  const shouldValidate = validate && i >= beginFrom;
  const valid = shouldValidate && warehouse.valid();

  if (shouldAwait || (shouldValidate && !valid)) {
    warehouse.render(90, 36);
  }

  if (shouldValidate && !valid) {
    console.log(`Invalid configuration. [Move: ${i}]`);

    if (!shouldAwait) break;
  }

  if (shouldAwait) {
    await rl.question(`Is this correct? [Move: ${i}]`);
  }

  warehouse.tick(i);
}

console.log();
warehouse.render();
console.log();
console.log(`Sum of GPS coordinates: ${boxes.reduce((s, b) => s += b.gpsCoordinate(), 0)}`);

rl.close();