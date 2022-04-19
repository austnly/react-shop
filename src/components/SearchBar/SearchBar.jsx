import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../../context/SearchContext";
import styles from "./SearchBar.module.scss";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, Button } from "react-bootstrap";

const SearchBar = () => {
	const { search, setSearch } = useContext(SearchContext);

	const [input, setInput] = useState("");

	const handleInput = (e) => {
		setInput(e.target.value);
	};

	const handleSearch = (e) => {
		e.preventDefault();
		setSearch(input);
		setInput("");
		navigate("/products");
	};

	const navigate = useNavigate();

	// useEffect(() => {
	// 	console.log("Search term is", search);
	// 	navigate("/products");
	// }, [search]);

	return (
		// <form className="d-flex" onSubmit={handleSearch}>
		// 	<FormControl
		// 		type="text"
		// 		placeholder="Search"
		// 		className="me-2"
		// 		aria-label="Search"
		// 		onChange={handleInput}
		// 		value={input}
		// 	/>
		// 	<Button variant="outline-success">Search</Button>
		// </form>
		<form className={styles.SearchBar} onSubmit={handleSearch}>
			<input
				type="text"
				className={styles.SearchBar__Input + " me-2"}
				placeholder="Search"
				onChange={handleInput}
				value={input}
			/>
			<Button variant="outline-success" onClick={handleSearch}>
				Search
			</Button>
			{/* <input type="submit" value="Search" /> */}
		</form>
	);
};

export default SearchBar;
