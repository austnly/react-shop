import React from "react";
import {
	Container,
	Navbar,
	Nav,
	Form,
	FormControl,
	Button,
} from "react-bootstrap";

const NavBar = () => {
	return (
		<Navbar bg="light" expand="md">
			<Container fluid>
				<Navbar.Brand href="/react-shop/">shop de mo.</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="navbarScroll">
					<Nav className="me-auto">
						<Nav.Link href="/react-shop/">Home</Nav.Link>
						<Nav.Link href="/react-shop/products">
							Products
						</Nav.Link>
						<Nav.Link href="/react-shop/cart">Cart</Nav.Link>
					</Nav>
					<Form className="d-flex">
						<FormControl
							type="search"
							placeholder="Search"
							className="me-2"
							aria-label="Search"
						/>
						<Button variant="outline-success">Search</Button>
					</Form>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;
