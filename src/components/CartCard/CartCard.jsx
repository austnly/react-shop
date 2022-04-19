import { Link, useOutletContext } from "react-router-dom";
import styles from "./CartCard.module.scss";
import React from "react";
import { useState, useEffect } from "react";
import { reduceCart } from "../../services/server.js";
import CartButtons from "../CartButtons/CartButtons";

const CartCard = ({ product }) => {
	const [products, setProducts, cart, setCart] = useOutletContext();
	console.log("CartCard Rendering");

	// const handleReduce = async () => {
	// 	reduceCart(product.id);
	// };

	return (
		<div className={styles.CartCard}>
			<Link to={`/products/${product.id}`}>
				<img src={product.imageUrl} alt="" />
			</Link>
			<div className={styles.CartCard__Info}>
				<Link to={`/products/${product.id}`}>
					<h5>{product.productName}</h5>
				</Link>
				<p className={styles.CartCard__Price}>${product.price} each</p>

				{Object.entries(product.quantities)
					.sort(
						(a, b) =>
							product.variants.indexOf(a[0]) -
							product.variants.indexOf(b[0]),
					)
					.filter(([size, quant]) => quant > 0)
					.map(([size, quant], index) => {
						return (
							// <></>
							<CartButtons
								key={index}
								product={product}
								variant={size}
								quantity={quant}
							/>
						);
					})}
				<p className={styles.CartCard__Subtotal}>
					Subtotal: $
					{(
						Object.values(product.quantities).reduce(
							(acc, value) => acc + value,
							0,
						) * product.price
					).toFixed(2)}
				</p>
			</div>
		</div>
	);
};

export default CartCard;
