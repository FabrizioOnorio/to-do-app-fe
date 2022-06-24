import React, { useState } from "react";
import { ItodoItem } from "../../types";
import AddSubTask from "../AddSubTask/AddSubTask";
import SubTaskList from "../SubtTaskList/SubTaskList";

interface IitemProps {
	todoItem: ItodoItem;
	setTodoLists: React.Dispatch<React.SetStateAction<never[]>>;
	selectedListId: string | undefined;
}

const address =
	process.env.NODE_ENV === "development"
		? "http://localhost:3030"
		: "https://still-shore-02028.herokuapp.com";

const Item = ({ todoItem, setTodoLists, selectedListId }: IitemProps) => {
	const [addSubTask, setAddSubTask] = useState(false);
	const handleClick = async () => {
		const requestOptions = {
			method: "PUT",
			body: JSON.stringify({
				itemId: todoItem.itemId,
				completed: !todoItem.completed,
				itemName: todoItem.itemName,
				subTasks: todoItem.subTasks,
			}),
			headers: { "Content-Type": "application/json" },
		};

		await fetch(`${address}/api/lists/todo/${selectedListId}`, requestOptions)
			.then((response) => response)
			.catch((error) => console.log(error.message));

		await fetch(`${address}/api/lists`)
			.then((response) => response.json())
			.then((data) => setTodoLists(data))
			.catch((error) => console.log(error.message));
	};

	const handleClickSubTask = () => {
		setAddSubTask(!addSubTask);
	};
	return (
		<section className="item">
			<p>
				{todoItem.itemName} - total costs: {todoItem.totalCost} - item cost:{" "}
				{todoItem.itemCost}
			</p>
			<button onClick={handleClick}>Mark as Done</button>
			<button onClick={handleClickSubTask}>Add Sub-Task</button>
			<section style={{ display: addSubTask ? "" : "none" }}>
				<AddSubTask
					selectedListId={selectedListId}
					todoItem={todoItem}
					setTodoLists={setTodoLists}
				/>
			</section>
			<SubTaskList
				todoItem={todoItem}
				setTodoLists={setTodoLists}
				selectedListId={selectedListId}
			/>
		</section>
	);
};

export default Item;
