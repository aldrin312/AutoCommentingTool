function writeIntoFile(data){
    fs.writeFile('Output.txt', data, (err) => {
        if (err) throw err;
    })
  }

  export function readFromFile(){
    const fs = require('fs')
    fs.readFile('tp.txt', (err, inputD) => {
    if (err) throw err;
        console.log(inputD.toString());
    })
}