import styles from "./CartButtons.module.scss";
import { useOutletContext } from "react-router-dom";
import {
	reduceCart,
	addToCart,
	getCart,
	getProducts,
} from "../../services/server.js";

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
			<button onClick={handleReduce}>-</button>
			<p>
				{variant} - {quantity}
			</p>
			<button onClick={handleIncrease}>+</button>
			<button onClick={handleRemove}>del</button>
		</div>
	);
};

export default CartButtons;
