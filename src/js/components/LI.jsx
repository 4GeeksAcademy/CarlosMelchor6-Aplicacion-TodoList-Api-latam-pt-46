import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';


export const ContainerLI = () => {

    const [currentInput, setCurrentInput] = useState("");
    const [todo, setTodo] = useState([]);

    const handleChange = (event) => { setCurrentInput(event.target.value) }

    const deleteItem = (currentIndex) => {
        setTodo(todo.filter((item, index) => index !== currentIndex))
    }

    const keyPress = (event) => {
        if (event.key === "Enter" && currentInput.trim() !== "") {
            setTodo(([...todo, currentInput]))
            setCurrentInput("")
        }
    }

    const addFirstHomework = todo.length === 0
        ? <li id="firstHomework" className="ps-5">Add your first homework</li>
        : null;


    return (
        <ul className="d-flex flex-column justify-content-center">
            <li>
                <input
                    className="ps-5"
                    type="text"
                    id="myInput"
                    placeholder="what needs to be done?"
                    onChange={handleChange}
                    value={currentInput}
                    onKeyDown={keyPress}
                >
                </input>
            </li>

            {addFirstHomework}

            { todo.map((item, index) => (
                    <li
                        className="ps-5 pe-3 d-flex justify-content-between align-items-center"
                        key={index}
                    >
                        {item}
                        <FontAwesomeIcon
                            id="icon"
                            onClick={() => deleteItem(index)}
                            icon={faX}
                        />
                    </li>
                ))
            }
            <div id="counterList">{todo.length} items in the list</div>

        </ul>

    )
}