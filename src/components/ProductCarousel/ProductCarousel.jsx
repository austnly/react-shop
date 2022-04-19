import styles from "./ProductCarousel.module.scss";
import Carousel from "react-bootstrap/Carousel";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";

const ProductCarousel = () => {
	const { search, setSearch } = useContext(SearchContext);

	// Custom search handler for each featured category
	const handleFeatureSearch = (productType) => {
		setSearch(productType);
		navigate("/products");
	};

	const navigate = useNavigate();

	return (
		<Carousel className={styles.ProductCarousel}>
			<Carousel.Item>
				<img
					className="d-block w-100"
					src="/react-shop/images/hat-banner.jpg"
					alt="First slide"
					onClick={() => {
						handleFeatureSearch("hat");
					}}
				/>
				<Carousel.Caption>
					<h3>Featured Hat</h3>
					<p>
						Nulla vitae elit libero, a pharetra augue mollis
						interdum.
					</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img
					className="d-block w-100"
					src="/react-shop/images/pants-banner.jpg"
					alt="Second slide"
					onClick={() => {
						handleFeatureSearch("hat");
					}}
				/>

				<Carousel.Caption>
					<h3>Featured Pants</h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img
					className="d-block w-100"
					src="/react-shop/images/murray-banner.jpg"
					alt="Third slide"
					onClick={() => {
						handleFeatureSearch("hat");
					}}
				/>

				<Carousel.Caption>
					<h3>Featured Shirt</h3>
					<p>
						Praesent commodo cursus magna, vel scelerisque nisl
						consectetur.
					</p>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
};

export default ProductCarousel;
