import React from "react";
import ListDiv from "../ListDiv/ListDiv";
import { IList } from "../../types";

interface IListsContainerProps {
	todoLists: never[];
}

const ListsContainer = ({ todoLists }: IListsContainerProps) => {
	return (
		<>
			{todoLists.map((list: IList) => {
				return <ListDiv list={list} key={list.listId} />;
			})}
		</>
	);
};

export default ListsContainer;
