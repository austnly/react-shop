import styles from "./CartButtons.module.scss";
import { useOutletContext } from "react-router-dom";
import {
	reduceCart,
	addToCart,
	getCart,
	getProducts,
} from "../../services/server.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

const CartButtons = ({ product, variant, quantity }) => {
	const [products, setProducts, cart, setCart] = useOutletContext();

	// Increase cart quantity by 1 and refetch cart, products
	const handleIncrease = async () => {
		await addToCart(product, variant);
		setCart(await getCart());
		setProducts(await getProducts());
	};

	// Reduce cart quantity by 1 and refetch cart, products
	const handleReduce = async () => {
		await reduceCart(product.id, variant, 1);
		setCart(await getCart());
		setProducts(await getProducts());
	};

	// Remove variant from cart and refetch cart, products
	const handleRemove = async () => {
		await reduceCart(product.id, variant, quantity);
		setCart(await getCart());
		setProducts(await getProducts());
	};

	return (
		<div className={styles.CartButtons}>
			<h6 className={styles.CartButtons__Heading}>{variant}</h6>
			<Button
				variant="secondary"
				onClick={handleReduce}
				className={styles.CartButtons_Btn}>
				-
			</Button>
			<input
				type="text"
				value={quantity}
				disabled
				className={styles.CartButtons__Qty}
			/>
			<Button
				variant="secondary"
				onClick={handleIncrease}
				className={styles.CartButtons_Btn}>
				+
			</Button>

			<Button
				variant="danger"
				onClick={handleRemove}
				className={styles.CartButtons_Btn}>
				<FontAwesomeIcon icon={faTrash} />
			</Button>
		</div>
	);
};

export default CartButtons;
