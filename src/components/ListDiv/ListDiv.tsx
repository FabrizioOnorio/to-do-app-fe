import React from "react";
import { Link } from "react-router-dom";
import { IList } from "../../types";
import { RiDeleteBin6Line } from "react-icons/ri";

interface IListProps {
	list: IList;
	setTodoLists: React.Dispatch<React.SetStateAction<never[]>>;
}

const address =
	process.env.NODE_ENV === "development"
		? "http://localhost:3030"
		: "https://still-shore-02028.herokuapp.com";

const ListDiv = ({ list, setTodoLists }: IListProps) => {
	const handleClick = async (event: React.FormEvent) => {
		event.stopPropagation();
		await fetch(`${address}/api/lists/${list.listId}`, { method: "DELETE" })
			.then((response) => response)
			.catch((error) => console.log(error.message));

		await fetch(`${address}/api/lists`)
			.then((response) => response.json())
			.then((data) => setTodoLists(data))
			.catch((error) => console.log(error.message));
	};

	return (
		<section className="home__list">
			<Link to={`/lists/${list.listId}`} className="home__list--name">
				<section>
					<p>{list.listName}</p>
				</section>
			</Link>
			<RiDeleteBin6Line onClick={handleClick} className="home__list--delete" />
		</section>
	);
};

export default ListDiv;
