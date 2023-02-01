const fs = require("fs");
const readline = require("readline");

async function processLineByLine() {
  const fileStream = fs.createReadStream("test-input.txt");

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

class Forest {
  constructor(forestInfo) {
    this.forestArray = [];
    this.isVisibleArray = []
    this.createForest(forestInfo);
  }

  createForest(input) {
    input.forEach((line, index) => {
      let lineArray = [];
      this.forestArray.push(line.split(""));
      this.isVisibleArray.push([])
      for(let i = 0; i < line.split("").length; i++) {
        this.isVisibleArray[index].push(0)
      }
    });
  }

  findOutterPerimeter() {
    for(let i = 0; i < this.isVisibleArray[0].length; i++) {
      this.isVisibleArray[0][i] = 1;
      this.isVisibleArray[this.isVisibleArray.length-1][i] = 1;
    }
    for(let i = 0; i < this.isVisibleArray.length; i++) {
      this.isVisibleArray[i][0] = 1;
      this.isVisibleArray[i][this.isVisibleArray[i].length-1] = 1;
    }
  }

  findVisibleInnerTrees() {
    //dont check top or bottom rows
    let count = 0;
    for (let i = 1; i < this.forestArray.length - 1; i++) {
      //dont check furthest left or right column
      let row = this.forestArray[i];
      for (let j = 1; j < row.length - 1; j++) {
        //check top left bottom right if statement
        let tree = row[j];
        //left
        for (let k = 0; k < j; k++) {
          let treesOnLeft = this.forestArray[i][k];
          if (tree <= treesOnLeft) {
            break;
          }
          if (tree > treesOnLeft && k === j - 1) {
            this.isVisibleArray[i][j] = 1;
          }
        }
        //right 
        for (let k = row.length; k > j; k--) {
          let treesOnRight = this.forestArray[i][k];
          if (tree <= treesOnRight) {
            break;
          }
          if (tree > treesOnRight && k - 1 === j) {
            this.isVisibleArray[i][j] = 1;
          }
        }
      }
    }
  }

  logVisibleOutput() {
    this.isVisibleArray.forEach(line => {
      let output = line.join('')
      console.log(output)
    })
  }
}

async function main() {
  let input = await processLineByLine();
  let forest = new Forest(input);
  forest.findOutterPerimeter();
  forest.findVisibleInnerTrees();
  forest.logVisibleOutput()
}

main();
