import React from 'react'
import { checkValidityAndFindEquivalences } from '../expressionStructureNoticer/expressionStructureNoticer'

function SuggestionBar(props) {
    return (
        <form>
            <label htmlFor="suggestion">{props.lawName}:</label>
            <input type="text" id="suggestion" value={props.suggestion}/>
        </form>
    );
}

function SuggestionControler(props) {
    const possibleLawsToApply = checkValidityAndFindEquivalences(props.textToAnalyze);

    let possibleLaws = "Expression selected is invalid"

    if (possibleLawsToApply) {
        if (possibleLawsToApply.length === 0) {
            possibleLaws = "No suggestion"
        } else {
            possibleLaws = possibleLawsToApply.map((possibleLaw) => {
            return <SuggestionBar lawName={possibleLaw.name} suggestion={possibleLaw.result} key={possibleLaw.name + possibleLaw.result}/>
        })
    }} 

    return (
        <div>
            <label htmlFor="textToAnalyze">Text to analyze:</label>
            <input type="text" id="textToAnalyze" value={props.textToAnalyze}/>
            <div>{possibleLaws}</div>
        </div>
    );
}

export { SuggestionControler }