const fs = require('fs');

const regex = /mul\(([0-9]+),([0-9]+)\)/g;
const input = fs.readFileSync('input', { encoding: 'utf8' });
const found = [...input.matchAll(regex)];
const sum = found.reduce((sum, mul) => {
  return sum += parseInt(mul[1], 10) * parseInt(mul[2], 10);
}, 0);

console.log(sum);