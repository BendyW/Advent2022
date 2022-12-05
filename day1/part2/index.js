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
    inputArray.push(parseInt(line, 10))
  }
  return inputArray
}

async function main() {
    let answerArray = [];
    let temp = 0;
    inputArray = await processLineByLine();
    inputArray.forEach(input => {
        if (isNaN(input)) {
            answerArray.push(temp)
            return temp = 0;
        }
        temp += input;
    });
    answerArray.sort().reverse()
    answerArray = answerArray.slice(1, 4)
    let answer = 0;
    answerArray.forEach(input => {
        answer += input
    })
    console.log(answer)
}

main()