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

function getNextInterestingSignal(nextInterestingSignal) {c
  return nextInterestingSignal + 40;
}

async function main() {
  // let globalCycle = 0;
  // let totalValue = 0;
  let spritePosition = 1;
  // let nextInterestingSignal = 20;
  let totalCycleValuesArray = [];
  let pixelArray = new Array(6).fill('')

  let input = await processLineByLine();

  input.forEach(line => {
    line = line.split(" ");
    let code = line[0]
    let v = parseInt(line[1], 10)
    let instruction = new Instruction(code, v)

    // globalCycle = incrementCycle(instruction, globalCycle);

    for(let i = 0; i < instruction.cyclesToProcessInstruction; i++) {
      totalCycleValuesArray.push(spritePosition)
    }

    // let isInterestingSignal = cycleCheck(globalCycle, nextInterestingSignal)

    // if (isInterestingSignal) {
    //   totalValue += calculateTotalValue(summedInstructions, nextInterestingSignal)
    //   nextInterestingSignal = getNextInterestingSignal(nextInterestingSignal);
    // }
    spritePosition += instruction.v;
  })

  let i = 0;
  totalCycleValuesArray.forEach((value, cycle) => {
    let pixelPosition = cycle%40;
    if(value === pixelPosition || value === pixelPosition + 1 || value === pixelPosition -1) {
      pixelArray[i] += '#'
    } else {
      pixelArray[i] += '.'
    }
    if((cycle+1)%40 === 0)i++;
  })

  console.log(totalCycleValuesArray)
  console.log(pixelArray)
}

main();