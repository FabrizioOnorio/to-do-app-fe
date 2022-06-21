import React, { useState } from "react";
import { ItodoItem } from "../../types";

interface IFilter {
	todoItems: ItodoItem[] | undefined;
}

const Filter = ({ todoItems }: IFilter) => {
	const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
    const searchResults = todoItems?.filter(todo => todo.itemName === search);
    console.log(searchResults);
	};
  console.log(search)
	return (
		<>
			<input
				placeholder="filter..."
				value={search}
				onChange={handleChange}
			/>
		</>
	);
};

export default Filter;
