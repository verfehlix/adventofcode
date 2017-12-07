// read every line 
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('05_01_puzzle.txt')
})

let instructions = []

// write every line into array
lineReader.on('line', function (line) {
    instructions.push(parseInt(line))
})

// after all lines are read iterate instructions
lineReader.on('close', function () {
	// save last index, current index and amount of steps
	let lasti = 0
	let i = 0
	let steps = 0

	// iterate as long as we are within the bounds of the instructions
    while (i < instructions.length) {
    	// save last index
	    lasti = i
	    // increment current index depending on instruction
    	i += instructions[i]
    	// add 1 to instruction where we just were
	    instructions[lasti]++
	    // increase needed steps
    	steps++
    }
    console.log("Needed " + steps + " steps.")
})