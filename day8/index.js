const fs = require("fs");
const readline = require("readline");

async function processLineByLine() {
  const fileStream = fs.createReadStream("input.txt");

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
    for (let i = 1; i < this.forestArray.length - 1; i++) {
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
        for (let k = row.length-1; k > j; k--) {
          let treesOnRight = this.forestArray[i][k];
          if (tree <= treesOnRight) {
            break;
          }
          if (tree > treesOnRight && k - 1 === j) {
            this.isVisibleArray[i][j] = 1;
          }
        }
        //top
        for(let k = 0; k < i; k++) {
          let treesOnTop = this.forestArray[k][j];
          if (tree <= treesOnTop) {
            break;
          }
          if (tree > treesOnTop && k === i - 1) {
            this.isVisibleArray[i][j] = 1;
          }
        }
        //bottom
        for (let k = this.forestArray.length-1; k > i; k--) {
          let treesOnBottom = this.forestArray[k][j];
          if (tree <= treesOnBottom) {
            break;
          }
          if (tree > treesOnBottom && k - 1 === i) {
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

  countVisibleTrees() {
    let count = 0;
    this.isVisibleArray.forEach(line => {
      line.forEach(tree => {
        if (tree === 1) {
          count++
        }
      })
    })
    return count
  }
}

async function main() {
  let input = await processLineByLine();
  let forest = new Forest(input);
  forest.findOutterPerimeter();
  forest.findVisibleInnerTrees();
  let visibleTrees = forest.countVisibleTrees()
  console.log(visibleTrees)
}

main();
