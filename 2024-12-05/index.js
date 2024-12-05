const fs = require('fs');

const input = fs.readFileSync('input', { encoding: 'utf8' });
const lines = input.split('\n');
const rules = [];
const updates = [];

let delimiterReached = false;

for (let i = 0; i < lines.length; i++) {
  if (lines[i] === '') {
    delimiterReached = true;
    continue;
  }

  if (!delimiterReached) {
    rules.push(lines[i].split('|').map((v) => parseInt(v, 10)));
  } else {
    updates.push(lines[i].split(',').map((v) => parseInt(v, 10)));
  }
}

const sum = updates.reduce((s, update) => {
  const valid = update.every((x, index) => {
    for (let i = index; i < update.length; i++) {
      const y = update[i];

      for (let j = 0; j < rules.length; j++) {
        const rule = rules[j];

        if (x === rule[1] && y === rule[0]) return false;
        if (y === rule[0] && x === rule[1]) return false;
      }
    }

    return true;
  });

  return valid ? s += update[(update.length - 1) / 2] : s;
}, 0);

console.log(sum);