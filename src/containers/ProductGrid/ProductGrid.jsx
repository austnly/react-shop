import styles from "./ProductGrid.module.scss";
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { Pagination } from "react-bootstrap";

const ProductGrid = ({ fav = false }) => {
	// Access Products and Search term from context
	const [products] = useOutletContext();
	const { search, setSearch } = useContext(SearchContext);

	// Set a state for Displayed Products - changes depending on search or page
	const [displayedProds, setDisplayedProds] = useState([]);

	// Page state
	const [page, setPage] = useState(1);
	// Results per page state - currently unused
	const [perPage, setPerPage] = useState(10);

	// Filters products list to smaller array to be displayed
	const filterProds = (
		products,
		page,
		perPage,
		prop,
		filter,
		max = false,
	) => {
		if (!products.length) {
			return [];
		} else {
			// Filtering products array by search
			const arrToSort = products.filter((product) =>
				product.productName
					.toLowerCase()
					.includes(filter.toLowerCase()),
			);
			// Sorting products array by property
			arrToSort.sort((a, b) => {
				if (
					a[prop].toString().toLowerCase() <
					b[prop].toString().toLowerCase()
				) {
					return -1;
				} else if (
					a[prop].toString().toLowerCase() >
					b[prop].toString().toLowerCase()
				) {
					return 1;
				} else {
					return 0;
				}
			});
			// Index of first result to display
			const startIndex = (page - 1) * perPage;

			// Returns all results if max is true, else perPage results
			return max
				? arrToSort
				: arrToSort.slice(startIndex, startIndex + perPage);
		}
	};

	// Calculate max number of pages for current filter
	const maxPages = Math.ceil(
		filterProds(products, page, perPage, "id", search, true).length /
			perPage,
	);

	// Creating Bootstrap Pagination page components array
	let items = [];
	for (let number = 1; number <= maxPages; number++) {
		items.push(
			<Pagination.Item
				key={number}
				active={number === page}
				onClick={() => {
					setPage(number);
				}}>
				{number}
			</Pagination.Item>,
		);
	}

	// Reset to first page when search term changes
	useEffect(() => {
		setPage(1);
	}, [search]);

	// Re-filter displayed products if products, search term, page #, or we are on the favourites page
	useEffect(() => {
		if (products.length && !fav) {
			setDisplayedProds(
				filterProds(products, page, perPage, "id", search),
			);
		} else if (products.length && fav) {
			setDisplayedProds(products.filter((product) => product.favourite));
		}
	}, [products, search, page, perPage, fav]);

	return (
		<div className={styles.ProductGrid}>
			{/* Alternate Titles for Grid */}
			{fav ? (
				<h4>Favourites</h4>
			) : search ? (
				<h4>Search results for "{search}"</h4>
			) : (
				<h4>All products</h4>
			)}
			{/* No pagination for favourites page */}
			{!fav && (
				<Pagination className={styles.ProductGrid__Pages}>
					{items}
				</Pagination>
			)}
			{/* Product Cards in a grid */}
			<div className={styles.ProductGrid__Grid}>
				{displayedProds.map((product) => {
					return <ProductCard key={product.id} product={product} />;
				})}
			</div>
		</div>
	);
};

export default ProductGrid;
