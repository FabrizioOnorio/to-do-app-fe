import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const address =
	process.env.NODE_ENV === "development" ? "http://localhost:3030" : "";

interface ICreateListPageProps {
	setTodoLists: React.Dispatch<React.SetStateAction<never[]>>;
}

const CreateListPage = ({ setTodoLists }: ICreateListPageProps) => {
	const [listName, setListName] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const newList = {
			listName,
			listId: uuidv4(),
		};
		const requestOptions = {
			method: "POST",
			body: JSON.stringify(newList),
			headers: { "Content-Type": "application/json" },
		};

		await fetch(`${address}/api/lists`, requestOptions)
			.then((response) => response.json())
			.catch((error) => console.log(error.message));
		setListName("");

		await fetch(`${address}/api/lists`)
			.then((response) => response.json())
			.then((data) => setTodoLists(data))
			.catch((error) => console.log(error.message));

		navigate("/");
	};
	return (
		<>
			<p>Here you can create your List</p>
			<form onSubmit={handleSubmit}>
				<input
					placeholder="List name"
					value={listName}
					onChange={(e) => setListName(e.target.value)}
					required
				/>
				<button type="submit">Create</button>
			</form>
		</>
	);
};

export default CreateListPage;