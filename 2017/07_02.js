// read every line 
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('07_01_puzzle.txt')
})

const programs = []

// every line
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

    programs.push({
        name: name,
        weight: weight,
        children: children || []
    })

})

// after all lines are read
lineReader.on('close', function () {
    buildProgramTree(programs)
})

function buildProgramTree(programs) {
    const root = getRootProgram(programs)
    removeProgramByName(root.name, programs)
    // build tree
    recursivelyAppendChildren(root, programs)
    // check weights of tree
    recursivelyCheckWeights(root)
}

// get the weights of all children, and spits out the offending (overweight) program
function recursivelyCheckWeights(currentProgram){
    const myName = currentProgram.name
    let weightSum = currentProgram.weight

    let childWeights = []
    let childWeightsNoDuplicates

    currentProgram.children.forEach(child => {
        const childWeight = recursivelyCheckWeights(child)
        childWeights.push(childWeight)
        weightSum += childWeight
    })

    childWeightsNoDuplicates = Array.from(new Set(childWeights))

    if(childWeightsNoDuplicates.length > 1){
        const diff = childWeightsNoDuplicates[0] - childWeightsNoDuplicates[1]
        const offenderIndex = childWeights.indexOf(Math.max.apply(null, childWeights))
        const offenderProgram = currentProgram.children[offenderIndex]

        console.log(myName)
        console.log("Difference of " + diff + " found within: " + currentProgram.children.map(c => c.name))
        console.log(childWeights + " --> Offender is at index " + offenderIndex + " --> Name: " + offenderProgram.name)
        console.log("Original weight of offender: " + offenderProgram.weight)
        console.log("Offender's weight SHOULD HAVE BEEN: " + (offenderProgram.weight + diff))
        console.log()
    }
    
    return weightSum
}

// replaces the childrens name with the actual children object inside the children array of a program 
function recursivelyAppendChildren(currentProgram, programs){
    if(currentProgram.children.length === 0){
        return
    } else {
        currentProgram.children = currentProgram.children.map(childName => {
            const childObject = getProgramByName(childName, programs)
            removeProgramByName(childName, programs)
            recursivelyAppendChildren(childObject, programs)
            return childObject
        })
    }
}

// helper function to get the object of a program by its name
function getProgramByName(name, programs) {
    let program
    programs.forEach(prog => {
        if(prog.name === name){
            program = prog
        }
    })
    return program
}

// helper function to remove a program object from the list that holds all programs by its name
function removeProgramByName(name, programs) {
    programs.splice(programs.indexOf(getProgramByName(name, programs)), 1)
}

// helper function to get the root (bottom) element
function getRootProgram(programs){
    let root

    // find first program (root of tree --> has no parent --> not a child of any of the programs)
    programs.forEach(prog => {
        let parentFound = false

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