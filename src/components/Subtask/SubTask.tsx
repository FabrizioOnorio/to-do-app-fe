import React from "react";
import { MdOutlineDone, MdRemoveDone } from "react-icons/md";
import { ISubTaskAdded, ItodoItem } from "../../types";

interface ISubTaskProps {
	subTask: ISubTaskAdded;
	setTodoLists: React.Dispatch<React.SetStateAction<never[]>>;
	todoItem: ItodoItem;
	selectedListId: string | undefined;
}

const address =
	process.env.NODE_ENV === "development"
		? "http://localhost:3030"
		: "https://still-shore-02028.herokuapp.com";

const Subtask = ({
	setTodoLists,
	subTask,
	todoItem,
	selectedListId,
}: ISubTaskProps) => {
	const handleClick = async () => {
		const markedAsDone = {
			subTaskName: subTask.subTaskName,
			subTaskId: subTask.subTaskId,
			completed: !subTask.completed,
			itemId: subTask.itemId,
			subTaskCost: subTask.subTaskCost,
		};
		const clickedSubTaskIndex = todoItem.subTasks.findIndex(
			(x) => x.subTaskId === subTask.subTaskId
		);
		todoItem.subTasks.splice(clickedSubTaskIndex, 1, markedAsDone);
		const requestOptions = {
			method: "PUT",
			body: JSON.stringify(todoItem),
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
	return (
		<section className={subTask.completed ? "subTask--undone" : "subTask"}>
			<p>
				{subTask.subTaskName} - sub task cost: {subTask.subTaskCost}
			</p>
			<MdOutlineDone
				onClick={handleClick}
				className="item--done"
				style={{ display: subTask.completed ? "none" : "" }}
			/>
			<MdRemoveDone
				onClick={handleClick}
				className="item--done"
				style={{ display: subTask.completed ? "" : "none" }}
			/>
		</section>
	);
};

export default Subtask;
