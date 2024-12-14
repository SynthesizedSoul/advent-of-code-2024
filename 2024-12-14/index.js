import fs from 'fs';
import Map from './map.js';
import Robot from './robot.js';

const robotDescriptions = fs.readFileSync('input', { encoding: 'utf8' }).split('\n');
const map = new Map(101, 103);
const robots = [];

for (let i = 0; i < robotDescriptions.length; i++) {
  const robotDescription = robotDescriptions[i];
  const [locationDesc, velocityDesc] = robotDescription.split(' ');
  const locationDescSanitized = locationDesc.split('p=')[1];
  const velocityDescSanitized = velocityDesc.split('v=')[1];
  const [initialX, initialY] = locationDescSanitized.split(',').map((v) => +v);
  const [vX, vY] = velocityDescSanitized.split(',').map((v) => +v);

  robots.push(new Robot(initialX, initialY, vX, vY));
}

robots.forEach((r) => r.move(map, 100));
console.log(map.quadrantSafetyValue(robots));
