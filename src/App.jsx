import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./App.module.scss";
import NavBar from "./containers/NavBar";
import { getProducts, getCart } from "./services/server";
import SearchProvider from "./context/SearchContext";
import Footer from "./components/Footer";

function App() {
	// Products state stores product array locally
	const [products, setProducts] = useState([]);

	// Cart state stores product array locally
	const [cart, setCart] = useState([]);

	// Sets products state from Database
	const fetchProducts = async () => {
		setProducts(await getProducts());
	};

	// Sets cart state from Database
	const fetchCart = async () => {
		setCart(await getCart());
	};

	// Initialise products and cart on page mount
	useEffect(() => {
		fetchProducts();
		fetchCart();
	}, []);

	return (
		<SearchProvider>
			<NavBar />
			<div className={styles.App__Content}>
				<Outlet context={[products, setProducts, cart, setCart]} />
			</div>
			<Footer />
		</SearchProvider>
	);
}

export default App;
