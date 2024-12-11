const { Worker } = require('worker_threads');
const fs = require('fs');

const MAX_WORKERS = 4;
const stones = fs
  .readFileSync('input', { encoding: 'utf8' })
  .split(' ');

const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
};

async function computeStones(stones, iterations = 25) {
  const start = performance.now();
  const workers = [];
  const chunks = chunkIntoN(stones, Math.min(MAX_WORKERS, stones.length));

  for (let i = 0; i < chunks.length; i++) {
    const worker = new Worker('./worker.js', { workerData: { stones: chunks[i], iterations: iterations } });
    const p = new Promise((resolve, reject) => {
      worker.on('message', (stoneResults) => resolve(stoneResults));
      worker.on('error', () => reject());
    });
  
    workers.push(p);
  }

  return Promise
    .all(workers)
    .then(results => {
      const mergedStones = {};

      results.forEach(r => {
        Object.keys(r).forEach(k => {
          mergedStones[k] = (mergedStones[k] || 0) + r[k];
        });
      });

      const end = performance.now();

      console.log(`Execution time: ${end - start} ms`);

      return mergedStones;
    });
}

const start = performance.now();

computeStones(stones, 75)
  .then(results => {
    const end = performance.now();

    console.log(Object.values(results).reduce((s, v) => s += v, 0));
    console.log(`Execution time: ${end - start} ms`);
  });