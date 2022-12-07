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
   let finalString = 0;
   let alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
   inputArray.forEach(input => {
    let [first, second] = [input.slice(0, input.length/2), input.slice(input.length/2)];
    let stringObject = {};
    for(let i = 0; i < first.length; i++) {
        stringObject[first.charAt(i)] = first.charAt(i);
    }
    for(let i = 0; i < first.length; i++) {
        if(stringObject[second.charAt(i)]) {
            finalString += alphabet.indexOf(stringObject[second.charAt(i)]) +1
            break;
        }
    }
   })
   console.log(finalString)

}

main()