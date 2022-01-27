import { stringSplitter, isFullyInBracketsOrFullyNot, isAllSpaceOrAllLetters } from './stringSplitter'

const string0 ="   a"
const string1 = "hai hah heheh cjcjcj      djdjjdjd mama   armpit"
const string2 ="hai  test "

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

it('works (isFullyInBracketsOrFullyNot)', () => {
    expect(isFullyInBracketsOrFullyNot("(5 + ( 3* 4))")).toBe(true);

    expect(isFullyInBracketsOrFullyNot("(5 +(p v q)) + 3")).toBe(false);

    expect(isFullyInBracketsOrFullyNot("(5+((( q + e)(")).toBe(true)
})

it('works for isFullyInBracketsOrFullyNot', () => {
    expect(stringSplitter("p V w n ~ (q xor 5 v not ( 5 xor 4)) ", isFullyInBracketsOrFullyNot)).toEqual(["p V w n ~ ", "(q xor 5 v not ( 5 xor 4))", " "]);
    expect(stringSplitter(") 2 v () ~ (q xor 5 v not ( 5 xor 4)) ", isFullyInBracketsOrFullyNot)).toEqual([")", " 2 v ", "()", " ~ ", "(q xor 5 v not ( 5 xor 4))", " " ]);

})