const fs = require('fs');
const gardenPlots = fs
  .readFileSync('input', { encoding: 'utf8' })
  .split('\n')
  .reduce((gPlots, row) => {
    gPlots.push(row.split(''));

    return gPlots;
  }, []);

class Plot {
  constructor(type, x, y) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.edges = [];
  }

  connectsTo(plot) {
    if (Math.abs(this.x - plot.x) + Math.abs(this.y - plot.y) !== 1) return false;

    return true;
  }

  connectTo(plot) {
    if (!this.connectsTo(plot)) return;
    if (this.edges.some((e) => e === plot)) return;

    this.edges.push(plot);
  }

  disconnectFrom(plot) {
    if (!this.connectsTo(plot)) return;
    if (!this.edges.some((e) => e === plot)) return;

    this.edges.splice(this.edges.indexOf(plot), 1);
  }

  perimeter() { return 4 - this.edges.length }
}

class Region {
  constructor(type, plot) {
    this.type = type;
    this.plots = [plot];
  }

  addPlot(plot) {
    if (this.type !== plot.type) return false;
    if (this.plots.some((p) => p.x === plot.x && p.y === plot.y)) return false;

    const connectsToPlots = this.plots.filter((p) => p.connectsTo(plot));

    if (connectsToPlots.length === 0) return false;

    connectsToPlots.forEach((p) => {
      p.connectTo(plot);
      plot.connectTo(p);
    });
    this.plots.push(plot);

    return true;
  }

  mergeRegion(region) {
    if (this.type !== region.type) return;

    const mergePlots = region.plots;
    const mergePointIndex = this.plots.findIndex((p1) => region.plots.some((p2) => p1.x === p2.x && p1.y === p2.y));

    if (mergePointIndex === -1) return;

    const [removedPlot] = this.plots.splice(mergePointIndex, 1);
    const plotToJoinFromIndex = region.plots.findIndex((p) => p.x === removedPlot.x && p.y === removedPlot.y);

    for (let i = 0; i < this.plots.length; i++) {
      this.plots[i].disconnectFrom(removedPlot);
    }

    this.addPlot(region.plots[plotToJoinFromIndex]);
    this.plots.push(...region.plots.toSpliced(plotToJoinFromIndex, 1));
  }

  area() { return this.plots.length; }
  perimeter() { return this.plots.reduce((s, p) => s += p.perimeter(), 0); }
  cost() { return this.area() * this.perimeter(); }
}

const regions = [];

for (let i = 0; i < gardenPlots.length; i++) {
  for (let j = 0; j < gardenPlots[i].length; j++) {
    const plot = new Plot(gardenPlots[i][j], j, i);
    const applicableRegions = [];

    for (let k = 0; k < regions.length; k++) {
      if (regions[k].addPlot(plot)) applicableRegions.push(regions[k]);
    }

    if (!applicableRegions.length) regions.push(new Region(gardenPlots[i][j], plot));
    if (applicableRegions.length > 1) {
      for (let k = 1; k < applicableRegions.length; k++) {
        applicableRegions[0].mergeRegion(applicableRegions[k]);
        regions.splice(regions.indexOf(applicableRegions[k]), 1);
      }
    }
  }
}

console.log(regions.reduce((s, r) => s += r.cost(), 0));