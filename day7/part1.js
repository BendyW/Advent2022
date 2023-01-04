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
        this.rootDirectory = {}
    }
    build(input) {
        let directoryConcatArray = [];
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
                        currentDirectory = this.rootDirectory
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
                    currentDirectory = this.rootDirectory
                    //create path to current directory using array of keys
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
                //add dir creating class
                currentDirectory[text[1]] = {}
    
            } else {
                //create file
                //add file creating class
                currentDirectory[text[1]] = text[0]
            }
        })
        console.log(this.rootDirectory)
    }

    size() {
        //Figure out sizes
    }
}

class Directory {

}

class File {
    
}

async function main() {
    let inputArray = await processLineByLine();
    let fileSystem = new FileSystem(inputArray)
    fileSystem.build(inputArray)
}

main()