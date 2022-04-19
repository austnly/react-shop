import SearchBar from "../../components/SearchBar";
import styles from "./NavBar.module.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { Container, Navbar, Nav } from "react-bootstrap";

const NavBar = () => {
	const { search, setSearch } = useContext(SearchContext);

	// Reset search term on page change
	const handleReset = () => {
		setSearch("");
	};

	return (
		<Navbar bg="light" expand="md">
			<Container fluid className={styles.NavBar}>
				<Navbar.Brand href="/react-shop/">shop dé mo.</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse
					id="navbarScroll"
					className={styles.NavBar__List}>
					<Nav
						justify="true"
						className={styles.NavBar__List_Links + " ms-auto"}>
						<Link to="/" onClick={handleReset}>
							Home
						</Link>
						<Link to="/products" onClick={handleReset}>
							Products
						</Link>
						<Link to="/favourites" onClick={handleReset}>
							Favourites
						</Link>
						<Link to="/cart" onClick={handleReset}>
							Cart
						</Link>
					</Nav>
					<SearchBar />
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;
