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
    this.createForest(forestInfo);
  }

  createForest(input) {
    input.forEach((line) => {
      let lineArray = [];
      this.forestArray.push(line.split(""));
    });
  }

  findOutterPerimeter() {
    let width = this.forestArray[0].length;
    let height = this.forestArray.length;
    let perimeter = width * 2 + height * 2 - 4;
    return perimeter;
  }

  //Idea for OO:
  //When creating array of trees create a class for each tree than contains a height property and a is visible property
  findVisibleInnerTrees() {
    //dont check top or bottom rows
    let count = 0;
    for (let i = 1; i < this.forestArray.length - 1; i++) {
      //dont check furthest left or right column
      let row = this.forestArray[i];
      console.log(row.length);
      for (let j = 1; j < row.length - 1; j++) {
        //check top left bottom right if statement
        let tree = row[j];
        let isVisible = false;
        for (let k = 0; k < j; k++) {
          //Count needs to increment only once for each loop max,
          //Set a boolean for ifVisible and check if is visible before doing if statement then increment if true at end
          let treesOnLeft = this.forestArray[i][k];
          if (tree <= treesOnLeft) {
            break;
          }
          if (tree > treesOnLeft && k === j - 1) {
            isVisible = true;
          }
        }
      }
    }
  }
}

class Tree {
  constructor(height) {
    this.height = height
    this.isVisible = false;
  }
}

async function main() {
  let input = await processLineByLine();
  let forest = new Forest(input);
  forest.findOutterPerimeter();
  forest.findVisibleInnerTrees();
}

main();
