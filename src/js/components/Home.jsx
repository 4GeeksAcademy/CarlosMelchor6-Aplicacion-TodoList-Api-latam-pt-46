import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { ListOfTask } from "./ListOfTask";
import { Input } from "./Input";

const Home = () => {
	const [currentInput, setCurrentInput] = useState("");
	const [todo, setTodo] = useState([]);

	const API_URL = "https://playground.4geeks.com"
	const myUser = "CarlosMelchor6"

	const getUser = async () => {
		try {
			const response = await fetch(API_URL + `/todo/users/${myUser}`, {
				method: "GET",
				headers: {
					"Content-type": "application/json"
				},
			})
			if (response.status === 404) {
				console.log("Usuario no encontrado, creando uno nuevo");
				await createUser()
				return;
			}
			if (!response.ok) {
				console.error("Hubo un error, ", response.status);
				return;
			}

			const data = await response.json()
			setTodo(data.todos || []);

		} catch (error) {
			console.error("Error al obtener el usuario: ", error);
		}
	}
	const createUser = async () => {
		try {
			const response = await fetch(API_URL + `/todo/users/${myUser}`, {
				method: "POST",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify({ name: myUser })
			})

			if (response.status !== 201) {
				console.log("Hubo un error al crear el usuario: ", response.status)
				return
			} 
			console.log("Usuario creado con éxito");
			await getUser();
			
		} catch (error) {
			console.error("Error: ", error);
		}
	}

	const deleteUser = async () => {
		try {
			const response = await fetch(API_URL + `/todo/users/${myUser}`, {
				method: "DELETE",
				headers: {
					"Content-type": "application/json"
				},
			})

			if (!response.ok) {
				console.log("Error al eliminar el usuario: ", response.status)
				return;
			} 

			console.log("Usuario eliminado con éxito");
			await createUser()
			
		} catch (error) {
			console.error("Error, ", error);
		}
	}
	const postTodo = async (newTask) => {
		try {
			const response = await fetch(API_URL + `/todo/todos/${myUser}`, {
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
				console.log("Error al agregar tarea: ", response.status);
				return;
			}

			await getUser();
			
		} catch (error) {
			console.error("ERROR: ", error);
		}
	}
	const keyPress = async (event) => {
		if (event.key === "Enter" && currentInput.trim() !== "") {
			await postTodo(currentInput)
			setCurrentInput("")
		}
	}
	const handleChange = (event) => {
		setCurrentInput(event.target.value)
	}
	const deletItemApi = async (index) => {
		const deleteItem = todo[index]
		try {
			const response = await fetch(API_URL + `/todo/todos/${deleteItem.id}`, {
				method: "DELETE",
				headers: {
					"Content-type": "application/json"
				},
			})
			if (response.status !== 204) {
				console.log("Hubo un error: ", response.status);
			}

			await getUser();

		} catch (error) {
			console.error("ERROR: ", error);
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

					<Input
						currentInput={currentInput}
						handleChange={handleChange}
						keyPress={keyPress}
					/>

					{addFirstHomework}

					<ListOfTask
						todo={todo}
						deletItemApi={deletItemApi}
						FontAwesomeIcon={FontAwesomeIcon}
						faX={faX}
					/>
					<div id="counterList">
						{todo.length} items in the list
						<button
							type="button"
							className="btn btn-light btn-sm"
							onClick={deleteUser}
						>
							Eliminar Todas las Tareas
						</button>
					</div>
				</ul>
			</div>
		</div>
	);
};
export default Home;

