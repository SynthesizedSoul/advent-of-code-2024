const fs = require('fs');

const input = fs.readFileSync('input', { encoding: 'utf8' });

const start = performance.now();
const inputLength = input.length;
const searchWord = 'MAS';
const searchWordReversed = searchWord.split('').reverse().join('');
const searchWordLength = searchWord.length;
const lineLength = input.indexOf('\n') + 1;

function checkDirection(i, j, direction) {
  let word = '';
  let reversed = false;

  for (let k = 0; k < searchWordLength; k++) {
    word += input[((i + (direction[0] * k)) * lineLength) + (j + (direction[1] * k))];

    if (k === 0 && searchWordReversed[k] === word[k]) {
      reversed = true;
    } else if (reversed ? searchWordReversed[k] !== word[k] : searchWord[k] !== word[k]) {
      return false;
    }
  }

  return true;
} 

let occurences = 0;

let i = 0;
let j = 0;

while (true) {
  const index = (i * lineLength) + j;

  // Exit out of the loop
  if (index > inputLength - 1) break;

  // We've found a newline, lets go to the next
  if (j !== 0 && index % lineLength === 0) {
    i++;
    j = 0;
    continue;
  }

  if (checkDirection(i, j, [1, 1]) && checkDirection(i, j + searchWordLength - 1, [1, -1])) occurences++;

  j++;
}

const end = performance.now();

console.log(occurences);
console.log(`Execution time: ${end - start} ms`);