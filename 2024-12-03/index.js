const fs = require('fs');

const regex = /(?:mul\(([0-9]+),([0-9]+)\)|do\(\)|don't\(\))/g;
const input = fs.readFileSync('input', { encoding: 'utf8' });
const found = [...input.matchAll(regex)];

let mulEnabled = true;
const sum = found.reduce((sum, instruction) => {
  switch (instruction[0]) {
    case 'do()':
      mulEnabled = true;
      return sum;
    case 'don\'t()':
      mulEnabled = false;
      return sum;
    default:
      return mulEnabled ? sum += parseInt(instruction[1], 10) * parseInt(instruction[2], 10) : sum;
  }
}, 0);

console.log(sum);