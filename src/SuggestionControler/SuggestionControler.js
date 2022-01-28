import React, { useState } from 'react'

function SuggestionControler(props) {

    return (
        <div>
            <input type="text" value={props.textToAnalyze}/>
        </div>
    );
}

export { SuggestionControler }