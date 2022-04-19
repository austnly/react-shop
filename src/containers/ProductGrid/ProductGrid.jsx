import styles from "./ProductGrid.module.scss";
import { useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { Pagination } from "react-bootstrap";

const ProductGrid = ({ fav = false }) => {
	const [products] = useOutletContext();

	const [displayedProds, setDisplayedProds] = useState([]);

	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	const { search, setSearch } = useContext(SearchContext);
	console.log("PG: Search term is", search);

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
			console.log("Search Filter:", search);
			const arrToSort = products.filter((product) =>
				product.productName
					.toLowerCase()
					.includes(filter.toLowerCase()),
			);
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
			const startIndex = (page - 1) * perPage;
			// console.log(arrToSort);

			return max
				? arrToSort
				: arrToSort.slice(startIndex, startIndex + perPage);
		}
	};

	const maxPages = Math.ceil(
		filterProds(products, page, perPage, "id", search, true).length /
			perPage,
	);

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

	useEffect(() => {
		console.log("Search ProductGrid");
		if (products.length && !fav) {
			setDisplayedProds(
				filterProds(products, page, perPage, "id", search),
			);
		} else if (products.length && fav) {
			setDisplayedProds(products.filter((product) => product.favourite));
		}
	}, [products, search, page, perPage]);

	useEffect(() => {
		console.log(displayedProds);
	}, [displayedProds]);

	useEffect(() => {
		setPage(1);
	}, [search]);

	return (
		<div className={styles.ProductGrid}>
			{fav ? (
				<h4>Favourites</h4>
			) : search ? (
				<h4>Search results for "{search}"</h4>
			) : (
				<h4>All products</h4>
			)}
			{!fav && (
				<Pagination className={styles.ProductGrid__Pages}>
					{items}
				</Pagination>
			)}
			<div className={styles.ProductGrid__Grid}>
				{displayedProds.map((product) => {
					return <ProductCard key={product.id} product={product} />;
				})}
			</div>
		</div>
	);
};

export default ProductGrid;
