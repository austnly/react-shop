export const generateItems = () => {
	const products = [];

	// const colours = ["Red", "Blue", "Green", "Yellow", "Pink", "Purple"];

	const materials = ["Cotton", "Wool", "Denim", "Linen", "Nylon", "Leather"];

	const clothes = ["Shirt", "Scarf", "Pants", "Shorts", "Socks", "Hat"];

	const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

	// colours.forEach((colour) => {
	materials.forEach((material) => {
		clothes.forEach((clothing) => {
			products.push({
				productName: `${material} ${clothing}`,
				price: (Math.random() * 100).toFixed(2),
				variants: sizes,
				quantities: sizes.reduce((acc, size) => {
					acc[size] = Math.floor(Math.random() * 100);
					return acc;
				}, {}),
				imageUrl: `/react-shop/images/${clothing.toLowerCase()}.jpg`,
				favourite: false,
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer maximus dolor est, consectetur commodo tortor sagittis nec. Aliquam non laoreet odio, tincidunt pulvinar justo.",
			});
		});
	});
	// });

	return products;
};
