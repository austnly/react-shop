import { useOutletContext, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./ProductPage.module.scss";
import {
	addToCart,
	getCart,
	getProducts,
	favProduct,
} from "../../services/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as filledHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as unfilledHeart } from "@fortawesome/free-regular-svg-icons";
import { Button } from "react-bootstrap";

const ProductPage = () => {
	const { productId } = useParams();
	console.log(productId);

	const [products, setProducts, cart, setCart] = useOutletContext();

	console.log("product page prods", products);

	const [current, setCurrent] = useState({});
	const [variant, setVariant] = useState("none");
	const [inStock, setInStock] = useState(null);

	useEffect(() => {
		if (products.length > 0)
			setCurrent(
				products.find((product) => {
					return product.id == productId;
				}),
			);
	}, [products]);

	// const checkStock = () => {
	// 	if (products.length > 0) {
	// 		if (current?.["quantities"]?.[variant] > 0) {
	// 			setInStock(true);
	// 		} else {
	// 			setInStock(false);
	// 		}
	// 	}
	// };

	// useEffect(() => {
	// 	checkStock();
	// }, [variant, cart]);

	// useEffect(() => {
	// 	console.log("In Stock?", inStock);
	// }, [inStock]);

	// const handleAdd = () => {
	// 	const { quantities, variants, ...productInfo } = current;

	// 	// Look for item with same ID in cart and copy into new Object
	// 	const cartItem = {
	// 		...cart.find((product) => product.id === productInfo.id),
	// 	};

	// 	const newCart = [...cart];
	// 	const itemIdx = cart.findIndex(
	// 		(product) => product.id === productInfo.id,
	// 	);

	// 	// If item exists then check the variants
	// 	if (cartItem["id"]) {
	// 		// If the selected variant is not in the cart
	// 		if (!cartItem.variants.includes(variant)) {
	// 			// Copy variants to new array
	// 			const variantsArr = [...cartItem.variants];
	// 			// Add variant to array
	// 			variantsArr.push(variant);
	// 			// Copy new array to cartItem
	// 			cartItem.variants = [...variantsArr];
	// 		}
	// 		// Add 1 to cart item quantity
	// 		cartItem["quantities"][variant] += 1;

	// 		// Add to new cart array
	// 		newCart[itemIdx] = cartItem;
	// 		setCart(newCart);
	// 	} else {
	// 		const quants = variants.reduce((acc, size) => {
	// 			acc[size] = 0;
	// 			return acc;
	// 		}, {});
	// 		quants[variant] = 1;

	// 		const newItem = {
	// 			...productInfo,
	// 			variants: [variant],
	// 			quantities: { ...quants },
	// 		};

	// 		newCart.push(newItem);
	// 		setCart(newCart);
	// 	}
	// };

	// Change to DB cart to be set directly

	const handleAddCart = async () => {
		await addToCart(current, variant);
		setCart(await getCart());
		setProducts(await getProducts());
	};

	const handleVariant = (e) => {
		console.log("Variant selected: ", e.target.value);
		setVariant(e.target.value);
	};

	const handleFav = async () => {
		await favProduct(current.id, true);
		setProducts(await getProducts());
	};
	const handleUnfav = async () => {
		await favProduct(current.id, false);
		setProducts(await getProducts());
	};

	return (
		<div className={styles.ProductPage}>
			<img
				src={current.imageUrl}
				alt={current.productName}
				className={styles.ProductPage__Img}
			/>
			<div className={styles.ProductPage__InfoBox}>
				<h3>{current.productName}</h3>
				<p>${current.price}</p>
				<div>
					{current.favourite ? (
						<FontAwesomeIcon
							icon={filledHeart}
							onClick={handleUnfav}
						/>
					) : (
						<FontAwesomeIcon
							icon={unfilledHeart}
							onClick={handleFav}
						/>
					)}
				</div>
				{current?.["quantities"]?.[variant] > 0 ? (
					<p>{current["quantities"][variant]} In Stock</p>
				) : variant === "none" ? (
					<></>
				) : (
					<p>Out of Stock</p>
				)}
				<select
					name="variant"
					id="variant"
					defaultValue={"none"}
					onChange={handleVariant}
					required>
					<option disabled value="none">
						None
					</option>
					{current.variants ? (
						current.variants.map((variant, index) => {
							return (
								<option key={index} value={variant}>
									{variant}
								</option>
							);
						})
					) : (
						<></>
					)}
				</select>
				<Button
					variant="outline-success"
					onClick={handleAddCart}
					disabled={variant === "none"}>
					Add to Cart
				</Button>
				{/* <button onClick={handleAddCart} disabled={variant === "none"}>
					Add to Cart
				</button> */}
			</div>
		</div>
	);
};

export default ProductPage;
