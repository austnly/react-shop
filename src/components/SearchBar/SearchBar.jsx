import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import styles from "./SearchBar.module.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const SearchBar = () => {
	const { search, setSearch } = useContext(SearchContext);

	// Input state to track search input
	const [input, setInput] = useState("");

	// Input changes as text is entered
	const handleInput = (e) => {
		setInput(e.target.value);
	};

	// Search term set as input, and page redirected to results on submit
	const handleSearch = (e) => {
		e.preventDefault();
		setSearch(input);
		setInput("");
		navigate("/products");
	};

	const navigate = useNavigate();

	return (
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
		</form>
	);
};

export default SearchBar;
