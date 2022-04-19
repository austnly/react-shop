import ProductCarousel from "../../components/ProductCarousel";
import ProductGrid from "../ProductGrid";
import styles from "./Home.module.scss";
import { React, useContext, useEffect } from "react";
import { SearchContext } from "../../context/SearchContext";

const Home = () => {
	const { search, setSearch } = useContext(SearchContext);

	useEffect(() => {
		setSearch("");
	}, []);

	return (
		<div className={styles.Home}>
			<ProductCarousel />
			<ProductGrid />
		</div>
	);
};

export default Home;
