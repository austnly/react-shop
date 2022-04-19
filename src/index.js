import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./containers/Home";
import ProductPage from "./containers/ProductPage";
import Cart from "./containers/Cart";
import ProductGrid from "./containers/ProductGrid";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

library.add(faHeart);
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
	<BrowserRouter basename="/react-shop">
		<Routes>
			<Route path="/" element={<App />}>
				<Route index element={<Home />} />
				<Route path="cart" element={<Cart />} />
				<Route path="products" element={<ProductGrid />} />
				<Route path="products/:productId" element={<ProductPage />} />
				<Route path="favourites" element={<ProductGrid fav={true} />} />
			</Route>
		</Routes>
	</BrowserRouter>,
);
