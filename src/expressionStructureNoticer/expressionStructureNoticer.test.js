import { isBracketingValid, separateBracketedFromNot, separateIntoPropositionalGroupsOrSymbols, textComponentsBracketingAllValid } from './expressionStructureNoticer' 

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
    expect(separateIntoPropositionalGroupsOrSymbols(["(p + q * (20∧ ∼ ⊕))", "  ∨  5 ", "((())())", "p∧ ∼ ⊕"])).toEqual(
        ["(p + q * (20∧ ∼ ⊕))", "∨", "5", "((())())", "p", "∧", "∼", "⊕"]
        );

     expect(separateIntoPropositionalGroupsOrSymbols(["(p + q * (20∧ ∼ ⊕))", "   ", "((())())", "p∧ ∼ ⊕"])).toEqual(
         ["(p + q * (20∧ ∼ ⊕))", "((())())","p", "∧", "∼", "⊕"]);

})

