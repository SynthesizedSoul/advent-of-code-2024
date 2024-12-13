const fs = require('fs');

class Button {
  constructor(name, xDistance, yDistance, cost) {
    this.name = name;
    this.xDistance = xDistance;
    this.yDistance = yDistance;
    this.cost = cost;
  }

  costPerDistanceUnit() {
    return 1.0 * (this.xDistance + this.yDistance) / this.cost;
  }
}

class Prize {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Machine {
  constructor(buttonA, buttonB, prize, maxTokens = 100) {
    this.x = 0;
    this.y = 0;
    this.pressedButtons = [];
    this.tokens = 0;
    this.maxTokens = 100;

    this.buttonA = buttonA
    this.buttonB = buttonB;
    this.prize = prize;
  }

  reverse(steps = 1) {
    for (let i = 0; i < steps; i++) {
      const [unpressButton] = this.pressedButtons.splice(this.pressedButtons.length - 1, 1);

      this.x -= unpressButton.xDistance;
      this.y -= unpressButton.yDistance;
      this.tokens -= unpressButton.cost;
    }
  }

  pressButton(name) {
    let button = name === 'A' ? this.buttonA : this.buttonB;

    this.x += button.xDistance;
    this.y += button.yDistance;
    this.tokens += button.cost;
    this.pressedButtons.push(button);
  }

  isAtPrize() {
    return this.x === this.prize.x && this.y === this.prize.y;
  }

  isFurtherThanPrize() {
    // This currently requires buttons to never move negative spaces
    return this.x > this.prize.x || this.y > this.prize.y;
  }

  attemptMoveToPrize() {
    // a*x1 + b*x2 = x
    // a*y1 + b*y2 = y
    // a = (y - b*y2)/y1
    // (y - b*y2)*x1/y1 + b*x2 = x
    // y*x1/y1 - b*y2*x1/y1 + b*x2 = x
    // x - y*x1/y1 = b*x2 - b*y2*x1/y1
    // (x - y*x1/y1)/(x2 - y2*x1/y1) = b

    const bPresses = Math.round((this.prize.x - this.prize.y * this.buttonA.xDistance / this.buttonA.yDistance) / (this.buttonB.xDistance - this.buttonB.yDistance * this.buttonA.xDistance / this.buttonA.yDistance));
    const aPresses = (this.prize.x - bPresses * this.buttonB.xDistance) / this.buttonA.xDistance;

    if (aPresses % 1 != 0 || bPresses % 1 != 0) return;

    for (let i = 0; i < aPresses; i++) {
      this.pressButton('A');
    }

    for (let i = 0; i < bPresses; i++) {
      this.pressButton('B');
    }
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