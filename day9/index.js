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

function traverseGrid( input) {
    let coordSet = new Set()
    let currentHeadX = 0;
    let currentHeadY = 0;
    let lastStepHeadX = 0;
    let lastStepHeadY = 0;
    let currentTailX = 0;
    let currentTailY = 0;
    input.forEach(line => {
        let [direction, distance] = line.split(' ')
        distance = parseInt(distance, 10)
        for(let i = 1; i <= distance; i++) {
            lastStepHeadX = currentHeadX
            lastStepHeadY = currentHeadY
            if(direction === "R") {
                currentHeadX++
            }
            if(direction === "L") {
                currentHeadX --
            }
            if(direction === "U") {
                currentHeadY++
            }
            if(direction === "D") {
                currentHeadY--
            }
            if(Math.abs(currentHeadX - currentTailX) >= 2 || Math.abs(currentHeadY - currentTailY) >= 2) {
                currentTailY = lastStepHeadY;
                currentTailX = lastStepHeadX;
            }
            coordSet.add(`${currentTailX},${currentTailY}`)
        }
    })
    console.log(coordSet.entries())
    console.log(coordSet.size)
}

async function main() {
    let input = await processLineByLine();
    traverseGrid(input)
}

main()