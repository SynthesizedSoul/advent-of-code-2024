const fs = require('fs');

// 1 is increasing, 0 is stagnant, -1 is decreasing
function determineDirection(value, otherValue) {
  const difference = value - otherValue;

  if (difference > 0) {
    return 1;
  } else if (difference < 0) {
    return -1;
  }

  return 0;
}

// Any two adjacent levels differ by at least one and at most three.
function differsSafely(value, otherValue) {
  const difference = Math.abs(value - otherValue);

  return difference >= 1 && difference <= 3;
}

function areLevelsTrendingSafely(levels, direction) {
  // Only go to the second to last element because we're
  // already looking at the next element
  for (let i = 0; i < levels.length - 1; i++) {
    const value = levels[i];
    const nextValue = levels[i + 1];

    // The levels are either all increasing or all decreasing.
    if (determineDirection(value, nextValue) !== direction) return false;
    // Any two adjacent levels differ by at least one and at most three.
    if (!differsSafely(value, nextValue)) return false;
  }

  return true;
}

// Are the levels in this report safe?
function areLevelsSafe(levels) {
  const d = determineDirection(levels[0], levels[1]);

  // If the levels are stagnent then by definition it's unsafe
  if (d === 0) return false;
  
  return areLevelsTrendingSafely(levels, d);
}

// Convert a report into an array of integers
function processReportToLevels(report) {
  return report.split(' ');
}

// Convert the file into an array of report strings
function processInputToReports(input) {
  return input.split('\n');
}

const input = fs.readFileSync('input', { encoding: 'utf8' });
const reports = processInputToReports(input);
const safeReports = reports.reduce((safeReports, report) => {
  const levels = processReportToLevels(report);

  if (areLevelsSafe(levels)) {
    safeReports++;
  }

  return safeReports;
}, 0);

console.log(safeReports);