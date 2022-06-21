import React from "react";
import { IList } from "../../types";
import AdditemsForm from "../AddItemsForm/AddItemsForm";
import ItemsList from "../ItemsList/ItemsList";

interface IListPageProps {
	todoLists: IList[];
	setTodoLists: React.Dispatch<React.SetStateAction<never[]>>;
}

const ListPage = ({ todoLists, setTodoLists }: IListPageProps) => {
	const selectedListId = window.location.href.split("/").pop();
	const selectedList = todoLists.find(
		(lists: IList) => lists.listId === selectedListId
	);

	const todoObject = todoLists.find(
		(lists: IList) => lists.listId === selectedListId
	);

	const todoItems = todoObject?.items.filter((todo) => todo.completed === false);

	const doneTodoItems = todoObject?.items.filter(
		(todo) => todo.completed === true
	);

	return (
		<>
			<AdditemsForm
				selectedListId={selectedListId}
				setTodoLists={setTodoLists}
			/>
			<h3>{selectedList?.listName}:</h3>
			<ItemsList
				todoItems={todoItems}
				doneTodoItems={doneTodoItems}
				selectedListId={selectedListId}
				setTodoLists={setTodoLists}
			/>
		</>
	);
};

export default ListPage;
