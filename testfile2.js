function writeIntoFile(data){
    fs.writeFile('Output.txt', data, (err) => {
        // In case of a error throw err.
        if (err) throw err;
    })
  }