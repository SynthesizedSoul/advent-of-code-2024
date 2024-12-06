const fs = require('fs');

const input = fs.readFileSync('input', { encoding: 'utf8' });

const start = performance.now();
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
const startingMap = lines.map((line, index) => {
  const lineArr = line.split('');
  const index2 = lineArr.findIndex((v) => Object.hasOwn(directions, v));

  if (index2 !== -1) {
    startingLoc[0] = index;
    startingLoc[1] = index2;
  }

  return lineArr;
});

function withinBounds(map, loc) {
  if (loc[0] < 0 || loc[0] >= map.length) return false;
  if (loc[1] < 0 || loc[1] >= map[0].length) return false;

  return true;
}

function getMapVal(map, loc) {
  return map[loc[0]][loc[1]];
}

function setMapVal(map, loc, val) {
  map[loc[0]][loc[1]] = val;
}

function visitedLocations(map, loc) {
  const visitedLocs = [];
  let currentLoc = loc;
  
  while (true) {
    const mapVal = getMapVal(map, currentLoc);
    const movementDirection = directions[mapVal];
    const movementDirectionVal = movementDirection.val;
    const nextLoc = [currentLoc[0] + movementDirectionVal[0], currentLoc[1] + movementDirectionVal[1]];
    
    // Log that we visited this node
    if (!visitedLocs.find(l => l[0] === currentLoc[0] && l[1] === currentLoc[1])) visitedLocs.push(currentLoc);
  
    // Time to exit!
    if (!withinBounds(map, nextLoc)) break;
  
    // Hit a barrier
    if (getMapVal(map, nextLoc) === '#') {
      setMapVal(map, currentLoc, movementDirection.next);
    } else {
      setMapVal(map, currentLoc, '.');
  
      currentLoc = nextLoc;
  
      setMapVal(map, currentLoc, mapVal);
    }
  }

  return visitedLocs;
}

function hasInfiniteLoop(map, loc) {
  const visitedLocs = {};
  let currentLoc = loc;

  while (true) {
    const mapVal = getMapVal(map, currentLoc);
    const movementDirection = directions[mapVal];
    const movementDirectionVal = movementDirection.val;
    const nextLoc = [currentLoc[0] + movementDirectionVal[0], currentLoc[1] + movementDirectionVal[1]];
    
    // Log that we visited this node and what direction
    if (!Object.hasOwn(visitedLocs, currentLoc.join(':'))) {
      visitedLocs[currentLoc.join(':')] = [];
    }
  
    if (visitedLocs[currentLoc.join(':')].indexOf(mapVal) === -1) {
      visitedLocs[currentLoc.join(':')].push(mapVal);
    } else {
      // We've found a loop
     return true;
    }
  
    // Time to exit!
    if (!withinBounds(map, nextLoc)) return false;
  
    // Hit a barrier
    if (getMapVal(map, nextLoc) === '#') {
      setMapVal(map, currentLoc, movementDirection.next);
    } else {
      setMapVal(map, currentLoc, '.');
  
      currentLoc = nextLoc;
  
      setMapVal(map, currentLoc, mapVal);
    }
  }
}

const vLocations = visitedLocations(JSON.parse(JSON.stringify(startingMap)), startingLoc);
let infiniteLoops = 0;

// Skip over the first location because we can't place anything at the guards initial location
for (let i = 1; i < vLocations.length; i++) {
  const obsLocation = vLocations[i];
  const newMap = JSON.parse(JSON.stringify(startingMap));

  setMapVal(newMap, obsLocation, '#');

  if (hasInfiniteLoop(newMap, startingLoc)) infiniteLoops++;
}

const end = performance.now();

console.log(infiniteLoops);
console.log(`Execution time: ${end - start} ms`);