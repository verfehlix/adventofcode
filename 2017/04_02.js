// read every line 
const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('04_01_puzzle.txt')
})

let validPassPhraseCount = 0

// check every line if passphrase is valid & count
lineReader.on('line', function (line) {
    if(passPhraseIsValid(line)) {
        console.log("   VALID " + line)
        validPassPhraseCount++
    } else {
        console.log("IN-VALID " + line)
    }
})

// after all lines are read, output valid count
lineReader.on('close', function () {
    console.log("")
    console.log(validPassPhraseCount + " VALID PASSPHRASES IN TOTAL")
})

// passphrase is valid if it contains no duplicates --> convert to array and check for duplicate elements
function passPhraseIsValid(passPhrase){
    const passPhraseArray = passPhrase.split(" ")
    return !hasDuplicates(passPhraseArray) && !hasAnagrams(passPhraseArray)
}

// helper method to check if an array contains duplicates
function hasDuplicates(array) {
    return (new Set(array)).size !== array.length
}

// helper method to check if an array contains anagrams
function hasAnagrams(array) {
    const sortedArray = array.map(el => el.split("").sort().join(""))
    return (new Set(sortedArray)).size !== sortedArray.length
}