function writeIntoFile(data){
    fs.writeFile('Output.txt', data, (err) => {
        if (err) throw err;
    })
  }