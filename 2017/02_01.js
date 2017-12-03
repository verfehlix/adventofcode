// read every line 
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('02_01_puzzle.txt')
})

let sum = 0
lineReader.on('line', function (line) {
    // get values from line (sperated by a tab)
    const values = line.split("\t")
    // get max & min values
    const max = Math.max.apply(null, values)
    const min = Math.min.apply(null, values)
    // get difference and increment sum
    const diff = Math.abs(max - min)
    sum += diff
    console.log("Sum: " + sum)
})