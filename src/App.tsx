import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import CreateListPage from "./components/CreateListPage/CreateListPage";
import ListPage from "./components/ListPage/ListPage";

const address =
	process.env.NODE_ENV === "development" ? "http://localhost:3030" : "";

const App = () => {
	const [todoLists, setTodoLists] = useState([]);
	useEffect(() => {
		fetch(`${address}/api/lists`)
			.then((response) => response.json())
			.then((data) => setTodoLists(data))
			.catch((error) => console.log(error.message));
	}, []);

	return (
		<section className="App">
			<Nav />
			<Routes>
				<Route path="/" element={<Home todoLists={todoLists} />} />
				<Route
					path="/create-list"
					element={<CreateListPage setTodoLists={setTodoLists} />}
				/>
				<Route
					path="/lists/:listId"
					element={
						<ListPage todoLists={todoLists} setTodoLists={setTodoLists} />
					}
				/>
			</Routes>
		</section>
	);
};

export default App;
