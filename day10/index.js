const fs = require("fs");
const readline = require("readline");

async function processLineByLine() {
  const fileStream = fs.createReadStream("input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let inputArray = [];

  for await (const line of rl) {
    inputArray.push(line);
  }
  return inputArray;
}

class Instruction {
  constructor(code, v) {
    if (code === 'noop') {
      this.cyclesToProcessInstruction = 1;
      this.v = 0;
      this.code = code;
    } else if (code === 'addx'){
      this.cyclesToProcessInstruction = 2;
      this.v = v;
      this.code = code;
    } else {
      return 'error'
    };
  }
}

function incrementCycle(instruction, argCycle) {
  return instruction.cyclesToProcessInstruction + argCycle
}

function cycleCheck(globalCycle, nextInterestingSignal) {
  if(globalCycle >= nextInterestingSignal) {
    return true
  }
  return false;
}

function calculateTotalValue(summedInstructions, nextInterestingSignal) {
  return summedInstructions * nextInterestingSignal
}

function getNextInterestingSignal(nextInterestingSignal) {
  console.log(nextInterestingSignal)
  return nextInterestingSignal + 40;
}

async function main() {
  let input = await processLineByLine();
  let globalCycle = 0;
  let totalValue = 0;
  let summedInstructions = 1;
  let nextInterestingSignal = 20;

  input.forEach(line => {
    line = line.split(" ");
    let code = line[0]
    let v = parseInt(line[1], 10)
    let instruction = new Instruction(code, v)

    globalCycle = incrementCycle(instruction, globalCycle);

    let isInterestingSignal = cycleCheck(globalCycle, nextInterestingSignal)

    if (isInterestingSignal) {
      totalValue += calculateTotalValue(summedInstructions, nextInterestingSignal)
      nextInterestingSignal = getNextInterestingSignal(nextInterestingSignal);
    }

    summedInstructions += instruction.v;
  })

  console.log(totalValue)
}

main();