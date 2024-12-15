import fs from 'fs';
import Box from './box.js';
import Robot from './robot.js';
import Wall from './wall.js';
import Warehouse from './warehouse.js';

const [mapDescription, movesDescription] = fs.readFileSync('input', { encoding: 'utf8' }).split(/^\n/m);
const moves = movesDescription.split('');

console.log(mapDescription);
console.log(moves);