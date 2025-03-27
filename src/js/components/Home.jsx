import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
	const [currentInput, setCurrentInput] = useState("");
	const [todo, setTodo] = useState([]);

	const API_URL = "https://playground.4geeks.com"


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


	const getUser = async () => {
		try {
			const response = await fetch(API_URL + '/todo/users/CarlosMelchor6', {
				method: "GET",
				headers: {
					"Content-type": "Application/json"
				},
			})

			if (response.status !== 200) {
				console.log("Hubo un error, ", response.status);
			}
			const body = await response.json()
			const { todos } = body
			setTodo(todos)

		} catch (error) {
			console.log("Error: ", error);
		}
	}


	useEffect(() => {
		getUser()
	}, [])

	return (
		<div className="container w-50">
			<div id="row" className="row d-flex jutify-content-center ">
				<h2 className="d-flex justify-content-center" >TARE LIST</h2>
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

					{todo.map((todos, index) => (
						<li
							className="ps-5 pe-3 d-flex justify-content-between align-items-center"
							key={index}
						>
							{todos.label}
							<FontAwesomeIcon
								id="icon"
								onClick={() => deleteItem(index)}
								icon={faX}
							/>
						</li>
					))}

					<div id="counterList">{todo.length} items in the list</div>
				</ul>
			</div>
		</div>
	);
};
export default Home;