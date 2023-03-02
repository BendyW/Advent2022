const fs = require("fs");

async function processInput() {
  let monkeys = []
  fs.readFileSync("input.txt", {encoding: "utf-8"})
    .trim()
    .split("\n\n")
    .map((monkey) => {
      const monkeyNumberRegex = /Monkey ([0-9]+):/
      const monkeyItemsRegex = /Starting items: (.*)/
      const monkeyOperationRegex = /Operation: new = old (.*)/
      const monkeyTestRegex = /Test: divisible by ([0-9]+)/
      const monkeyTrueRegex = /If true: throw to monkey ([0-9]+)/
      const monkeyFalseRegex = /If false: throw to monkey ([0-9]+)/

      let monkeyID = monkey.match(monkeyNumberRegex)[1]
      let newMonkey = new Monkey(monkeyID);

      newMonkey.itemsArray = monkey.match(monkeyItemsRegex)[1].split(', ')
      newMonkey.testDivisibleBy = monkey.match(monkey.match(monkeyTestRegex)[1])
      newMonkey.ifTrue =  monkey.match(monkey.match(monkeyTrueRegex)[1])
      newMonkey.ifFalse = monkey.match(monkey.match(monkeyFalseRegex)[1])
      let monkeyOperation = monkey.match(monkeyOperationRegex)[1]
      newMonkey.operations = operation(monkeyOperation)

      monkeys.push(newMonkey);
    })

    return monkeys;
}

class Monkey {
  constructor(monkeyID){
    this.monkeyID = monkeyID;
  }
  itemsWorryLevelArray;
  testDivisibleBy;
  operations;

  processItems() {
    this.monkey.itemsWorryLevelArray.forEach((itemWorryLevel, itemIndex) => {
      itemWorryLevel = this.monkey.operations()
      itemWorryLevel = itemWorryLevel / 3
      let isTestTrue = (this.monkey.itemWorryLevel % this.monkey.testDivisibleBy === 0) ? true : false;

      if(isTestTrue) {
        //splice to try
      } else {
        //splice to false
      }
      
    })
  }
}

function operation(operation) {
  let opererands = operands.split(' ')

  return newValue
}

async function main() {
  const totalRounds = 1
  let itemsInspected = 0
  let monkeys = await processInput();

  for(let round = 1; i <= totalRounds; round++) {
    monkeys.forEach(monkey => {
      itemsInspected += monkey.items.length;
      monkey.processItems();


    });

  }


}

main()