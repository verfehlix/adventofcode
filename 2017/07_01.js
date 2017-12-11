// read every line 
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('07_01_puzzle.txt')
})

const programs = []

// every line represents a program
lineReader.on('line', function (line) {
    // process left side of arrow
    const left = line.split("->")[0]

    const name = left.split(" ")[0].trim()
    const weight = parseInt(left.split(" ")[1].trim().replace("(","").replace(")",""))

    // process right side of arrow (if it exsits)
    let children
    if(line.split("->")[1]){
        const right = line.split("->")[1].trim()
        children = right.split(",").map(el => el.trim())
    }

    // fill array that holds all the programs
    programs.push({
        name: name,
        weight: weight,
        children: children || []
    })

})

// after all lines are read, output the root (bottom) program
lineReader.on('close', function () {
    console.log("The root (bottom) of the programTree is: " + getRootProgram(programs).name )
})

// helper function to get the root (bottom) program 
function getRootProgram(programs){
    let root
    programs.forEach(prog => {
        let parentFound = false
        // check if the current program has any parents --> is the child of any other program
        programs.forEach(prog2 => {
            if(prog === prog2){
                return
            } else if(!parentFound){
                prog2.children.forEach(child => {
                    if(child === prog.name) {
                        parentFound = true
                        parent = prog2.name
                    }
                })
            }
        })

        if(!parentFound){
            root = prog
        }
    })

    return root
}