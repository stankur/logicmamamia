// stringSplitter splits a text into array of chunks. 
// A chunk starts with the leftmost char of the text, and continues building up until the char which makes (exclusive) alterfn(chunk) produces false.
// By that time, a new chunk is built starting with the char that makes the last chunk produce false.

const stringSplitter = (text, alterfn) => {
    let currentChunk = "";
    let currentSplit = []


    for (let i = 0; i < text.length; i++) {

        const hypotheticalAlterfnAfterAddition = alterfn(currentChunk + text[i]);

        if (hypotheticalAlterfnAfterAddition === true) {
            currentChunk = currentChunk + text[i]
        } else {
            currentSplit.push(currentChunk);
            currentChunk = text[i];
        }


        if (i === text.length - 1) {
            currentSplit.push(currentChunk);
        }
    }

    return currentSplit
}

const isAllSpaceOrAllLetters = (chunk) => {

    if (chunk[0] === " ") {
        for (let i = 0; i < chunk.length; i ++) {
            if (!(chunk[i] === " ")) {
                return false
            }
        }
    } else {
        for (let i = 0; i < chunk.length; i ++) {
            if (chunk[i] === " ") {
                return false
            }
        }
    }
    return true
}

export { stringSplitter, isAllSpaceOrAllLetters }