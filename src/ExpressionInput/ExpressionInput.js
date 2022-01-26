import React, { useState } from 'react'

function ExpressionInput() {
    const [ logicalExpression, setLogicalExpression ] = useState("")

    const convertToSymbols = (text) => {
        const splitText = text.split(" ");
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
            return chunk
        })

        return converted.join("")
    }

    const onChange = (event) => {
        const currentText = event.target.value;
        if (currentText.endsWith(" ")) {
            setLogicalExpression(convertToSymbols(currentText) + " ");
        } else {

            const splitText = currentText.split(" ");
            if (splitText.length === 1) {
                setLogicalExpression(currentText);
            } else {
                const exceptLast = splitText.slice(0, splitText.length - 1);
                const last = splitText[splitText.length - 1]
                setLogicalExpression( convertToSymbols(exceptLast.join(" ")) + " " + last);
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