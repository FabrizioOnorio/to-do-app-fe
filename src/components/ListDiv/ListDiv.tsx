import React from "react";
import { Link } from "react-router-dom";
import { IList } from "../../types";

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
		<>
			<Link className="home__list--name" to={`/lists/${list.listId}`}>
				<section className="home__list">
					<p>{list.listName}</p>
				</section>
			</Link>
			<button onClick={handleClick}>Delete</button>
		</>
	);
};

export default ListDiv;
