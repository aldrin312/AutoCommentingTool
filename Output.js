export function readFromFile(){
    // Require the file system module, which provides I/O operations
    const fs = require('fs')

    // Read the file 'tp.txt' and pass a callback function
    fs.readFile('tp.txt', (err, inputD) => {

        // Check if an error occurred during file read
        if (err) throw err;
        
        // Convert the binary data to a string using toString()
        // and log it to the console
        console.log(inputD.toString());
    })
}