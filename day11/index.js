const fs = require("fs");

async function processInput() {
  let monkeys = []
  fs.readFileSync("input.txt", {encoding: "utf-8"})
    .trim()
    .split("\n\n")
    .map((monkey) => {
      const monkeyNumberRegex = /Monkey ([0-9]+):/
      const monkeyItemsRegex = /Starting items: (.*)/
      const monkeyOperationRegex = /Operation: new = old (.) (.*)/
      const monkeyTestRegex = /Test: divisible by ([0-9]+)/
      const monkeyTrueRegex = /If true: throw to monkey ([0-9]+)/
      const monkeyFalseRegex = /If false: throw to monkey ([0-9]+)/

      let monkeyID = monkey.match(monkeyNumberRegex)[1]
      let newMonkey = new Monkey(monkeyID);

      newMonkey.itemsWorryLevelArray = monkey.match(monkeyItemsRegex)[1].split(', ').map(x => parseInt(x, 10))
      newMonkey.testDivisibleBy = monkey.match(monkey.match(monkeyTestRegex)[1])
      newMonkey.ifTrueMonkeyID =  parseInt(monkey.match(monkey.match(monkeyTrueRegex)[1]), 10)
      newMonkey.ifFalseMonkeyID = parseInt(monkey.match(monkey.match(monkeyFalseRegex)[1]), 10)
      newMonkey.operatorOperand = monkey.match(monkeyOperationRegex)[1]
      newMonkey.operatorValue = monkey.match(monkeyOperationRegex)[2]

      monkeys.push(newMonkey);
    })

    return monkeys;
}

class Monkey {
  constructor(monkeyID){
    this.monkeyID = monkeyID;
    this.itemsInspected = 0;
  }
  itemsWorryLevelArray;
  testDivisibleBy;
  ifTrueMonkeyID;
  ifFalseMonkeyID;
  operatorOperand;
  operatorValue;

  worryLevelOperation(currentWorryLevel, operatorOperand, operatorValue) {
    //Convert operatorValue to Int and check if valid
    let operatorInt = parseInt(operatorValue, 10)
    if(isNaN(operatorInt)) {
      if(operatorValue === "old") {
        operatorInt = currentWorryLevel
      } else {
        throw new Error(`Invalid operand ${operatorValue}`)
      }
    }
    let newWorryLevel = 0;

    switch (operatorOperand) {
      case "*":
        newWorryLevel = currentWorryLevel * operatorInt 
        break;
      case "+":
        newWorryLevel = currentWorryLevel + operatorInt 
        break;
      default:
        throw new Error(`Invalid Operation: ${operatorOperand}`)
    }
    
    return newWorryLevel
  }

  processItems(monkeys) {
    let divisor = monkeys.reduce((d, monkey) => d * monkey.testDivisibleBy, 1);
    this.itemsInspected += this.itemsWorryLevelArray.length;
    while(this.itemsWorryLevelArray.length) {
      //Get next item
      let itemWorryLevel = this.itemsWorryLevelArray.shift()
      //Run Operation to calculate new worry level
      itemWorryLevel = this.worryLevelOperation(itemWorryLevel, this.operatorOperand, this.operatorValue) % divisor
      //if part 1 level by 3
      // itemWorryLevel = Math.floor(itemWorryLevel / 3)
      // Run test to see which monkey to pass to
      let isTestTrue = (itemWorryLevel % this.testDivisibleBy === 0) ? true : false;

      if(isTestTrue) {
        monkeys[this.ifTrueMonkeyID].itemsWorryLevelArray.push(itemWorryLevel)
      } else {
        monkeys[this.ifFalseMonkeyID].itemsWorryLevelArray.push(itemWorryLevel)
      }
      
    }
  }

  toString() {
    let returnString = "";
    returnString = `Monkey ID: ${this.monkeyID}\n`
    returnString += `Monkey Items: ${this.itemsWorryLevelArray}`
    return returnString
  }
}

async function main() {
  if(isDebug) console.log("Starting Keep Away")
  const totalRounds = 10000
  let itemsInspected = 0
  let monkeys = await processInput();

  for(let round = 1; round <= totalRounds; round++) {
    if(isDebug) console.log(`Starting Round ${round}`)
    monkeys.forEach(monkey => {
      itemsInspected += monkey.itemsWorryLevelArray.length;
      monkey.processItems(monkeys);
    });
    if(isDebug) {
      monkeys.forEach(monkey => {
        console.log(monkey.toString())
        console.log(`Monkey items inspected: ${monkey.itemsInspected}`)
      })
    }
  }
  
  let part1HighestValues = []
  let part1Solution = 0;
  monkeys.forEach(monkey => {
    part1HighestValues.push(monkey.itemsInspected)
  })
  part1HighestValues.sort(function (a, b) {  return a - b;  })
  part1HighestValues = part1HighestValues.slice(Math.max(part1HighestValues.length - 2, 0))
  part1Solution = part1HighestValues[0] * part1HighestValues[1]
  console.log(part1Solution)

}


let isDebug = true;
main()