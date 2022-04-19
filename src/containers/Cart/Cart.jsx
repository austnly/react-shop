import { useOutletContext } from "react-router-dom";
import styles from "./Cart.module.scss";
import CartCard from "./../../components/CartCard";

const Cart = () => {
	const [products, setProducts, cart, setCart] = useOutletContext();
	console.log("Cart Page Cart:", cart);

	const total = cart
		.reduce((acc, item) => {
			return (
				acc +
				Object.values(item.quantities).reduce(
					(acc, number) => acc + number * item.price,
					0,
				)
			);
		}, 0)
		.toFixed(2);

	return (
		<div className={styles.Cart}>
			{cart.map((item, index) => {
				return <CartCard key={index} product={item} />;
			})}
			<h3>Total: ${total}</h3>
		</div>
	);
};

export default Cart;

// Handle a separate card collection on the database
// Need to trigger changes in stock based on Cart
