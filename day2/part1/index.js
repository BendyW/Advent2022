const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('../input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let inputArray = [];

  for await (const line of rl) {
    inputArray.push(line)
  }
  return inputArray
}

async function main() {
   let score = 0;
   let inputArray = await processLineByLine();
   inputArray.forEach(input => {
    input = input.split(" ")
    let [move, response] = [input[0], input[1]]
    if(move === "A" && response === "Y" || move === "B" && response === "Z" || move === "C" && response === "X") {
        score += 6;
    }
    if(move === "A" && response === "X" || move === "B" && response === "Y" || move === "C" && response === "Z") {
        score += 3;
    }
    if(response === "X") {
        score += 1;
    }
    if(response === "Y") {
        score += 2;
    }
    if(response === "Z") {
        score += 3;
    }
   })
   console.log(score);
}

main()