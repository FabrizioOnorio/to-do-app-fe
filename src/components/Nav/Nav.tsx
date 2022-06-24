import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {

	return (
		<nav className="navbar">
			<Link className="navbar__link" to="/">Home</Link>
		</nav>
	);
};

export default Nav;
