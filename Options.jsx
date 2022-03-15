import React from "react"
import './Options.css';
const Options = (props) => {
const options = [
    {
        text: "Differential Privacy",
        handler: props.actionProvider.handleDP, 
        id:1,
    },
    {text: "   Epsilon", handler: props.actionProvider.handleEpsilon, id: 2},
    {text: "Neighbouring dataset", handler: props.actionProvider.handleNeighbouring, id: 3}
];

const buttonsMarkup = options.map((option) => (
    <button key = {option.id} onClick = {option.handler} className="option-button">
        {option.text}
    </button>

    
));

return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;