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
    inputArray.push(line)
  }
  return inputArray
}

async function main() {
   let inputArray = await processLineByLine();
   var r = /\d+/g;
   let count = 0;
   inputArray.forEach(input => {
    let numbers = input.match(r)
    numbers = numbers.map(input => parseInt(input,10))
    console.log(numbers)
    if((numbers[0] >= numbers[2] && numbers[0] <= numbers[3]) || (numbers[1] >= numbers[2] && numbers[1] <= numbers[3])
        || (numbers[2] >= numbers[0] && numbers[2] <= numbers[1]) || (numbers[3] >= numbers[0] && numbers[3] <= numbers[1])) {
        count++;
    } else {
        console.log(false)
    }
   })
   console.log(count)
}

main()