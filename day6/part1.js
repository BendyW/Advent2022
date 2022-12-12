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
    for(let i = 0; i < text.length; i++) {
        if(text.charAt(i) === text.charAt(i+1) || text.charAt(i) === text.charAt(i+2) || text.charAt(i) === text.charAt(i+3)) {
            continue
        }
        if(text.charAt(i+1) === text.charAt(i+2) || text.charAt(i+1) === text.charAt(i+3)) {
            continue
        }
        if(text.charAt(i+2) === text.charAt(i+3)) {
            continue
        }
        return console.log(i+3+1)
    }

}

main()