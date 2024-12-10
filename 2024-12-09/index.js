const fs = require('fs');

const diskMap = fs.readFileSync('input', { encoding: 'utf8' }).split('');

const diskVisualization = diskMap.reduce((s, c, index) => {
  for (let i = 0; i < +c; i++) {
    s.push(index % 2 === 0 ? (index / 2).toString() : '.');
  }

  return s;
}, []);

for (let i = diskVisualization.length - 1; i >= 0; i--) {
  const c = diskVisualization[i];

  if (c === '.') continue;

  const endBlock = i;
  let startBlock = endBlock;
  let tmpBlockIndex = endBlock;

  while (diskVisualization[tmpBlockIndex] === c && tmpBlockIndex >= 0) {
    startBlock = tmpBlockIndex;
    tmpBlockIndex--;
  }

  let startFrom = 0;

  while (true) {
    let startFreeSpace = diskVisualization.indexOf('.', startFrom);

    if (startFreeSpace === -1 || startFreeSpace > i) break;

    let endFreeSpace = startFreeSpace;
    let tmpFreeSpaceIndex = startFreeSpace;
  
    while (diskVisualization[tmpFreeSpaceIndex] === '.' && tmpFreeSpaceIndex < i) {
      endFreeSpace = tmpFreeSpaceIndex;
      tmpFreeSpaceIndex++;
    }
  
    const blockSize = (endBlock - startBlock) + 1;
    const freeSpace = (endFreeSpace - startFreeSpace) + 1;

    if (freeSpace < blockSize) {
      startFrom = endFreeSpace + 1;
      continue;
    }
  
    diskVisualization.splice(startFreeSpace, blockSize, ...diskVisualization.splice(startBlock, blockSize, ...Array(blockSize).fill('.')));

    break;
  }

  i = startBlock; // We need to move the index this many
}

const diskChecksum = diskVisualization.reduce((checksum, c, index) => {
  if (c === '.') return checksum;

  return checksum + c * index;
}, 0);

console.log(diskChecksum);