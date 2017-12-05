const puzzleInput = 347991

// interesting values for grid creation
let maxLayer = 0
let arrayDimension = 1

// lookup-arrays where layer-specific information will be stored
// i.e. how many elements will fit in layer 5 -> layerElementCount[4]
let layerElementCount = []
let layerArrayDimension = []

console.log("Puzzle Input is " + puzzleInput)

// calculate how many layers we will need (and which dimension our 2D-grid will have) to make sure the puzzleInput will be in our grid
let alreadyPlacedElements = 0
while(alreadyPlacedElements <= puzzleInput) {
    const elementsThatFitInCurrentLayer = (arrayDimension * arrayDimension) - alreadyPlacedElements
    layerElementCount.push(elementsThatFitInCurrentLayer)
    layerArrayDimension.push(arrayDimension)
    alreadyPlacedElements += elementsThatFitInCurrentLayer
    if(alreadyPlacedElements <= puzzleInput) {
        arrayDimension += 2
        maxLayer++        
    }
}

console.log("-> The outermost layer will be " + maxLayer)
console.log("-> We will need an 2D-array of dimension " + arrayDimension)

// create the grid and calculate the center point
const grid = create2dArray(arrayDimension)
const gridCenter = {
    x: (grid[0].length - 1) / 2,
    y: (grid[0].length - 1) / 2
}

console.log("-> Grid Center is at " + JSON.stringify(gridCenter))

// initialize the current position to be the grid's center
let currentPosition = gridCenter
// initialize the current number (will be incremented during the filling of the grid)
let currentNumber = 1

// fill the grid
for (let i = 0; i <= maxLayer; i++) {
    // depending on the current layer's array dimension, calculate how often we have to go up/left/down/right in order to fill the grid in a spiral
    let upMoves = Math.max(0, layerArrayDimension[i] - 2)
    let leftMoves = Math.max(0, layerArrayDimension[i] - 1)
    let downMoves = Math.max(0, layerArrayDimension[i] - 1)
    let rightMoves = Math.max(0, layerArrayDimension[i] - 1)

    // fill in depending on how many elements the current layer can hold
    for (let j = 0; j < layerElementCount[i]; j++) {
        // calculate currentNumber as the sum of all adjacent cells (except when its the center, then its 1)
        if(currentPosition === gridCenter) {
            currentNumber = 1
        } else {
            currentNumber = calcSumOfAdjacentCells(grid, currentPosition)
        }

        if(currentNumber > puzzleInput) {
            console.log("FIRST NUMBER GREATER THAN PUZZLE INPUT: " + currentNumber)
            return
        }
        
        // fill in number
        grid[currentPosition.y][currentPosition.x] = currentNumber

        // update current position for next fill in
        if (upMoves > 0) {
            currentPosition = {x: currentPosition.x, y: currentPosition.y - 1}
            upMoves--
        } else if (leftMoves > 0) {
            currentPosition = {x: currentPosition.x - 1, y: currentPosition.y}
            leftMoves--
        } else if (downMoves > 0) {
            currentPosition = {x: currentPosition.x, y: currentPosition.y + 1}
            downMoves--
        } else if (rightMoves > 0) {
            currentPosition = {x: currentPosition.x + 1, y: currentPosition.y}
            rightMoves--
        }

    }
    currentPosition = {x: currentPosition.x + 1, y: currentPosition.y}
}

// helper function to calculate the sum of all adjacent cells of a cell
function calcSumOfAdjacentCells(grid, currentPosition) {
    const topLeft = currentPosition.y - 1 >= 0 && currentPosition.x - 1 >= 0 ? grid[currentPosition.y - 1][currentPosition.x - 1] : 0
    const topMid = currentPosition.y - 1 >= 0 ? grid[currentPosition.y - 1][currentPosition.x] : 0
    const topRight = currentPosition.y - 1 >= 0 && currentPosition.x + 1 < grid[0].length ? grid[currentPosition.y - 1][currentPosition.x + 1] : 0

    // console.log(topLeft + " " + topMid + " " + topRight) 
    
    const midLeft = currentPosition.x - 1 >= 0 ? grid[currentPosition.y][currentPosition.x - 1] : 0
    const midRight = currentPosition.x + 1 < grid[0].length ? grid[currentPosition.y][currentPosition.x + 1] : 0
    
    // console.log(midLeft + " " + midRight)

    const botLeft = currentPosition.y + 1 < grid[0].length && currentPosition.x - 1 >= 0 ? grid[currentPosition.y + 1][currentPosition.x - 1] : 0
    const botMid = currentPosition.y + 1 < grid[0].length ? grid[currentPosition.y + 1][currentPosition.x] : 0
    const botRight = currentPosition.y + 1 < grid[0].length && currentPosition.x + 1 < grid[0].length ? grid[currentPosition.y + 1][currentPosition.x + 1] : 0

    // console.log(botLeft + " " + botMid + " " + botRight)

    return topLeft + topMid + topRight + midLeft + midRight + botLeft + botMid + botRight
}

// helper function to create a 2D array with a given dimension, filled with 0s 
function create2dArray(dimension){
    let array = new Array(dimension)
    for (let i = 0; i < dimension; i++) {
        array[i] = new Array(dimension)
        for (let j = 0; j < array[i].length; j++) {
            array[i][j] = 0
        }
    }
    return array
}