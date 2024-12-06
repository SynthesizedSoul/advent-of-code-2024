const fs = require('fs');

const input = fs.readFileSync('input', { encoding: 'utf8' });
const directions = {
  '^': {
    val: [-1, 0],
    next: '>',
  },
  '>': {
    val: [0, 1],
    next: 'v',
  },
  'v': {
    val: [1, 0],
    next: '<',
  },
  '<': {
    val: [0, -1],
    next: '^',
  },
};
const lines = input.split('\n');
const startingLoc = [0, 0];
const map = lines.map((line, index) => {
  const lineArr = line.split('');
  const index2 = lineArr.findIndex((v) => Object.hasOwn(directions, v));

  if (index2 !== -1) {
    startingLoc[0] = index;
    startingLoc[1] = index2;
  }

  return lineArr;
});

function withinBounds(loc) {
  if (loc[0] < 0 || loc[0] >= map.length) return false;
  if (loc[1] < 0 || loc[1] >= map[0].length) return false;

  return true;
}

function getMapVal(loc) {
  return map[loc[0]][loc[1]];
}

function setMapVal(loc, val) {
  map[loc[0]][loc[1]] = val;
}

const visitedLocs = {};
let loc = startingLoc;

while (true) {
  const mapVal = getMapVal(loc);
  const movementDirection = directions[mapVal];
  const movementDirectionVal = movementDirection.val;
  const nextLoc = [loc[0] + movementDirectionVal[0], loc[1] + movementDirectionVal[1]];
  
  // Log that we visited this node and what direction
  if (!Object.hasOwn(visitedLocs, loc.join(':'))) {
    visitedLocs[loc.join(':')] = [];
  }

  if (visitedLocs[loc.join(':')].indexOf(mapVal) === -1) visitedLocs[loc.join(':')].push(mapVal);

  // Time to exit!
  if (!withinBounds(nextLoc)) break;

  // Hit a barrier
  if (getMapVal(nextLoc) === '#') {
    setMapVal(loc, movementDirection.next);
  } else {
    setMapVal(loc, '.');

    loc = nextLoc;

    setMapVal(loc, mapVal);
  }
}

console.log(visitedLocs);