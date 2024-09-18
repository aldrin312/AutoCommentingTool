export function readFromFile(){
    // Require the 'fs' module, which allows us to interact with the file system
    const fs = require('fs') 

    // Use the 'readFile' method to read the contents of a file named 'tp.txt'
    fs.readFile('tp.txt', (err, inputD) => {
        // Check if there was an error while reading the file
        if (err) throw err;
        // If there was no error, log the contents of the file to the console
        console.log(inputD.toString());
    })
}