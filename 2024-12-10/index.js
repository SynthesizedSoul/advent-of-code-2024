const fs = require('fs');

const topographicalMap = fs.readFileSync('input', { encoding: 'utf8' });
const columns = topographicalMap.indexOf('\n') + 1;
const rows = topographicalMap.length / columns;

function withinBounds(position, rows, columns) {
  if (position[0] < 0 || position[0] >= rows) return false;
  // The last column is always a \n so we should not consider it within bounds
  if (position[1] < 0 || position[1] >= (columns - 1)) return false;

  return true;
}

function convertToPosition(index) {
  return [Math.floor(index / columns), index % columns];
}

function convertToIndex(position) {
  return (position[0] * columns) + position[1];
}

function followPath(index, accessibleTrailEnds = []) {
  const height = +topographicalMap[index];
  const position = convertToPosition(index);
  const left = [position[0], position[1] - 1];
  const up = [position[0] - 1, position[1]];
  const right = [position[0], position[1] + 1];
  const down = [position[0] + 1, position[1]];
  const nextPositions = [left, up, right, down];

  for (let i = 0; i < nextPositions.length; i++) {
    const nextPosition = nextPositions[i];

    if (!withinBounds(nextPosition, rows, columns)) continue;

    const nextIndex = convertToIndex(nextPosition);
    const nextHeight = +topographicalMap[nextIndex];

    if (nextHeight - height !== 1) continue;
    if (nextHeight === 9) {
      accessibleTrailEnds.push(nextIndex);
      continue;
    }

    followPath(nextIndex, accessibleTrailEnds);
  }

  return accessibleTrailEnds;
}

let totalScore = 0;

for (let i = 0; i < topographicalMap.length; i++) {
  const c = topographicalMap[i];

  if (c === '\n') continue;

  const height = +c;

  if (height === 0) {
    const accessibleTrailEnds = followPath(i);
    totalScore += accessibleTrailEnds.length;
  }
}

console.log(totalScore);