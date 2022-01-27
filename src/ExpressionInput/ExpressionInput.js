import React, { useState } from 'react'
import { stringSplitter, isAllSpaceOrAllLetters } from '../stringSplitter/stringSplitter'

function ExpressionInput() {
    const [ logicalExpression, setLogicalExpression ] = useState("")

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


    return (
        <div>
            <form>
                <label htmlFor="ExpressionInput">Logical Expression: </label>
                <input type="text" id="ExpressionInput" onChange={onChange} value={logicalExpression}/>
            </form>
        </div>
    );

}

export { ExpressionInput }