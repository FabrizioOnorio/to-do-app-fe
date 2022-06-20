import React from "react";
import { IList } from "../../types";

interface IListPageProps {
	todoLists: IList[];
}

const ListPage = ({ todoLists }: IListPageProps) => {
  const selectedListId = window.location.href.split('/').pop();
  const selectedList = todoLists.find(
		(lists: IList) => lists.listId === selectedListId
	);
	return <p>{selectedList?.listName}</p>;
};

export default ListPage;
