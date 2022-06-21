import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface IAdditemsFormProps {
	selectedListId: string | undefined;
	setTodoLists: React.Dispatch<React.SetStateAction<never[]>>;
}

const address =
	process.env.NODE_ENV === "development" ? "http://localhost:3030" : "";

const AdditemsForm = ({ selectedListId, setTodoLists }: IAdditemsFormProps) => {
	const [newItem, setNewItem] = useState("");

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const newItemAdded = {
			itemName: newItem,
			itemId: uuidv4(),
			completed: false,
		};

		const requestOptions = {
			method: "PUT",
			body: JSON.stringify(newItemAdded),
			headers: { "Content-Type": "application/json" },
		};

		await fetch(`${address}/api/lists/${selectedListId}`, requestOptions)
			.then((response) => response.json())
			.catch((error) => console.log(error.message));
		setNewItem("");

		await fetch(`${address}/api/lists`)
			.then((response) => response.json())
			.then((data) => setTodoLists(data))
			.catch((error) => console.log(error.message));
	};
	return (
		<form onSubmit={handleSubmit}>
			<input
				placeholder="add todo"
				value={newItem}
				onChange={(e) => setNewItem(e.target.value)}
				required
			/>
			<button type="submit">Enter</button>
		</form>
	);
};

export default AdditemsForm;
