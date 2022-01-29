import { stringSplitter, isFullyInBracketsOrFullyNot, doesNotHaveLogicalSymbolOrLogicalSymbol } from '../stringSplitter/stringSplitter'
import { isEqual } from 'lodash'

const isBracketingValid = (expression) => {
    if (expression[0] === ")") {
        return false
    } else if (!(expression[0] === "(")){
        for (let i = 0; i < expression.length; i++) {
            if (expression[i] === "(" || expression[i] === ")") {
                return false
            }
        }
    } else {
        let leftMinusRightBracketsSoFar = 0;

        for (let i = 0; i < expression.length; i++) {
            if (expression[i] === "(") {
                leftMinusRightBracketsSoFar++;
            } else if (expression[i] === ")") {
                leftMinusRightBracketsSoFar--;
            }

            if (leftMinusRightBracketsSoFar < 0) {
                return false
            }

            if (i === expression.length - 1) {
                if (!(leftMinusRightBracketsSoFar === 0) || !(expression[i] === ")")) {
                    return false
                } 
            }

        }
    }

    return true
}

const separateBracketedFromNot = (text) => {
    const splitText = stringSplitter(text, isFullyInBracketsOrFullyNot);

    return splitText
}


//assumes all elemets of splitText Array is valid
const separateIntoPropositionalGroupsOrSymbols = (splitText) => {
    let newArray = [];

    for (let i = 0; i < splitText.length; i++) {
        const element = splitText[i];
        if (element[0] === "(") {
            newArray.push(element)
        } else {
            const splitUnBracketedExpression = stringSplitter(element, doesNotHaveLogicalSymbolOrLogicalSymbol);

            for (let i = 0; i < splitUnBracketedExpression.length; i++) {
                const trimmed = splitUnBracketedExpression[i].trim();
                const splitBySpace = trimmed.split(" ");

                for (let j = 0; j < splitBySpace.length; j++) {
                    if (!(splitBySpace[j] === "")) {
                        newArray.push(splitBySpace[j]);
                    }
                }
                 
            }

        }
    }

    return newArray
}

const textComponentsBracketingAllValid = (text) => {
    const splitText = separateBracketedFromNot(text);

    for (let i = 0; i < splitText.length; i++) {
        if (!isBracketingValid(splitText[i])) {
            return false
        }
    }

    return true
}

const combineNotsWithExpressionNextToThem = (splitArray) => {
    let currentFinalArray = [];
    let thingToBeAppended = "";
    let nextIndexToBeAppendedByNot = -1;

    for (let i = 0; i < splitArray.length; i++) {
        if(splitArray[i] === "∼") {
            nextIndexToBeAppendedByNot = i + 1;
            thingToBeAppended += "∼";
            continue
        }

        if(i === nextIndexToBeAppendedByNot) {
            currentFinalArray.push(thingToBeAppended + splitArray[i]);
            thingToBeAppended = ""
            continue
        }

        currentFinalArray.push(splitArray[i]);
    }

    return currentFinalArray
}

// takes two texts and see if they are equal if they are propositions
const arePropositionsEqual = (prop1, prop2) => {
    const prop1SplitUnfiltered = prop1.split("");
    const prop1SplitFiltered = prop1SplitUnfiltered.filter((element) => {
        return !(element === "" || element === " ")
    });

    const prop2SplitUnfiltered = prop2.split("");
    const prop2SplitFiltered = prop2SplitUnfiltered.filter((element) => {
        return !(element === "" || element === " ")
    });

    return isEqual(prop1SplitFiltered, prop2SplitFiltered)
}

//assumes split test is of result from separateIntoPropositionalGroupsOrSymbols or combineNotsWithExpressionNextToThem
const convertToLogicalExpressionRoles = (splitText) => {
    const logicalSymbols = ["∧", "∨", "⊕", "∼", "→", "↔"];

    const roles = splitText.map((element) => {
        if(logicalSymbols.includes(element)) {
            return element
        } else {
            return "e"
        }});

    return roles
}

const checkIsBracketed = (text) => {
    if (text.length < 2) {
        return false
    }

    if (text[0] === "(" && text[2] === ")") {
        return true
    }

    return false
}

//assumes text passes checkIsBracketed
const getInBracket = (text) => {
    if (text.length === 2) {
        return ""
    }

    return text.slice(1, text.length - 1)
}

const getInBracketInfo = (textInBracket) => {
    const content = getInBracket(textInBracket);

    const notIsOperatorSeparated = separateIntoPropositionalGroupsOrSymbols(content);
    const notIsPOPSeparated = combineNotsWithExpressionNextToThem(notIsOperatorSeparated);

    const notIsOperatorRoles = convertToLogicalExpressionRoles(notIsOperatorSeparated);
    const notIsPOPRoles = convertToLogicalExpressionRoles(notIsPOPSeparated);

    return { notIsOperatorSeparated, notIsPOPSeparated, notIsOperatorRoles, notIsPOPRoles }
}

const getNegatedExpressionNoBrackets = (expression) => {
    const notIsOperatorSeparated = separateIntoPropositionalGroupsOrSymbols(expression);
    const notIsPOPSeparated = combineNotsWithExpressionNextToThem(notIsOperatorSeparated);

    const notIsOperatorRoles = convertToLogicalExpressionRoles(notIsOperatorSeparated);
    const notIsPOPRoles = convertToLogicalExpressionRoles(notIsPOPSeparated);

    if (isEqual(notIsOperatorRoles, ["∼", "e"])) {
        return notIsOperatorSeparated[1];
    }

    if (isEqual(notIsPOPRoles, ["e"])) {
        if (notIsPOPSeparated.length > 1 && notIsPOPSeparated[0] === "∼") {
            const [, ...negatedProposition] = notIsPOPSeparated;
            return negatedProposition.join("");
        }
    }

    return false
}

const getNegatedExpression = (expression) => {
    if (getNegatedExpressionNoBrackets(expression)) {
        return getNegatedExpressionNoBrackets(expression)
    } 

    if (checkIsBracketed(expression) && getNegatedExpressionNoBrackets(getInBracket(expression))) {
        return getNegatedExpressionNoBrackets(getInBracket(expression))
    }

    return false
}

const findPossibleLogicalLaws = (splitText) => {
    const notIsPartOfProposition = combineNotsWithExpressionNextToThem(splitText);
    let possibleMutations = [];

    const notIsPOPRoles = convertToLogicalExpressionRoles(notIsPartOfProposition);

    console.log(notIsPartOfProposition)
    console.log(notIsPOPRoles)

    if (isEqual(notIsPOPRoles, ["e", "∨", "e"])) {
        console.log("I went in here")
        if (notIsPartOfProposition[2] === "F") {
            possibleMutations.push({ name: "Identity (I)", result: notIsPartOfProposition[0] });
        }

        if (notIsPartOfProposition[2] === "T") {
            possibleMutations.push({ name: "Universal Bound (UB)", result: "T" });
        }

        if (arePropositionsEqual(notIsPartOfProposition[0], notIsPartOfProposition[2])) {
            possibleMutations.push({ name: "Idempotent (ID)", result: notIsPartOfProposition[0] });
        }

        possibleMutations.push({ name: "Commutative (COM)", result: `${notIsPartOfProposition[2]} ∨ ${notIsPartOfProposition[0]}` });

        if (checkIsBracketed(notIsPartOfProposition[2]) && isEqual(getInBracketInfo(notIsPartOfProposition[2]).notIsPOPRoles, ["e", "∨", "e"])) {
            const leftProposition = getInBracketInfo(notIsPartOfProposition[2]).notIsPOPSeparated[0];
            const rightProposition = getInBracketInfo(notIsPartOfProposition[2]).notIsPOPSeparated[2];

            possibleMutations.push({ name: "Associative (ASS)", result: `(${notIsPartOfProposition[0]} ∨ ${leftProposition}) ∨ ${rightProposition}` });
 
        }

        if (checkIsBracketed(notIsPartOfProposition[0]) && isEqual(getInBracketInfo(notIsPartOfProposition[0]).notIsPOPRoles, ["e", "∨", "e"])) {
            const leftProposition = getInBracketInfo(notIsPartOfProposition[0]).notIsPOPSeparated[0];
            const rightProposition = getInBracketInfo(notIsPartOfProposition[0]).notIsPOPSeparated[2];

            possibleMutations.push({ name: "Associative (ASS)", result: `${leftProposition} ∨ (${rightProposition} ∨ ${notIsPartOfProposition[2]})` });
 
        }

        if (checkIsBracketed(notIsPartOfProposition[2]) && isEqual(getInBracketInfo(notIsPartOfProposition[2]).notIsPOPRoles, ["e", "∧", "e"])) {
            const leftProposition = getInBracketInfo(notIsPartOfProposition[2]).notIsPOPSeparated[0];
            const rightProposition = getInBracketInfo(notIsPartOfProposition[2]).notIsPOPSeparated[2];

            possibleMutations.push({ name: "Distributive (DIST)", result: `(${notIsPartOfProposition[0]} ∨ ${leftProposition}) ∧ (${notIsPartOfProposition[0]} ∨ ${rightProposition})` });
        }

        if (checkIsBracketed(notIsPartOfProposition[0]) && checkIsBracketed(notIsPartOfProposition[2])
        && isEqual(getInBracketInfo(notIsPartOfProposition[0]).notIsPOPRoles, ["e", "∧", "e"])
        && isEqual(getInBracketInfo(notIsPartOfProposition[2]).notIsPOPRoles, ["e", "∧", "e"])) {
            const leftLeftProposition = getInBracketInfo(notIsPartOfProposition[0]).notIsPOPSeparated[0];
            const leftRightProposition = getInBracketInfo(notIsPartOfProposition[0]).notIsPOPSeparated[2];

            const rightLeftProposition = getInBracketInfo(notIsPartOfProposition[2]).notIsPOPSeparated[0];
            const rightRightProposition = getInBracketInfo(notIsPartOfProposition[2]).notIsPOPSeparated[2];

            if (arePropositionsEqual(leftLeftProposition, rightLeftProposition)) {
                possibleMutations.push({ name: "Distributive (DIST)", result: `${leftLeftProposition} ∧ (${leftRightProposition} ∨ ${rightRightProposition})` });
            }
        }

        if (checkIsBracketed(notIsPartOfProposition[2]) && isEqual(getInBracketInfo(notIsPartOfProposition[2]).notIsPOPRoles, ["e", "∧", "e"])) {
            const leftProposition = getInBracketInfo(notIsPartOfProposition[2]).notIsPOPSeparated[0];

            if (arePropositionsEqual(notIsPartOfProposition[0], leftProposition)) {
                possibleMutations.push({ name: "Absorption (ABS)", result: `${notIsPartOfProposition[0]}` });
            }
        }

        if (getNegatedExpression(notIsPartOfProposition[2])) {
            const negated = getNegatedExpression(notIsPartOfProposition[2]);

            if (arePropositionsEqual(negated, notIsPartOfProposition[0])) {
                possibleMutations.push({ name: "Negation (NEG)", result: "T" });
            }
        }

        if (getNegatedExpression(notIsPartOfProposition[0]) && getNegatedExpression(notIsPartOfProposition[2])) {
            const negated1 = getNegatedExpression(notIsPartOfProposition[0]);
            const negated2 = getNegatedExpression(notIsPartOfProposition[1]);

            possibleMutations.push({ name: "DeMorgan’s (DM)", result: `∼(${negated1} ∧ ${negated2})` })
        }

        if (checkIsBracketed(notIsPartOfProposition[0]) && checkIsBracketed(notIsPartOfProposition[2])
        && isEqual(getInBracketInfo(notIsPartOfProposition[0]).notIsPOPRoles, ["e", "∧", "e"])
        && isEqual(getInBracketInfo(notIsPartOfProposition[2]).notIsPOPRoles, ["e", "∧", "e"])
        && getNegatedExpression((getInBracketInfo(notIsPartOfProposition[0]).notIsPOPSeparated)[2])
        && getNegatedExpression((getInBracketInfo(notIsPartOfProposition[2]).notIsPOPSeparated)[0])
        ) {
            const normal1 = (getInBracketInfo(notIsPartOfProposition[0]).notIsPOPSeparated)[0];
            const negated1 = (getInBracketInfo(notIsPartOfProposition[0]).notIsPOPSeparated)[2];
            const negationOfNegated1 = getNegatedExpression(negated1)

            const negated2 = (getInBracketInfo(notIsPartOfProposition[2]).notIsPOPSeparated)[0];
            const normal2 = (getInBracketInfo(notIsPartOfProposition[2]).notIsPOPSeparated)[2];
            const negationOfNegated2 = getNegatedExpression(negated2)

            if (arePropositionsEqual(normal1, negationOfNegated2) && arePropositionsEqual(normal2, negationOfNegated1)) {
                possibleMutations.push({ name: "Definition of Exclusive OR (XOR)", result: `${normal1} ⊕ ${normal2}` })
            }
        }

        if (getNegatedExpression(notIsPartOfProposition[0])) {
            const negated1 = getNegatedExpression(notIsPartOfProposition[0]);

            possibleMutations.push({ name: "Definition of Implication (IMP)", result: `${negated1} → ${notIsPartOfProposition[2]}` })
        }

        



    }

    return possibleMutations
}




export { isBracketingValid, separateBracketedFromNot, separateIntoPropositionalGroupsOrSymbols, textComponentsBracketingAllValid,combineNotsWithExpressionNextToThem, arePropositionsEqual, findPossibleLogicalLaws }