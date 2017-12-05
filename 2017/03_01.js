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
        // fill in number
        grid[currentPosition.y][currentPosition.x] = currentNumber
        currentNumber++

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

// after grid is filled in a spiral, search for the coordinates of the puzzle input
const positionOfPuzzleInput = slowSearch(grid,puzzleInput)

console.log("-> Grid was filled. Puzzle Input " + puzzleInput + " is at position " + JSON.stringify(positionOfPuzzleInput))

// calculate the manhattan distance between the grid's center and the location of the puzzle input
const distance = manhattanDistance(gridCenter, positionOfPuzzleInput)

console.log("-> Distance to center: " + distance)

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

// helper function to search for a certain value within a 2D array (warning - slow...)
function slowSearch(twoDimArray, value) {
    for (var y = 0; y < twoDimArray.length; y++) {
        for (var x = 0; x < twoDimArray.length; x++) {
            if(twoDimArray[y][x] === value) {
                return {
                    x: x,
                    y: y
                }
            }
        }
    }
}

// helper function to calculate the manhattan distance between two points within a 2D-grid
function manhattanDistance(p1, p2) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)
}