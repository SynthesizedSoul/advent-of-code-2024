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

let steps = 0;
let total = 0;
while (true) {
  robots.forEach((r) => r.move(map, 1));

  const safetyValue = map.quadrantSafetyValue(robots);

  total += safetyValue;

  const average = steps === 0 ? total : total / steps;

  if (safetyValue / average > 1.2 || safetyValue / average < 0.8) {
    map.render(robots);
    console.log(steps);
    console.log();
  }

  steps++;
}
