export function readFromFile() {
    const fs = require('fs'); // Require the file system module which provides the fs object that allows us to interact with the file system
    fs.readFile('tp.txt', (err, inputD) => { // readFile method is used to read the file asynchronously
        if (err) throw err; // If there's an error, it's thrown
        console.log(inputD.toString()); // Convert the buffer to a string and log it to the console
    })
}