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
		<section className="listPage">
      <h3 className="listPage__title">{selectedList?.listName}</h3>
			<AdditemsForm
				selectedListId={selectedListId}
				setTodoLists={setTodoLists}
			/>
			<ItemsList
				todoItems={todoItems}
				doneTodoItems={doneTodoItems}
				selectedListId={selectedListId}
				setTodoLists={setTodoLists}
			/>
		</section>
	);
};

export default ListPage;
