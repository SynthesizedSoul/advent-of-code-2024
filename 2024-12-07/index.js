const fs = require('fs');

const input = fs.readFileSync('input', { encoding: 'utf8' });

const start = performance.now();
const lines = input.split('\n');

const operations = {
  '+': (a, b) => a + b,
  '*': (a, b) => a * b,
  '|': (a, b) => parseInt(a.toString() + b.toString(), 10)
};

const generateCombinations = (n) =>
  n <= 0
    ? ['']
    : generateCombinations(n - 1).flatMap(r => Object.keys(operations).map((o) => r + o));

const sum = lines.reduce((s, line) => {
  let [answer, numbersString] = line.split(':');
  let numbers = numbersString.trim().split(' ');

  answer = parseInt(answer, 10);
  numbers = numbers.map((v) => parseInt(v, 10));

  const slots = numbers.length - 1;
  const combinations = generateCombinations(slots);

  const valid = combinations.some((combination) => {
    return answer === numbers.reduce((value, number, index) => {
      if (index === 0) return number;

      return operations[combination[index - 1]](value, number);
    }, 0);
  });

  if (!valid) return s;

  return s += answer;
}, 0);

const end = performance.now();

console.log(sum);
console.log(`Execution time: ${end - start} ms`);
