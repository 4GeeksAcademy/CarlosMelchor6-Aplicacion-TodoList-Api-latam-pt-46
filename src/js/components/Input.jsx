import React from "react";

export const Input = (props) => {

    const { currentInput, handleChange, keyPress} = props

    return (
        <li>
            <input
                className="ps-5"
                type="text"
                id="myInput"
                placeholder="what needs to be done?"
                value={currentInput}
                onChange={handleChange}
                onKeyDown={keyPress}
            >
            </input>
        </li>
    )
}