import { stringSplitter, isAllSpaceOrAllLetters, isFullyInBracketsOrFullyNot, doesNotHaveLogicalSymbolOrLogicalSymbol } from '../stringSplitter/stringSplitter'

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



export { isBracketingValid, separateBracketedFromNot, separateIntoPropositionalGroupsOrSymbols, textComponentsBracketingAllValid }