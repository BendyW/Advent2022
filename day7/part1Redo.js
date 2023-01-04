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

class FileSystem {
    constructor(input) {
        this.directory = {}
    }
    build(input) {
        // let currentDir = this.rootDirectory
        const directoryConcatArray = [];
        let currentDirectory = this.directory
        input.forEach(line => {
            let text = line.split(" ")
            //Command
            if(text[0] === '$') {
                //Change Directory
                if(text[1] === "cd") {
                    if(text[2] === '/') {
                        //Clear directoryConcatArray and set currenty directory to base
                        directoryConcatArray = []
                        currentDirectory = this.directory
                    } else if (text[2] === "..") {
                        //Remove last key in directory array
                        directoryConcatArray.pop()
                    } else {
                        //Add specific directory to directory key array
                        directoryConcatArray.push(text[2])
                    }
                }
                //Create list of files/folders inside current directory
                if(text[1] === 'ls') {
                    //reset to base directory
                    currentDirectory = this.directory
                    //create object key to current directory
                    for (var i=0;i<directoryConcatArray.length;i++) currentDirectory=currentDirectory[directoryConcatArray[i]];
                    //TODO: Add Size function to directory
                    // currentDirectory.size = () => {
                    //     currentDirectory.contents.map(file => {
                    //         console.log(file)
                    //     })
                    // }
                }
            } else if(text[0] === 'dir') {
                //create dir
                currentDirectory[text[1]] = {}
    
            } else {
                //create file
                currentDirectory[text[1]] = text[0]
            }
        })
    }
}

async function main() {
    let inputArray = await processLineByLine();
    let fileSystem = new FileSystem(inputArray)
    fileSystem.build(inputArray)
}

main()