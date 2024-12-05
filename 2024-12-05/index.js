const fs = require('fs');

const input = fs.readFileSync('input', { encoding: 'utf8' });

const start = performance.now();
const lines = input.split('\n');
const rules = {};
const updates = [];

let delimiterReached = false;

for (let i = 0; i < lines.length; i++) {
  if (lines[i] === '') {
    delimiterReached = true;
    continue;
  }

  if (!delimiterReached) {
    const rule = lines[i].split('|').map((v) => parseInt(v, 10));

    if (!Object.hasOwn(rules, rule[0])) rules[rule[0]] = [];

    rules[rule[0]].push(rule[1]);
  } else {
    updates.push(lines[i].split(',').map((v) => parseInt(v, 10)));
  }
}

const sum = updates.reduce((s, update) => {
  const valid = update.every((x, index) => {
    for (let i = index; i < update.length; i++) {
      const y = update[i];

      if (rules[y] && rules[y].some((v) => v === x)) return false;
    }

    return true;
  });

  if (!valid) {
    update.sort((a, b) => {
      if (rules[a] && rules[a].some((v) => v === b)) {
        return -1;
      } else if (rules[b] && rules[b].some((v) => v === a)) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  return !valid ? s += update[(update.length - 1) / 2] : s;
}, 0);

const end = performance.now();

console.log(sum);
console.log(`Execution time: ${end - start} ms`);