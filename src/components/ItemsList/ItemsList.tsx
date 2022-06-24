import React, { useState } from "react";
import { ItodoItem } from "../../types";
import Item from "../Item/Item";

interface IItemsListProps {
	todoItems: ItodoItem[] | undefined;
	doneTodoItems: ItodoItem[] | undefined;
	setTodoLists: React.Dispatch<React.SetStateAction<never[]>>;
	selectedListId: string | undefined;
}

const ItemsList = ({
	todoItems,
	doneTodoItems,
	setTodoLists,
	selectedListId,
}: IItemsListProps) => {
	const [oldTodos, setOldTodos] = useState(false);
	const [search, setSearch] = useState("");
	const searchResults = todoItems?.filter((todo) =>
		todo.itemName.includes(search)
	);
	const handleClick = () => {
		setOldTodos(!oldTodos);
	};

	return (
		<>
			<section className="itemsList">
				<input
					className="listItems__filter"
					placeholder="filter..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				{searchResults?.map((todoItem: ItodoItem) => {
					return (
						<Item
							key={todoItem.itemId}
							todoItem={todoItem}
							setTodoLists={setTodoLists}
							selectedListId={selectedListId}
						/>
					);
				})}
			</section>
			<button onClick={handleClick} className="itemsList--hide">
				{oldTodos ? "Hide" : "View"} Old Todos
			</button>
			<section
				style={{ display: oldTodos ? "block" : "none" }}
				className="itemsList__done"
			>
				{doneTodoItems?.map((todoItem: ItodoItem) => {
					return (
						<Item
							key={todoItem.itemId}
							todoItem={todoItem}
							setTodoLists={setTodoLists}
							selectedListId={selectedListId}
						/>
					);
				})}
			</section>
		</>
	);
};

export default ItemsList;
