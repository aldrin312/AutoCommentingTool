export function readFromFile(){
    // Require the file system module, allowing us to work with files on the file system
    const fs = require('fs')

    // Try to read a file called 'tp.txt', passing the callback function to handle the result
    fs.readFile('tp.txt', (err, inputD) => {
        // Check if there was an error reading the file
        if (err) throw err;
        // If the file was read successfully, log its contents to the console
        console.log(inputD.toString());
    })
}