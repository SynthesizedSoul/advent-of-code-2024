const fs = require('fs');

const stones = fs.readFileSync('input', { encoding: 'utf8' }).split(' ');

const rules = [
  {
    test: stone => stone === '0',
    transform: (stones, _, index) => stones[index] = '1'
  },
  {
    test: stone => stone.length % 2 === 0,
    transform: (stones, stone, index) => stones.splice(index, 1, (+stone.substring(0, stone.length / 2)).toString(), (+stone.substring(stone.length / 2)).toString()),
  },
  {
    test: () => true,
    transform: (stones, stone, index) => stones[index] = (+stone * 2024).toString(),
  },
];

let iterations = 25;

for (let i = 0; i < iterations; i++) {
  for (let j = stones.length - 1; j >= 0; j--) {
    const stone = stones[j];

    for (let k = 0; k < rules.length; k++) {
      const rule = rules[k];

      if (rule.test(stone)) {
        rule.transform(stones, stone, j);
        break;
      }
    }
  }
}

console.log(stones.length);
