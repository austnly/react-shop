import { Link, useOutletContext } from "react-router-dom";
import styles from "./ProductCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as filledHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as unfilledHeart } from "@fortawesome/free-regular-svg-icons";
import { favProduct, getProducts } from "../../services/server";
import { Button, Card, Badge } from "react-bootstrap";

const ProductCard = ({ product }) => {
	const [products, setProducts, cart, setCart] = useOutletContext();

	const handleFav = async () => {
		await favProduct(product.id, true);
		setProducts(await getProducts());
	};
	const handleUnfav = async () => {
		await favProduct(product.id, false);
		setProducts(await getProducts());
	};

	return (
		// <div className={styles.ProductCard}>
		// 	<Link to={`/products/${product.id}`}>
		// 		<img src={product.imageUrl} alt="" />
		// 	</Link>
		// 	<p>{product.productName}</p>
		// 	<h4>${product.price}</h4>
		// 	{product.favourite ? (
		// 		<FontAwesomeIcon icon={filledHeart} onClick={handleUnfav} />
		// 	) : (
		// 		<FontAwesomeIcon icon={unfilledHeart} onClick={handleFav} />
		// 	)}

		// </div>

		<Card className={styles.ProductCard}>
			<div className={styles.ProductCard__Img_Container}>
				<Link to={`/products/${product.id}`}>
					<Card.Img
						variant="top"
						src={product.imageUrl}
						className={styles.ProductCard__Img}
					/>
				</Link>
				{/* <Button
					variant="light"
					className={styles.ProductCard__Img_Container_Heart}> */}
				{product.favourite ? (
					<FontAwesomeIcon
						icon={filledHeart}
						onClick={handleUnfav}
						className={styles.ProductCard__Img_Container_Heart}
					/>
				) : (
					<FontAwesomeIcon
						icon={unfilledHeart}
						onClick={handleFav}
						className={styles.ProductCard__Img_Container_Heart}
					/>
				)}
				{/* </Button> */}
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
