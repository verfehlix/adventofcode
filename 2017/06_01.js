const puzzleInput = "5   1   10   0   1   7   13   14   3   12   8   10   7   12   0   6"
// const puzzleInput = "0   2   7   0"

// create memory-"history"
let memHistory = []

// create memory with initial state from puzzle input
let mem = []
puzzleInput.split("   ").forEach((blockAmount, i) => {
    mem.push(parseInt(blockAmount))
})

// save initial state to history
saveToHistory(mem)

// while "history doesnt repeat itself", redistribute blocks and count iterations
let iterations = 0
while(!hasDuplicates(memHistory)){
    // redistribute the blocks within the memory banks
    redistributeBlocks(mem)
    // save state of the memory to the history
    saveToHistory(mem)
    // count iteration
    iterations++
}

// after were done redistributing, log iterations
console.log("It took " + iterations + " iterations until history repeated itself!")

// helper method to redistribute blocks within memory banks
function redistributeBlocks(mem){
    // get bank with most blocks
    const bankWithMostBlocks = getBankWithMostBlocks(mem)

    // remove blocks from bank in order to redistribute them
    let blocks = mem[bankWithMostBlocks]
    mem[bankWithMostBlocks] = 0

    // redistribute blocks (as long as there are any left) - in a cycle
    let index = bankWithMostBlocks
    while(blocks > 0){
        // go to the next element (cyclically, so jump from last to first)
        if(index+1 > mem.length-1){
            index = 0
        } else {
            index++
        }
        
        // remove block from remainin blocks and add it to the current bank
        mem[index]++
        blocks--
    }

    return mem
}

// helper method to get bank with most blocks
function getBankWithMostBlocks(mem) {
    return mem.indexOf(Math.max.apply(null, mem))
}

// helper method to add a JSON string of the memory to the history
function saveToHistory(mem) {
    memHistory.push(JSON.stringify(mem))
}

// helper method to check if an array contains duplicates
function hasDuplicates(array) {
    return (new Set(array)).size !== array.length
}
