import React from "react";


export const ListOfTask = (props) => {

    const {todo, deletItemApi, faX, FontAwesomeIcon} = props
    
    return (
        <React.Fragment>
            {todo.map((task, index) => (
                <li
                    className="ps-5 pe-3 d-flex justify-content-between align-items-center"
                    key={task.id }
                >
                    {task.label}
                    <FontAwesomeIcon
                        id="icon"
                        onClick={() => deletItemApi(index)}
                        icon={faX}
                    />
                </li>
            ))}
        </React.Fragment>
    )
}