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
   let inputArray = await processLineByLine();
   let finalScore = 0;
   let alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
   for(let i = 0; i < inputArray.length; i+=3) {
    let stringObject = {};
    let stringObjectTwo = {}
    for(let j = 0; j < inputArray[i].length; j++) {
        stringObject[inputArray[i].charAt(j)] = inputArray[i].charAt(j);
    }
    for(let j = 0; j < inputArray[i+1].length; j++) {
        stringObjectTwo[inputArray[i+1].charAt(j)] = inputArray[i+1].charAt(j);
        
    }
    for(let j = 0; j < inputArray[i+2].length; j++) {
        if(stringObject[inputArray[i+2].charAt(j)] && stringObjectTwo[inputArray[i+2].charAt(j)]) {
            finalScore += alphabet.indexOf(stringObject[inputArray[i+2].charAt(j)]) +1
            break;
        }
    }
   }
   console.log(finalScore)

}

main()