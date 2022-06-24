import React from "react";
import ListDiv from "../ListDiv/ListDiv";
import { IList } from "../../types";

interface IListsContainerProps {
	todoLists: never[];
	setTodoLists: React.Dispatch<React.SetStateAction<never[]>>;
}

const ListsContainer = ({ todoLists, setTodoLists }: IListsContainerProps) => {
	return (
		<section className="home__lists">
			{todoLists.map((list: IList) => {
				return (
					<ListDiv list={list} key={list.listId} setTodoLists={setTodoLists} />
				);
			})}
		</section>
	);
};

export default ListsContainer;
