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

async function main() {
  let input = await processLineByLine();
  let cycle = 0;
  let x = 1;
  let totalValue = 0;
  let cycleCheck = 20;

  input.forEach(line => {
    let v = 0;
    line = line.split(" ");
    if(line[0] === "addx") {
      cycle += 2
      v = parseInt(line[1], 10);
    } else {
      cycle++
    }
    if (cycle >= cycleCheck) {
      totalValue += x * cycleCheck;
      cycleCheck += 40;
    }

    x += v;
  })

  console.log(totalValue)
}

main();