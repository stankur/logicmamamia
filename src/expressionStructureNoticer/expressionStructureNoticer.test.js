import { isBracketingValid, separateBracketedFromNot, separateIntoPropositionalGroupsOrSymbols, 
    getNegatedExpression, combineNotsWithExpressionNextToThem, arePropositionsEqual, findPossibleLogicalLaws } from './expressionStructureNoticer' 

it("works (isBracketingValid)", () => {
    expect(isBracketingValid("((((())(()))())))")).toBe(false);
    expect(isBracketingValid("((((())(()))()))")).toBe(true);
    expect(isBracketingValid("(((((p V q) + 5) -((fjf)rkkrkr))(rnrn)rnrnr)rnrnr)")).toBe(true);
    expect(isBracketingValid("rry(())())")).toBe(false);
    expect(isBracketingValid("ryryr ddh s+ jjd")).toBe(true);
})

it("works (separateBracketedFromNot)", () => {
    expect(separateBracketedFromNot("(p + q * (20)) + 5 ((())())")).toEqual(["(p + q * (20))", " + 5 ", "((())())"]);
})

it("works (separateIntoPropositionalGroupsOrSymbols)", () => {
    expect(separateIntoPropositionalGroupsOrSymbols(["(p + q * (20∧ ∼ ⊕))", "  ∨  5 ", "((())())", "p∧ ∼ ⊕↔"])).toEqual(
        ["(p + q * (20∧ ∼ ⊕))", "∨", "5", "((())())", "p", "∧", "∼", "⊕", "↔"]
        );

     expect(separateIntoPropositionalGroupsOrSymbols(["(p + q * (20∧ ∼ ⊕))", "   ", "((())())", "p∧ ∼ ⊕"])).toEqual(
         ["(p + q * (20∧ ∼ ⊕))", "((())())","p", "∧", "∼", "⊕"]);

})

it('works (combineNotsWithExpressionNextToThem)', () => {
    expect(combineNotsWithExpressionNextToThem(["(p + q * (20∧ ∼ ⊕))", "((())())","p", "∧", "∼", "⊕", "↔"])).toEqual(
        ["(p + q * (20∧ ∼ ⊕))", "((())())","p", "∧", "∼⊕", "↔"]
    );

    expect(combineNotsWithExpressionNextToThem(["((())())","p", "∧", "∼", "(p + q * (20∧ ∼ ⊕))", "⊕"])).toEqual(
        ["((())())","p", "∧", "∼(p + q * (20∧ ∼ ⊕))", "⊕"]
    );

    expect(combineNotsWithExpressionNextToThem(["((())())","p", "∧", "∼", "∼", "(p + q * (20∧ ∼ ⊕))", "⊕"])).toEqual(
        ["((())())","p", "∧", "∼∼(p + q * (20∧ ∼ ⊕))", "⊕"]
    );

    expect(combineNotsWithExpressionNextToThem(["((())())", "∼", "p", "∧", "∼", "∼", "∼","(p + q * (20∧ ∼ ⊕))", "⊕"])).toEqual(
        ["((())())","∼p", "∧", "∼∼∼(p + q * (20∧ ∼ ⊕))", "⊕"]
    );

    expect(combineNotsWithExpressionNextToThem(["((())())", "∼p", "∧", "∼", "∼", "∼","(p + q * (20∧ ∼ ⊕))", "⊕"])).toEqual(
        ["((())())","∼p", "∧", "∼∼∼(p + q * (20∧ ∼ ⊕))", "⊕"]
    );


})

it('works (arePropositionsEqual)', () => {
    expect(arePropositionsEqual("(   ( p ∧ q) ∧ ∼ q)", "( (p    ∧ q) ∧∼ q)")).toBe(true)
})

it('works (getNegatedExpression)', () => {
    expect(getNegatedExpression("∼p")).toBe("p");
    expect(getNegatedExpression("∼∼p")).toBe("∼p");
    expect(getNegatedExpression("∼(p ∨ q)")).toBe("(p ∨ q)");
    expect(getNegatedExpression("(∼∼p)")).toBe("∼p");
    expect(getNegatedExpression("(∼p)")).toBe("p");
    expect(getNegatedExpression("(∼(p ∨ q))")).toBe("(p ∨ q)");
    
})

it('works (find possible mutations)', () => {
    expect(findPossibleLogicalLaws(["∼q",  "∨", "(p  ∧ q)"])).toEqual([])

})
