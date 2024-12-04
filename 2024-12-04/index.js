const fs = require('fs');

const searchWord = 'MAS';
const searchWordReversed = searchWord.split('').reverse().join('');

const input = fs.readFileSync('input', { encoding: 'utf8' });
const lines = input.split('\n');

function checkDirection(i, j, direction) {
  let word = '';
  let reversed = false;

  for (let k = 0; k < searchWord.length; k++) {
    word += lines[i + (direction[0] * k)][j + (direction[1] * k)];

    if (k === 0 && searchWordReversed[k] === word[k]) {
      reversed = true;
    } else if (reversed ? searchWordReversed[k] !== word[k] : searchWord[k] !== word[k]) {
      return false;
    }
  }

  return true;
} 

let occurences = 0;

for (let i = 0; i <= lines.length - searchWord.length; i++) {
  for (let j = 0; j <= lines[i].length - searchWord.length; j++) {
    if (!checkDirection(i, j, [1, 1]) || !checkDirection(i, j + searchWord.length - 1, [1, -1])) continue;

    occurences++;
  }
}

console.log(occurences);
