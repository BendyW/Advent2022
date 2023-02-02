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
    this.distanceViewArray = []
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
      this.distanceViewArray.push([])
      for(let i = 0; i < line.split("").length; i++) {
        this.distanceViewArray[index].push(0)
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
          let treeOnLeft = this.forestArray[i][k];
          if (tree <= treeOnLeft) {
            break;
          }
          if (tree > treeOnLeft && k === j - 1) {
            this.isVisibleArray[i][j] = 1;
          }
        }
        //right 
        for (let k = row.length-1; k > j; k--) {
          let treeOnRight = this.forestArray[i][k];
          if (tree <= treeOnRight) {
            break;
          }
          if (tree > treeOnRight && k - 1 === j) {
            this.isVisibleArray[i][j] = 1;
          }
        }
        //top
        for(let k = 0; k < i; k++) {
          let treeOnTop = this.forestArray[k][j];
          if (tree <= treeOnTop) {
            break;
          }
          if (tree > treeOnTop && k === i - 1) {
            this.isVisibleArray[i][j] = 1;
          }
        }
        //bottom
        for (let k = this.forestArray.length-1; k > i; k--) {
          let treeOnBottom = this.forestArray[k][j];
          if (tree <= treeOnBottom) {
            break;
          }
          if (tree > treeOnBottom && k - 1 === i) {
            this.isVisibleArray[i][j] = 1;
          }
        }
      }
    }
  }

  findViewDistance() {
    for (let i = 0; i < this.forestArray.length; i++) {
      let row = this.forestArray[i];
      for (let j = 0; j < row.length; j++) {
        let countLeft = 1;
        let countRight = 1;
        let countTop = 1;
        let countBottom = 1;
        let tree = row[j];
        //left
        for (let k = j-1; k >= 0; k--) {
          let treeOnLeft = this.forestArray[i][k];
          if (tree <= treeOnLeft) {
            break;
          }
          countLeft++
        }
        //right 
        for (let k = j+1; k < row.length; k++) {
          let treeOnRight = this.forestArray[i][k];
          if (tree <= treeOnRight) {
            break;
          }
          countRight++
        }
        //top
        for (let k = i-1; k >= 0; k--) {
          let treeOnTop = this.forestArray[k][j]
          if (tree <= treeOnTop) {
            break;
          }
          countTop++
        }
        //bottom
        for (let k = i+1; k < this.forestArray.length; k++) {
          let treeOnTop = this.forestArray[k][j]
          if (tree <= treeOnTop) {
            break;
          }
          countBottom++
        }
        console.log(countLeft ,countRight ,countTop ,countBottom)
        this.distanceViewArray[i][j] = countLeft * countRight * countTop * countBottom
      }
    }
  }

  logVisibleOutput() {
    this.isVisibleArray.forEach(line => {
      let output = line.join('')
      console.log(output)
    })
  }

  logViewDistance() {
    this.distanceViewArray.forEach(line => {
      let output = line.join('')
      console.log(output)
    })
  }

  findLongestView() {
    let count = 0;
    this.distanceViewArray.forEach(line => {
      line.forEach(tree => {
        if (tree > count) {
          count = tree;
        }
      })
    })
    return count
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
  //part 1
  forest.findOutterPerimeter();
  forest.findVisibleInnerTrees();
  let visibleTrees = forest.countVisibleTrees()
  // console.log(visibleTrees)

  //part 2
  forest.findViewDistance()
  forest.logViewDistance()
  let longestView = forest.findLongestView();
  console.log(longestView)
}

main();
