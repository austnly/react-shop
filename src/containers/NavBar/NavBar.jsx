import SearchBar from "../../components/SearchBar";
import styles from "./NavBar.module.scss";
import { Link } from "react-router-dom";
import Logo from "../../components/Logo";
import { useState, useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { Container, Navbar, Nav } from "react-bootstrap";

const NavBar = () => {
	const { search, setSearch } = useContext(SearchContext);

	const handleReset = () => {
		setSearch("");
	};

	return (
		<Navbar bg="light" expand="md">
			<Container fluid className={styles.NavBar}>
				<Navbar.Brand href="/react-shop/">shop de mo.</Navbar.Brand>
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
		// <div className={styles.NavBar}>
		// 	<Logo />
		// 	<ul className={styles.NavBar__List}>
		// 		<Link to="/" onClick={handleReset}>
		// 			<li>Home</li>
		// 		</Link>
		// 		<Link to="/products" onClick={handleReset}>
		// 			<li>Products</li>
		// 		</Link>
		// 		<Link to="/cart" onClick={handleReset}>
		// 			<li>Cart</li>
		// 		</Link>
		// 	</ul>
		// 	<SearchBar />
		// </div>
	);
};

export default NavBar;
