import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./App.module.scss";
import NavBar from "./containers/NavBar";
import { getProducts, getCart } from "./services/server";
import SearchProvider from "./context/SearchContext";
import Footer from "./components/Footer";

function App() {
	const [products, setProducts] = useState([]);

	const [cart, setCart] = useState([]);

	const fetchProducts = async () => {
		setProducts(await getProducts());
		console.log("Fetching Products");
	};

	const fetchCart = async () => {
		setCart(await getCart());
		console.log("Fetching Cart");
	};

	useEffect(() => {
		fetchProducts();
		fetchCart();
	}, []);

	useEffect(() => {
		console.log("Products", products);
	}, [products]);

	useEffect(() => {
		console.log("Cart", cart);
		// refetch live inventory when cart changes
	}, [cart]);

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
