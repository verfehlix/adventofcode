// read every line 
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('02_01_puzzle.txt')
})

let sum = 0
lineReader.on('line', function (line) {
    // get values from line (sperated by a tab)
    const values = line.split("\t")
    // get values that are evenly divisible (mod 0), divise them and add to sum
    values.forEach(val1 => {
        values.forEach(val2 => {
            if(val1 !== val2){
                if(val1%val2 === 0) {
                    sum += val1/val2
                }
            }
        })
    })
    console.log("Sum: " + sum)
})