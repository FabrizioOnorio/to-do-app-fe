import React from "react";
import { Link } from "react-router-dom";
import ListsContainer from "../ListsContainer/ListsContainer";

interface IHomeProps {
	todoLists: never[];
}

const Home = ({ todoLists }: IHomeProps) => {
	return (
		<>
			<h1>Tasks Manager</h1>
			<p>Add a new List</p>
			<Link to={"/create-list"}>Create a new List</Link>
			<ListsContainer todoLists={todoLists} />
		</>
	);
};

export default Home;
