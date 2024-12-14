export default class Map {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }


  render(robots, visualizeQuadrants = false) {
    for (let i = 0; i < this.height; i++) {
      if (visualizeQuadrants && i === (this.height - 1) / 2) {
        console.log(Array.from(this.width).fill(' ').toString());
        continue;
      }

      let row = '';

      for (let j = 0; j < this.width; j++) {
        const robotsAtLoc = robots.filter((r) => r.x === j && r.y === i).length;

        if (visualizeQuadrants && j === (this.width - 1) / 2) {
          row += ' ';
        } else if (robotsAtLoc === 0) {
          row += '.';
        } else {
          row += robotsAtLoc;
        }
      }

      console.log(row);
    }
  }

  quadrantSafetyValue(robots) {
    const quadrantSafetyValues = [0, 0, 0, 0];
    let quadrant = 0;

    for (let i = 0; i < this.height; i++) {
      if (i === (this.height -1) / 2) {
        continue;
      }

      if (i < (this.height - 1) / 2) {
        quadrant = 0;
      } else {
        quadrant = 2;
      }

      for (let j = 0; j < this.width; j++) {
        const robotsAtLoc = robots.filter((r) => r.x === j && r.y === i).length;

        if (j === (this.width - 1) / 2) {
          quadrant = (quadrant + 1) % (i < 2 ? 2 : 4);
        } else {
          quadrantSafetyValues[quadrant] += robotsAtLoc;
        }
      }
    }

    return quadrantSafetyValues.reduce((s, v) => s *= v, 1);
  }
}