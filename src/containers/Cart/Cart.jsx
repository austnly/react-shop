import { useOutletContext } from "react-router-dom";
import styles from "./Cart.module.scss";
import CartCard from "./../../components/CartCard";

const Cart = () => {
	const [products, setProducts, cart, setCart] = useOutletContext();

	// Calculate total of items in cart
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
			<h3 className={styles.Cart__Heading}>Cart Items</h3>
			{!cart.length ? (
				<p>Your cart is empty. Get shopping!</p>
			) : (
				cart.map((item, index) => {
					return <CartCard key={index} product={item} />;
				})
			)}
			<div className={styles.Cart__Divider}></div>
			<h3 className={styles.Cart__Total}>Total: ${total}</h3>
		</div>
	);
};

export default Cart;
