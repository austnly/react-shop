import firestore from "../firebase";
import { generateItems } from "./data";

export const seedProducts = async () => {
	const collectionRef = firestore.collection("products");

	const data = await collectionRef.get();

	if (data.empty) {
		console.log("Seeding students");
		const seedData = generateItems();

		const addPromises = seedData.map(async (item) => {
			return await collectionRef.add(item);
		});

		await Promise.all(addPromises);
	}
};

export const addToCart = async (product, variant) => {
	const collectionRef = firestore.collection("cart");
	const { id, quantities, ...info } = product;

	const available = await reduceInventory(id, variant);
	if (available) {
		let cartProd = (await collectionRef.doc(id).get()).data();

		cartProd
			? (cartProd.quantities[variant] += 1)
			: (cartProd = {
					...info,
					quantities: product.variants.reduce((acc, size) => {
						size === variant ? (acc[size] = 1) : (acc[size] = 0);
						return acc;
					}, {}),
			  });

		await collectionRef.doc(product.id).set({ ...cartProd });
	} else {
		console.log("Stock unavailable");
	}
};

// Read
export const getProducts = async () => {
	await seedProducts();
	const collectionRef = firestore.collection("products");
	const collection = await collectionRef.get();
	const docsArray = collection.docs;
	const products = docsArray.map((doc) => {
		return { id: doc.id, ...doc.data() };
	});
	return products;
};

export const getCart = async () => {
	const collectionRef = firestore.collection("cart");
	const collection = await collectionRef.get();
	const docsArray = collection.docs;
	const products = docsArray.map((doc) => {
		return { id: doc.id, ...doc.data() };
	});
	return products;
};

// Update
export const reduceInventory = async (productId, variant) => {
	const collectionRef = firestore.collection("products");
	const docRef = collectionRef.doc(productId);
	const doc = (await docRef.get()).data();
	const newInv = { ...doc["quantities"] };
	if (newInv[variant] > 0) {
		newInv[variant] -= 1;
		await docRef.set({ quantities: newInv }, { merge: true });
		console.log("Updated doc:", (await docRef.get()).data());
		return true;
	} else {
		return false;
	}
};

export const incrInventory = async (productId, variant, amount) => {
	const collectionRef = firestore.collection("products");
	const docRef = collectionRef.doc(productId);
	const doc = (await docRef.get()).data();
	const newInv = { ...doc["quantities"] };
	newInv[variant] += amount;
	await docRef.set({ quantities: newInv }, { merge: true });
	console.log("Updated doc added 1 to", variant, (await docRef.get()).data());
};

export const reduceCart = async (productId, variant, amount) => {
	const collectionRef = firestore.collection("cart");
	const docRef = collectionRef.doc(productId);
	const doc = (await docRef.get()).data();
	console.log("Attempting to reduce cart for", doc);
	const newQuant = { ...doc["quantities"] };
	if (newQuant[variant] > 0) {
		newQuant[variant] -= amount;
		await docRef.set({ quantities: newQuant }, { merge: true });
		console.log("Updated cart item:", (await docRef.get()).data());
		await incrInventory(productId, variant, amount);
	}
	const remainingItems = Object.entries(newQuant).filter(
		([size, quant]) => quant > 0,
	);
	if (remainingItems.length === 0) {
		await rmFromCart(productId);
		console.log("Item removed from cart");
	}
};

export const favProduct = async (productId, bool) => {
	const collectionRef = firestore.collection("products");
	const docRef = collectionRef.doc(productId);
	await docRef.set({ favourite: bool }, { merge: true });
};

// Delete
export const rmFromCart = async (productId) => {
	const docRef = firestore.collection("cart").doc(productId);
	await docRef.delete();
};
