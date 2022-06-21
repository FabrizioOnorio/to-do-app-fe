import React from "react";
import { ItodoItem } from "../../types";

interface IitemProps {
	todoItem: ItodoItem;
	setTodoLists: React.Dispatch<React.SetStateAction<never[]>>;
	selectedListId: string | undefined;
}

const address =
	process.env.NODE_ENV === "development" ? "http://localhost:3030" : "";

const Item = ({
	todoItem,
	setTodoLists,
	selectedListId,
}: IitemProps) => {
	const handleClick = async () => {
		const requestOptions = {
			method: "PUT",
			body: JSON.stringify({
				itemId: todoItem.itemId,
				completed: !todoItem.completed,
				itemName: todoItem.itemName,
			}),
			headers: { "Content-Type": "application/json" },
		};

		await fetch(`${address}/api/lists/todo/${selectedListId}`, requestOptions)
			.then((response) => response.json())
			.catch((error) => console.log(error.message));

		await fetch(`${address}/api/lists`)
			.then((response) => response.json())
			.then((data) => setTodoLists(data))
			.catch((error) => console.log(error.message));
	};
	return (
		<>
			<p>{todoItem.itemName}</p>
			<p>{todoItem.completed ? "true" : "false"}</p>
			<button onClick={handleClick}>Mark as Done</button>
		</>
	);
};

export default Item;
