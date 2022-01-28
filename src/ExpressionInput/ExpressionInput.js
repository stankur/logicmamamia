import React, { useState } from 'react'
import { stringSplitter, isAllSpaceOrAllLetters } from '../stringSplitter/stringSplitter'
import { SuggestionControler } from '../SuggestionControler/SuggestionControler'

function ExpressionInput() {
    const [ logicalExpression, setLogicalExpression ] = useState("")
    const [ currentSelected, setCurrentSelected ] = useState({ start: 0, end: 0, text: "" });

    const convertToSymbols = (text) => {
        const splitText = stringSplitter(text, isAllSpaceOrAllLetters);
        const converted = splitText.map((chunk) => {
            if (chunk === "\\land") {
                return "∧"
            }
            if (chunk === "\\lor") {
                return "∨"
            }
            if (chunk === "\\oplus") {
                return "⊕"
            }
            if (chunk === "\\lnot") {
                return "∼"
            }
            if (chunk === "\\implies") {
                return "→"
            }
            if (chunk === "\\iff") {
                return "↔"
            }
            return chunk
        })

        return converted.join("")
    }

    const onChange = (event) => {
        const currentText = event.target.value;

        if (currentText.endsWith(" ")) {
            setLogicalExpression(convertToSymbols(currentText))
        } else { 
            if (currentText.length > 0) {
            const letterChunks = stringSplitter(currentText, isAllSpaceOrAllLetters);

            let letterChunksExceptLastOne = [];

            for (let i = 0; i < letterChunks.length - 1; i++) {
                letterChunksExceptLastOne.push(letterChunks[i]);
            } 

            const textExceptLastChunk = letterChunksExceptLastOne;
            const lastChunk = letterChunks[letterChunks.length -1];

            setLogicalExpression(convertToSymbols(textExceptLastChunk) + lastChunk);
            } else {
                setLogicalExpression("");
            }
        }
    }

    const assessSelected = (event) => {
        const input = event.target;

        const start = input.selectionStart;
        const end = input.selectionEnd;

        let text;

        if (!(start === end)) {  
            text = input.value.slice(start, end);
        } else {
            text = "";
        }

        setCurrentSelected({ start, end, text });


    }

    const replaceWithSuggestion = (suggestedChange) => {
        const start = currentSelected.start;
        const end = currentSelected.end;

        let leftString;
        let rightString;

        if (start === 0) {
            leftString = ""
        } else {
            leftString = currentSelected.text.slice(0, start)
        }

        if (end === currentSelected.length) {
            rightString = ""
        } else {
            rightString = currentSelected.text.slice(end);
        }

        setLogicalExpression(leftString + suggestedChange + rightString);
    }
        


    return (
        <div>
            <form>
                <label htmlFor="ExpressionInput">Logical Expression: </label>
                <input type="text" id="ExpressionInput" onChange={onChange} onClick={assessSelected} onKeyUp={assessSelected} value={logicalExpression}/>
                <SuggestionControler textToAnalyze={currentSelected.text} onSubmit={replaceWithSuggestion}/>
            </form>
        </div>
    );

}

export { ExpressionInput }