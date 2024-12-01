const fs = require('fs');

// Assuming an ordered list
// How many times does num1 appear in the list?
function occurences(num1, list) {
  let occurences = 0;

  for (let i = 0; i < list.length; i++) {
    const num2 = list[i];

    // No more occurences assuming a sorted list
    // Might as well fast exit
    if (num2 > num1) return occurences;

    if (num1 === num2) {
      occurences++;
    }
  }

  return occurences;
}

// Finds the distance between two numbers
// Subtracts one number from another and takes the absolute value
// Providing the distance (numbers between) the given inputs
function distance(num1, num2) {
  return Math.abs(num1 - num2);
}

// Takes the input and processes it into two lists
// Returns as a multidimensional array with the first index the first
// list and the second index as the second list
function processAndSortInputToLists(input) {
  const lines = input.split('\n');
  const lists = lines.reduce((list, line, index) => {
    const nums = line.split('   ');

    list[0][index] = nums[0];
    list[1][index] = nums[1];

    return list;
  }, [[], []]);

  lists[0].sort((a, b) => a - b);
  lists[1].sort((a, b) => a - b);

  return lists;
}

// Takes both lists and sums the distances together
function sumDistances(lists) {
  // We use the reduce function in a bit of an odd way
  // Because we can omit using the iteration value
  // This assumes the lists are always the same length and
  // would produce an error otherwise
  return lists[0].reduce((sum, _, index) => {
    sum += distance(lists[0][index], lists[1][index]);

    return sum;
  }, 0);
}

// Calculates the similarity as describe in the challenge
// This requires multiplying the number in the left list
// by the occurences in the right list, and summing the result
// across all values in the left list
function calculateSimilarity(lists) {
  return lists[0].reduce((sum, num1) => {
    sum += num1 * occurences(num1, lists[1]);

    return sum;
  }, 0);
}

const input = fs.readFileSync('input', { encoding: 'utf8' });
const lists = processAndSortInputToLists(input);
const summedDistances = sumDistances(lists);
const similarity = calculateSimilarity(lists);

console.log(summedDistances);
console.log(similarity);
