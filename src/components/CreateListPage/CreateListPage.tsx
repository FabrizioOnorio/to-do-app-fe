import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const address =
	process.env.NODE_ENV === "development"
		? "http://localhost:3030"
		: "https://still-shore-02028.herokuapp.com";

interface ICreateListPageProps {
	setTodoLists: React.Dispatch<React.SetStateAction<never[]>>;
}

const CreateListPage = ({ setTodoLists }: ICreateListPageProps) => {
	const [listName, setListName] = useState("");
	const [disabled, setDisabled] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
    setDisabled(true);
		const newList = {
			listName,
			listId: uuidv4(),
			items: [],
		};
		const requestOptions = {
			method: "POST",
			body: JSON.stringify(newList),
			headers: { "Content-Type": "application/json" },
		};

		await fetch(`${address}/api/lists`, requestOptions)
			.then((response) => response.json())
			.catch((error) => console.log(error.message));
		setListName("");

		await fetch(`${address}/api/lists`)
			.then((response) => response.json())
			.then((data) => setTodoLists(data))
			.catch((error) => console.log(error.message));

		navigate("/");
		setDisabled(false);
	};
	return (
		<section className="createlist">
			<form className="createlist__form" onSubmit={handleSubmit}>
				<input
					className="createlist__form--input"
					placeholder="List name"
					value={listName}
					onChange={(e) => setListName(e.target.value)}
					required
				/>
				<button
					className="createlist__form--button"
					type="submit"
					disabled={disabled}
				>
					Create
				</button>
			</form>
		</section>
	);
};

export default CreateListPage;
