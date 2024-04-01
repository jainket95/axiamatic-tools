import "./App.css";
import Header from "./components/Header";
import Products from "./components/Products";
import AddProducts from "./components/AddProducts";
import {
	products as productsData,
	emptyProductCard,
	generateRandom,
} from "./config";
import { MouseEvent, useEffect, useRef, useState } from "react";
import {
	Product as ProductSchema,
	Products as ProductsSchema,
	SelectedProduct,
	SelectedProducts,
} from "./types";

function App() {
	const [products, setProducts] = useState<ProductsSchema>(productsData);
	const [searchProducts, setSearchProducts] =
		useState<ProductsSchema>(productsData);
	const [selectedProducts, setSelectedProducts] = useState<SelectedProducts>(
		emptyProductCard(products)
	);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (selectedProducts.length === 0) fetchOnboardingProducts();
	}, []);

	const fetchOnboardingProducts = async () => {
		const response = await fetch("http://localhost:8080/getProducts", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();

		const selectedProducts = products.map((product: ProductSchema) => {
			const check = data.products.findIndex(
				(p: { id: string; name: string }) => p.id === product.id
			);

			if (check !== -1) {
				return { ...product, isSelected: true };
			}
			return product;
		});

		setProducts(selectedProducts);
		setSelectedProducts(
			selectedProducts.filter((product) => product.isSelected)
		);
	};

	const handleProductSearch = (searchText: string) => {
		setSearchProducts(() =>
			products.filter((p: ProductSchema) =>
				p.name.toLowerCase().includes(searchText.toLowerCase())
			)
		);
	};

	const handleProductToggle = (id: string, type: "dropdown" | "box") => {
		const toggledProducts = products.map((p: ProductSchema) =>
			p.id === id
				? { ...p, isSelected: type === "box" ? !p.isSelected : true }
				: p
		);
		setProducts(toggledProducts);

		if (type === "box") {
			const tempSelectedProducts = [...selectedProducts];
			const productIndex = tempSelectedProducts.findIndex(
				(p: SelectedProduct) => p.id === id
			);

			tempSelectedProducts.splice(productIndex, 1, {
				id: generateRandom(8),
				type: "add",
			});

			setSelectedProducts(tempSelectedProducts as SelectedProducts);
		} else {
			const tempSelectedProducts = [...selectedProducts];

			const boxIndex = tempSelectedProducts.findIndex(
				(p: SelectedProduct) => "type" in p && p.type === "add"
			);

			const toggledProduct = toggledProducts.find((p) => p.id === id);

			if (toggledProduct)
				tempSelectedProducts.splice(boxIndex, 1, toggledProduct);

			setSelectedProducts(tempSelectedProducts as SelectedProducts);
		}
	};

	const handleAddProductBox = () => {
		inputRef.current?.focus();
		inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
	};

	const handleDropDownClose = (e: MouseEvent) => {
		e.preventDefault();
		document.getElementById("dropdown")?.classList.add("hidden");
	};

	return (
		<div
			className="container mx-auto w-[100vw] h-[100vh] overflow-hidden"
			onClick={handleDropDownClose}>
			<Header />

			<div className="flex lg:flex-row sm:flex-col-reverse items-center justify-center w-full h-full sm:pt-[12.5rem] md:pt-[12.5rem] md:items-start">
				<div className="w-full sm:pb-14 md:pb-14 lg:w-2/3 lg:mr-10 lg:pb-0">
					<Products
						products={selectedProducts}
						removeProduct={handleProductToggle}
						handleAddProductBox={handleAddProductBox}
					/>
				</div>
				<div className="w-full sm:mb-14 sm:mt-[18rem] md:mb-14 lg:mb-14 md:mt-[24rem] lg:mt-0 lg:w-1/3 md:w-2/3 lg:flex lg:items-center lg:mr-10">
					<AddProducts
						products={searchProducts}
						selectedProducts={selectedProducts}
						handleSelect={handleProductToggle}
						handleSearch={handleProductSearch}
						inputRef={inputRef}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
