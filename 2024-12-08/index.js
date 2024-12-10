const fs = require('fs');

function unique(str) {
  return [...new Set(str)];
}

function withinBounds(loc, rows, columns) {
  if (loc[0] < 0 || loc[1] < 0) return false;
  if (loc[0] >= rows || loc[1] >= columns) return false;

  return true;
}

const input = fs.readFileSync('input', { encoding: 'utf8' });
const chars = input.split('');
const lines = input.split('\n');
const rows = lines.length;
const columns = lines[0].split('').length;
const uniqueAntennas = unique(input).filter((v) => v !== '.' && v !== '\n');

const antinodes = uniqueAntennas.reduce((a, uniqueAntenna) => {
  const antennaAndAntinodeLocations = chars.reduce((locs, value, index) => {
    if (value === uniqueAntenna) {
      const antennaLoc = [Math.floor(index / (columns + 1)), index % (columns + 1)];

      locs.antennas.push(antennaLoc);

      if (locs.antennas.length > 1) {
        for (let j = 0; j < locs.antennas.length - 1; j++) {
          const compareAntennaLoc = locs.antennas[j];
          const distance = [(compareAntennaLoc[0] - antennaLoc[0]) * 2, (compareAntennaLoc[1] - antennaLoc[1]) * 2];

          const antinode1 = [antennaLoc[0] + distance[0], antennaLoc[1] + distance[1]];
          const antinode2 = [compareAntennaLoc[0] - distance[0], compareAntennaLoc[1] - distance[1]];

          if (withinBounds(antinode1, rows, columns)) {
            locs.antinodes.push(antinode1);
          }
          
          if (withinBounds(antinode2, rows, columns)) {
            locs.antinodes.push(antinode2);
          }
        }
      }
    }

    return locs;
  }, { antennas: [], antinodes: [] });

  for (let i = 0; i < antennaAndAntinodeLocations.antinodes.length; i++) {
    const antinode = antennaAndAntinodeLocations.antinodes[i];

    if (a.findIndex((compareAntinode) => compareAntinode[0] === antinode[0] && compareAntinode[1] === antinode[1]) === -1) {
      a.push(antinode);
    };
  }

  return a;
}, []);

console.log(antinodes.length);