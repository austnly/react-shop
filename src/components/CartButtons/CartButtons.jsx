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
import { Badge, Button } from "react-bootstrap";

const CartButtons = ({ product, variant, quantity }) => {
	const [products, setProducts, cart, setCart] = useOutletContext();
	console.log("CartButtons Rendering");

	const handleReduce = async () => {
		console.log("ID", product.id, "Variant", variant);
		await reduceCart(product.id, variant, 1);
		setCart(await getCart());
		setProducts(await getProducts());
	};
	const handleRemove = async () => {
		console.log("ID", product.id, "Variant", variant);
		await reduceCart(product.id, variant, quantity);
		setCart(await getCart());
		setProducts(await getProducts());
	};

	const handleIncrease = async () => {
		console.log("Product", product, "Variant", variant);
		await addToCart(product, variant);
		setCart(await getCart());
		setProducts(await getProducts());
	};

	return (
		<div className={styles.CartButtons}>
			<h6>{variant}</h6>
			<Button
				variant="secondary"
				onClick={handleReduce}
				className={styles.CartButtons_Btn}>
				-
			</Button>
			<input type="text" value={quantity} disabled />
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
