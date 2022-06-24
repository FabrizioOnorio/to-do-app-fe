import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ItodoItem } from "../../types";

interface IAddSubTask {
	selectedListId: string | undefined;
	setTodoLists: React.Dispatch<React.SetStateAction<never[]>>;
	todoItem: ItodoItem;
}

const address =
	process.env.NODE_ENV === "development"
		? "http://localhost:3030"
		: "https://still-shore-02028.herokuapp.com";

const AddSubTask = ({
	selectedListId,
	todoItem,
	setTodoLists,
}: IAddSubTask) => {
	const [newSubTask, setNewSubTask] = useState("");
	const [newSubTaskCost, setNewSubTaskCost] = useState("");

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const newSubTaskCostNumber = Number(newSubTaskCost);
		const newSubTaskAdded = {
			subTaskName: newSubTask,
			subTaskId: uuidv4(),
			completed: false,
			itemId: todoItem.itemId,
			subTaskCost: newSubTaskCostNumber,
		};

		const subTasksArray = todoItem.subTasks;
		subTasksArray.push(newSubTaskAdded);
		const newTotal = todoItem.subTasks.reduce(
			(prev, curr) => prev + curr.subTaskCost,
			0
		);
		todoItem.totalCost = newTotal;

		const requestOptions = {
			method: "PUT",
			body: JSON.stringify(todoItem),
			headers: { "Content-Type": "application/json" },
		};

		await fetch(`${address}/api/lists/todo/${selectedListId}`, requestOptions)
			.then((response) => response)
			.catch((error) => console.log(error.message));
		setNewSubTask("");
		setNewSubTaskCost("");

		await fetch(`${address}/api/lists`)
			.then((response) => response.json())
			.then((data) => setTodoLists(data))
			.catch((error) => console.log(error.message));
	};
	return (
		<form onSubmit={handleSubmit}>
			<input
				placeholder="add todo"
				value={newSubTask}
				onChange={(e) => setNewSubTask(e.target.value)}
				required
			/>
			<input
				placeholder="add cost in $"
				value={newSubTaskCost}
				onChange={(e) => setNewSubTaskCost(e.target.value)}
				type="number"
			/>
			<button type="submit">Enter</button>
		</form>
	);
};

export default AddSubTask;
