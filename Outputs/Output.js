export function readFromFile() {
    // Require the fs module which provides the functionality
    // to interact with the file system
    const fs = require('fs')

    // Read the file 'tp.txt' asynchronously
    fs.readFile('tp.txt', (err, inputD) => {
        // Check if an error occurred while reading the file
        if (err) {
            // If an error occurred, throw it
            throw err
        }
        // Log the contents of the file to the console, converted to a string
        console.log(inputD.toString())
    })
}