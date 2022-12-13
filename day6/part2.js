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
    let text = inputArray[0]
    let isNewCharacters = false;
    for(let i = 0; i < text.length; i++) {
        let cache = {}
        let testCount = 0;
        for (let j =0; j <14; j++) {
            if (cache[text.charAt(i+j)] === undefined) {
                cache[text.charAt(i+j)] = 1
            }
        }
        let cacheArray = Object.values(cache)
       
        if(cacheArray.length === 14) {
            return console.log(i+13+1)
        }
    }

}

main()