import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ISubTaskAdded } from "../../types";


interface IAdditemsFormProps {
	selectedListId: string | undefined;
	setTodoLists: React.Dispatch<React.SetStateAction<never[]>>;
}

const address =
	process.env.NODE_ENV === "development"
		? "http://localhost:3030"
		: "https://still-shore-02028.herokuapp.com";

const AdditemsForm = ({ selectedListId, setTodoLists }: IAdditemsFormProps) => {
	const [newItem, setNewItem] = useState("");
	const [newItemCost, setNewItemCost] = useState("");

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
    const newTaskCostNumber = Number(newItemCost);
    const subTasksArray: ISubTaskAdded[] = [];
		const newItemAdded = {
			itemName: newItem,
			itemId: uuidv4(),
			completed: false,
			subTasks: subTasksArray,
			itemCost: newTaskCostNumber,
			totalCost: 0,
		};

		const requestOptions = {
			method: "PUT",
			body: JSON.stringify(newItemAdded),
			headers: { "Content-Type": "application/json" },
		};

		await fetch(`${address}/api/lists/${selectedListId}`, requestOptions)
			.then((response) => response)
			.catch((error) => console.log(error.message));
		setNewItem("");
		setNewItemCost("");

		await fetch(`${address}/api/lists`)
			.then((response) => response.json())
			.then((data) => setTodoLists(data))
			.catch((error) => console.log(error.message));
	};
	return (
		<form onSubmit={handleSubmit} className="addtask__form">
			<input
				className="addtask__form--input"
				placeholder="add todo"
				value={newItem}
				onChange={(e) => setNewItem(e.target.value)}
				required
			/>
			<input
				className="addtask__form--input"
				placeholder="add cost in $"
				value={newItemCost}
				onChange={(e) => setNewItemCost(e.target.value)}
				type="number"
			/>
			<button type="submit" className="addtask__form--button">
				Enter
			</button>
		</form>
	);
};

export default AdditemsForm;
