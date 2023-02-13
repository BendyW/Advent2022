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

function traverseGrid(input) {
    let coordSet = new Set()
    let currentHeadX = 0;
    let currentHeadY = 0;
    let lastStepHeadX = 0;
    let lastStepHeadY = 0;
    let currentTailX = 0;
    let currentTailY = 0;
    input.forEach(line => {
        let [direction, distance] = line.split(' ')
        distance = parseInt(distance, 10)
        for(let i = 1; i <= distance; i++) {
            lastStepHeadX = currentHeadX
            lastStepHeadY = currentHeadY
            if(direction === "R") {
                currentHeadX++
            }
            if(direction === "L") {
                currentHeadX --
            }
            if(direction === "U") {
                currentHeadY++
            }
            if(direction === "D") {
                currentHeadY--
            }
            if(Math.abs(currentHeadX - currentTailX) >= 2 || Math.abs(currentHeadY - currentTailY) >= 2) {
                currentTailY = lastStepHeadY;
                currentTailX = lastStepHeadX;
            }
            coordSet.add(`${currentTailX},${currentTailY}`)
        }
    })
    console.log(coordSet.entries())
    console.log(coordSet.size)
}

function traverseGrid2(input, length) {
    let coordSet = new Set()
    let rope = Array.from({length: length}, _ => ({x: 0, y: 0}))
    input.forEach(line => {
        let [direction, distance] = line.split(' ')
        distance = parseInt(distance, 10)
        const [head, tail] = [rope[0], rope.slice(-1)[0]]
        for(let i = 1; i <= distance; i++) {
            //find head pos
            if(direction === "R") {
                head.x++
            }
            if(direction === "L") {
                head.x--
            }
            if(direction === "U") {
                head.y++
            }
            if(direction === "D") {
                head.y--
            }

            //find positions of each part of rope after head
            for (let i = 1; i < rope.length; i++) {
                const [prev, curr] = [rope[i - 1], rope[i]]
                if(Math.abs(prev.x - curr.x) >= 2 || Math.abs(prev.y - curr.y) >= 2) { 
                    let directionX = prev.x - curr.x
                    let directionY = prev.y - curr.y
                    curr.x += Math.abs(directionX) === 2 ? directionX / 2 : directionX;
                    curr.y += Math.abs(directionY) === 2 ? directionY / 2 : directionY;
                }
            }
            coordSet.add(`${tail.x},${tail.y}`)
        }
    })
    console.log(coordSet.size)
}

async function main() {
    let input = await processLineByLine();
    // traverseGrid(input)
    traverseGrid2(input, 10)
}

main()