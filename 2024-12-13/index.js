const fs = require('fs');

class Button {
  constructor(name, xDistance, yDistance, cost) {
    this.name = name;
    this.xDistance = xDistance;
    this.yDistance = yDistance;
    this.cost = cost;
  }
}

class Prize {
  constructor(x, y) {
    this.x = x + 10000000000000;
    this.y = y + 10000000000000;
  }
}

class Machine {
  constructor(buttonA, buttonB, prize) {
    this.x = 0;
    this.y = 0;
    this.tokens = 0;

    this.buttonA = buttonA
    this.buttonB = buttonB;
    this.prize = prize;
  }

  pressButton(name, times = 1) {
    let button = name === 'A' ? this.buttonA : this.buttonB;

    this.x += button.xDistance * times;
    this.y += button.yDistance * times;
    this.tokens += button.cost * times;
  }

  isAtPrize() {
    return this.x === this.prize.x && this.y === this.prize.y;
  }

  attemptMoveToPrize() {
    const bPresses = Math.round((this.prize.x - this.prize.y * this.buttonA.xDistance / this.buttonA.yDistance) / (this.buttonB.xDistance - this.buttonB.yDistance * this.buttonA.xDistance / this.buttonA.yDistance));
    const aPresses = (this.prize.x - bPresses * this.buttonB.xDistance) / this.buttonA.xDistance;

    if (aPresses % 1 != 0 || bPresses % 1 != 0) return;

    this.pressButton('A', aPresses);
    this.pressButton('B', bPresses);
  }
}

const lines = fs.readFileSync('input', { encoding: 'utf8' }).split('\n');
const machines = [];

for (let i = 0; i < lines.length; i += 4) {
  const buttonAParams = lines[i]
                        .split(':')[1]
                        .trim()
                        .split(',')
                        .reduce((button, val) => {
                          button.push(+val.trim().substring(1));

                          return button;
                        }, []);
  const buttonBParams = lines[i + 1]
                        .split(':')[1]
                        .trim()
                        .split(',')
                        .reduce((button, val) => {
                          button.push(+val.trim().substring(1));

                          return button;
                        }, []);
  const prizeParams = lines[i + 2]
                      .split(':')[1]
                      .trim()
                      .split(',')
                      .reduce((prize, val) => {
                        prize.push(+val.trim().substring(2));

                        return prize;
                      }, []);
  
  const buttonA = new Button('A', buttonAParams[0], buttonAParams[1], 3);
  const buttonB = new Button('B', buttonBParams[0], buttonBParams[1], 1);
  const prize = new Prize(prizeParams[0], prizeParams[1]);

  machines.push(new Machine(buttonA, buttonB, prize));
}

const tokens = machines.reduce((t, machine) => {
  machine.attemptMoveToPrize();

  if (machine.isAtPrize()) t += machine.tokens;

  return t;
}, 0);

console.log(tokens);