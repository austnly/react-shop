import { Link, useOutletContext } from "react-router-dom";
import styles from "./ProductCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as filledHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as unfilledHeart } from "@fortawesome/free-regular-svg-icons";
import { favProduct, getProducts } from "../../services/server";
import { Card } from "react-bootstrap";

const ProductCard = ({ product }) => {
	const [products, setProducts, cart, setCart] = useOutletContext();

	// Change favourite status in DB and fetch products after change
	const handleFav = async () => {
		await favProduct(product.id, !product.favourite);
		setProducts(await getProducts());
	};

	return (
		<Card className={styles.ProductCard}>
			<div className={styles.ProductCard__Img_Container}>
				{/* Product Thumbnail */}
				<Link to={`/products/${product.id}`}>
					<Card.Img
						variant="top"
						src={product.imageUrl}
						className={styles.ProductCard__Img_Container_Thumb}
					/>
				</Link>
				{/* Product Like Button */}
				{product.favourite ? (
					<FontAwesomeIcon
						icon={filledHeart}
						onClick={handleFav}
						className={styles.ProductCard__Img_Container_Heart}
					/>
				) : (
					<FontAwesomeIcon
						icon={unfilledHeart}
						onClick={handleFav}
						className={styles.ProductCard__Img_Container_Heart}
					/>
				)}
			</div>
			<Card.Body className={styles.ProductCard__Info}>
				<Link to={`/products/${product.id}`}>
					<Card.Title>{product.productName}</Card.Title>
				</Link>
				<Link to={`/products/${product.id}`}>
					<Card.Text>${product.price}</Card.Text>
				</Link>
			</Card.Body>
		</Card>
	);
};

export default ProductCard;
