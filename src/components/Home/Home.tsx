import React from "react";
import { Link } from "react-router-dom";
import ListsContainer from "../ListsContainer/ListsContainer";

interface IHomeProps {
	todoLists: never[];
	setTodoLists: React.Dispatch<React.SetStateAction<never[]>>;
}

const Home = ({ todoLists, setTodoLists }: IHomeProps) => {
	return (
		<section className="home">
			<h1 className="home__title">Your Tasks Manager</h1>

			<Link className="home__button--create" to={"/create-list"}>
				Create a new List
			</Link>
			<ListsContainer todoLists={todoLists} setTodoLists={setTodoLists} />
		</section>
	);
};

export default Home;
