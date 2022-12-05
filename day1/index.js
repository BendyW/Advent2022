const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let inputArray = [];

  for await (const line of rl) {
    inputArray.push(parseInt(line, 10))
  }
  return inputArray
}

async function main() {
    let highestCalories = 0;
    let temp = 0;
    inputArray = await processLineByLine();
    inputArray.forEach(input => {
        if (isNaN(input)) {
            return temp = 0;
        }
        temp += input;
        if (temp > highestCalories) highestCalories = temp;
    });
    console.log(highestCalories)
}

main()