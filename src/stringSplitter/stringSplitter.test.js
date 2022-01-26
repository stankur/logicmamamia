import { stringSplitter } from './stringSplitter'

const string1 = "hai hah heheh cjcjcj      djdjjdjd mama   armpit"

const isAllSpace = (chunk) => {
    let allSpaceSoFar = true;

    for (let i = 0; i < chunk.length; i ++) {
        allSpaceSoFar = allSpaceSoFar && (chunk[i] === " ");
        if (!allSpaceSoFar) {
            return false
        }
    }

    return true
}
const splitArray1 = stringSplitter(string1, (chunk) => {return isAllSpace(chunk)});

expect(splitArray1).toEqual(["hai", " ", ""])