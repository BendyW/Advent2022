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
    let fileDirectory = {}
    let directoryConcatArray = [];
    let temp = fileDirectory;
    //create directory file tree
    inputArray.forEach(line => {
        let text = line.split(" ")
        if(text[0] === '$') {
            if(text[1] === "cd") {
                if(text[2] === '/') {
                    //remove all nests
                    directoryConcatArray = []
                    temp = fileDirectory
                } else if (text[2] === "..") {
                    directoryConcatArray.pop()
                } else {
                    directoryConcatArray.push(text[2])
                }
            }
            if(text[1] === 'ls') {
                temp = fileDirectory
                for (var i=0;i<directoryConcatArray.length;i++) temp=temp[directoryConcatArray[i]];
                temp.size = () => {
                    temp.contents.map(file => {
                        console.log(file)
                    })
                }
            }
        } else if(text[0] === 'dir') {
            //create dir
            temp[text[1]] = {}

        } else {
            //create file
            temp[text[1]] = text[0]
        }
    })
    // console.log(fileDirectory)
    // const iterate = (obj) => {
    //     Object.keys(obj).forEach(key => {
    //         let count = 0;
    //         count++
    //         // console.log(count)
    //         // console.log(`key: ${key}, value: ${obj[key]}`)
    
    //         if (typeof obj[key] === 'object' && obj[key] !== null) {
    //             iterate(obj[key])
    //         }
    //     })
//     // }
// iterate(fileDirectory)
    let smallDirsSum = 0;
    // for (let item of fileDirectory) {
    //     let size = item.size()
    //     console.log(size)
    //     if (size <= 100000) {
    //         smallDirsSum += size;
    //     }
    // }
    Object.keys(fileDirectory).forEach(item => {
        console.log(item)
        // let size = item.size()
        // console.log(size)
        // if (size <= 100000) {
        //     smallDirsSum += size;
        // }
    })
}

main()