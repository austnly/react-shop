import ProductCarousel from "../../components/ProductCarousel";
import ProductGrid from "../ProductGrid";
import styles from "./Home.module.scss";
import { React } from "react";

const Home = () => {
	return (
		<div className={styles.Home}>
			<ProductCarousel />
			<ProductGrid />
		</div>
	);
};

export default Home;
