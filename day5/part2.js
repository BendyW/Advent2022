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
   let crateArray = [];
   const numberOfArrays = 9;
   let finalAnswer = '';
   const reg = /\d+/g;
   //Create array for each column
   for(let i = 0; i < 9; i++) {
    crateArray.push([])
   }
   inputArray.map((input,i) => {
    //numberofarrays
    if(i < 8) {
        for(let j = 0; j < numberOfArrays; j++) {
            let letterPosition = j*4 +1
            if(input.charAt(letterPosition) !== " ") {
                crateArray[j].push(input.charAt(letterPosition))
            }

            //last line of array input
            if(i === 7) {
                crateArray[j] = crateArray[j].reverse()
            }
            
        }
    }

    if(i >= 10) {
        let numbers = input.match(reg)
        let amountToMove = parseInt(numbers[0], 10)
        let moveFrom = parseInt(numbers[1], 10) -1
        let moveTo = parseInt(numbers[2], 10) -1
        let temp = 0;
        temp = crateArray[moveFrom].splice(crateArray[moveFrom].length - amountToMove)
        crateArray[moveTo] = crateArray[moveTo].concat(temp)
    }
   })
   crateArray.forEach(crate => {
    let temp = crate.pop()
    finalAnswer += temp;
   })
   console.log(finalAnswer)
}

main()