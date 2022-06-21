import React, { useState } from "react";
import { ItodoItem } from "../../types";
import Filter from "../Filter/Filter";
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
  const handleClick = () => {
    setOldTodos(!oldTodos);
  };
	return (
		<>
			<section>
				<p>To do:</p>
				<Filter todoItems={todoItems} />
				{todoItems?.map((todoItem: ItodoItem) => {
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
			<button onClick={handleClick}>
				{oldTodos ? "Hide" : "View"} Old Todos
			</button>

			<section style={{ display: oldTodos ? "block" : "none" }}>
				<p>Done:</p>
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
