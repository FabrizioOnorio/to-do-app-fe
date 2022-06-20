import React from "react";
import { Link } from "react-router-dom";
import { IList } from "../../types"

interface IListProps {
	list: IList;
}

const ListDiv = ({ list }: IListProps) => {
	return (
		<>
			<Link to={`/lists/${list.listId}`}>
				<p>{list.listName}</p>
			</Link>
		</>
	);
};

export default ListDiv;
