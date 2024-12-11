const { parentPort, workerData } = require('worker_threads');

const { stones, iterations } = workerData;

let stonesMap = stones.reduce((map, stone) => {
  map[stone] = 1;

  return map;
}, {});

for (let i = 0; i < iterations; i++) {
  const tmpStonesMap = {};

  Object.keys(stonesMap).forEach(stone => {
    const stoneVal = (stonesMap[stone] || 0);

    if (stone === '0') {
      tmpStonesMap[1] = (tmpStonesMap[1] || 0) + stoneVal;
    } else if (stone.length % 2 === 0) {
      const left = stone.substring(0, stone.length / 2);
      const right = (+stone.substring(stone.length / 2));

      tmpStonesMap[left] = (tmpStonesMap[left] || 0) + stoneVal;
      tmpStonesMap[right] = (tmpStonesMap[right] || 0) + stoneVal
    } else {
      const key = (stone * 2024);
      tmpStonesMap[key] = (tmpStonesMap[key] || 0) + stoneVal;
    }
  });

  stonesMap = tmpStonesMap;
}

parentPort.postMessage(stonesMap);