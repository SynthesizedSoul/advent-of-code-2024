const fs = require('fs');

const diskMap = fs.readFileSync('input', { encoding: 'utf8' });
const diskVisualization = diskMap.split('').reduce((s, c, index) => {
  for (let i = 0; i < +c; i++) {
    s.push(index % 2 === 0 ? (index / 2).toString() : '.');
  }

  return s;
}, []);

for (let i = diskVisualization.length - 1; i >= 0; i--) {
  const c = diskVisualization[i];

  if (c === '.') continue;

  const freeSpace = diskVisualization.indexOf('.');

  if (freeSpace > i) break;

  diskVisualization[freeSpace] = c;
  diskVisualization[i] = '.';
}

const diskChecksum = diskVisualization.reduce((checksum, c, index) => {
  if (c === '.') return checksum;

  return checksum + c * index;
}, 0);

console.log(diskChecksum);