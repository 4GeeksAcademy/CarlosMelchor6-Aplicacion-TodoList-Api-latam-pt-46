import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
	const [currentInput, setCurrentInput] = useState("");
	const [todo, setTodo] = useState([]);

	const API_URL = "https://playground.4geeks.com"

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
			setTodo(body.todos)

		} catch (error) {
			console.log("Error: ", error);
		}
	}



	const postTodo = async (newTask) => {
		try {
			const response = await fetch(API_URL + '/todo/todos/CarlosMelchor6', {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					label: newTask,
					is_done: false,
				})
			})
			if (response.status !== 201) {
				console.log("Hubo un error: ", response.status);
				return null
			}
			const body = await response.json()
			setTodo((prev) => [...prev, body])
		} catch (error) {
			console.log("ERROR: ", error);
		}
	}
	const keyPress = async (event) => {
		if (event.key === "Enter" && currentInput.trim() !== "") {
			await postTodo(currentInput)
			setCurrentInput("")
		}
	}
	const handleChange = (event) => {
		setCurrentInput(event.target.value
		)
	}



	const deletItemApi = async (index) => {
		const deleteItem = todo[index]
		try { 
			const response = await fetch (API_URL + `/todo/todos/${deleteItem.id}`,{
				method: "DELETE",
				headers: {
					"Content-type": "application/json"
				},
			})
			if (response.status !== 204) {
				console.log("Hubo un error: ", response.status);
			}
			setTodo(todo.filter((_, i) => i !== index))
		} catch (error) {
			console.log("ERROR: ", error);
		}
	}



	const addFirstHomework = todo.length === 0
		? <li id="firstHomework" className="ps-5">Add your first homework</li>
		: null;


		
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
							value={currentInput}
							onChange={handleChange}
							onKeyDown={keyPress}
						>
						</input>
					</li>
					{addFirstHomework}

					{todo.map((task, index) => (
						<li
							className="ps-5 pe-3 d-flex justify-content-between align-items-center"
							key={index}
						>
							{task.label}
							<FontAwesomeIcon
								id="icon"
								onClick={() => deletItemApi(index)}
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