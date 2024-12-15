import fs from 'fs';
import * as readline from 'readline/promises';
import Box from './box.js';
import Robot from './robot.js';
import Wall from './wall.js';
import Warehouse from './warehouse.js';

const awaitInput = true;
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

warehouse.render();
if (awaitInput) await rl.question(`Is this correct? [Move: ${0}]`);

for (let i = 0; i < moveLength; i++) {
  warehouse.tick();
  if (awaitInput) warehouse.render();
  if (awaitInput) await rl.question(`Is this correct? [Move: ${i + 1}]`);
}

console.log();
warehouse.render();
console.log();
console.log(`Sum of GPS coordinates: ${boxes.reduce((s, b) => s += b.gpsCoordinate(), 0)}`);

rl.close();