const fs = require('fs');

const searchWord = 'MAS';
const searchWordReversed = searchWord.split('').reverse().join('');

const input = fs.readFileSync('input', { encoding: 'utf8' });
const lines = input.split('\n');
const puzzle = lines.reduce((m, line, i) => {
  m[i] = Array(line.length);

  for (let j = 0; j < line.length; j++) {
    m[i][j] = line[j];
  }

  return m;
}, Array(lines.length));

function checkDirection( i, j, direction) {
  const word = Array(searchWord.length).fill(0).reduce((word, _, index) => {
    return word += puzzle[i + (direction[0] * index)][j + (direction[1] * index)];
  }, '');

  return word === searchWord || word === searchWordReversed;
} 

let occurences = 0;

for (let i = 0; i < puzzle.length; i++) {
  for (let j = 0; j < puzzle[i].length; j++) {
    if (j <= puzzle[i].length - searchWord.length) {
      if (i <= puzzle.length - searchWord.length) {
        if (checkDirection(i, j, [1, 1]) && checkDirection(i, j + searchWord.length - 1, [1, -1])) occurences++;
      }
    }
  }
}

console.log(occurences);
