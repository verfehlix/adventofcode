// read every line 
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('08_01_puzzle.txt')
})

const lines = []
const registers = {}

// parse every line
lineReader.on('line', function (line) {
    lines.push(line)
})

// after all lines are read, 
lineReader.on('close', function () {
    // register every register (lul)
    lines.forEach(line => {
        const regName1 = line.split(" ")[0]
        const regName2 = line.split(" ")[4]

        registers[regName1] = 0
        registers[regName2] = 0

    })

    let biggestValue = 0
    let registerName = ""

    // iterate all the lines, check conditions and execute operations if possible
    lines.forEach(line => {
        // register to modify
        const registerToModify = line.split(" ")[0]

        // condition
        const condition = line.split("if")[1].trim()

        if (conditionPasses(condition)) {
            // operation
            const operation = line.split(" ")[1] === "inc" ? "+" : "-"
            const value = parseInt(line.split(" ")[2])

            const expression = "registers['" + registerToModify + "'] " + operation + "= " + parseInt(value)

            eval(expression)
        }

        Object.keys(registers).forEach(function (key) {
          let value = registers[key]
          if(value > biggestValue){
            biggestValue = value
            registerName = key
          }
        })
    })    

    console.log("The biggest value ever held in any of the registers is: " + biggestValue + " in register " + registerName)
})

function conditionPasses(condition) {
    const register = condition.split(" ")[0]
    const operation = condition.split(" ")[1]
    const value = condition.split(" ")[2]

    const expression = registers[register] + " " + operation + " " + parseInt(value)

    return eval(expression)
}