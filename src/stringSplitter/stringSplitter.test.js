import { stringSplitter } from './stringSplitter'

const string0 ="   a"
const string1 = "hai hah heheh cjcjcj      djdjjdjd mama   armpit"
const string2 ="hai  test "

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


const splitArray0 = stringSplitter(string0, (chunk) => {return isAllSpaceOrAllLetters(chunk)});
const splitArray1 = stringSplitter(string1, (chunk) => {return isAllSpaceOrAllLetters(chunk)});
const splitArray2 = stringSplitter(string2, (chunk) => {return isAllSpaceOrAllLetters(chunk)});


it('works for 1 chunk', () => {
    expect(splitArray0).toEqual(["   ", "a"])
});

it('works for more than 1 chunks', () => {
    expect(splitArray1).toEqual(["hai", " ", "hah", " ", "heheh", " ", "cjcjcj", "      ", "djdjjdjd", " ", "mama", "   ", "armpit"])
});

it('works if last part of text is spaces', () => {
    expect(splitArray2).toEqual(["hai", "  ", "test", " "])
})