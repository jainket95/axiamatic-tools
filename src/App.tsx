import "./App.css";
import Header from "./components/Header";
import Products from "./components/Products";
import AddProducts from "./components/AddProducts";
import productsData from "./config";
import { useRef, useState } from "react";
import { Product as ProductSchema, Products as ProductsSchema } from "./types";

const numberOfProducts: number = 4;

function App() {
	const [products, setProducts] = useState<ProductsSchema>(productsData);
	const [searchProducts, setSearchProducts] =
		useState<ProductsSchema>(productsData);

	const inputRef = useRef<HTMLInputElement>(null);

	const handleProductSearch = (searchText: string) => {
		setSearchProducts(() =>
			products.filter((p: ProductSchema) =>
				p.name.toLowerCase().includes(searchText.toLowerCase())
			)
		);
	};

	const handleProductToggle = (id: string) => {
		const selectedProducts = products.map((p: ProductSchema) =>
			p.id === id ? { ...p, isSelected: !p.isSelected } : p
		);
		setProducts(selectedProducts);
	};

	const handleAddProductBox = () => {
		inputRef.current?.focus();
		inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
	};

	const selectedProducts = products.filter((product) => product.isSelected);

	return (
		// <div className="container mx-auto w-[100vw] h-[100vh]">
		// 	<Header />

		// 	<div className="lg:flex :flex-row lg:items-center lg:justify-center w-full h-full lg:flex-col-reverse md:flex-col-reverse sm:flex-col-reverse md:items-start sm:items-start md:pt-[12.5rem] sm:pt-[12.5rem] lg:pt-0">
		// 		<div className="lg:w-2/3 lg:mr-10 md:mr-2 md:w-full lg:pb-0  md:pb-14 sm:mr-2 sm:w-full sm:pb-14">
		// 			<Products
		// 				products={selectedProducts}
		// 				removeProduct={handleProductToggle}
		// 				productDisplayQuantity={numberOfProducts}
		// 				handleAddProductBox={handleAddProductBox}
		// 			/>
		// 		</div>
		// 		<div className="lg:w-1/3 h-full lg:flex lg:items-center md:w-2/3 lg:mr-10 lg:mb-0 lg:mt-0 md:mb-14 md:mt-[21rem] sm:w-2/3 sm:mb-14 sm:mt-[10rem]">
		// 			<AddProducts
		// 				products={searchProducts}
		// 				handleSelect={handleProductToggle}
		// 				handleSearch={handleProductSearch}
		// 				productDisplayQuantity={numberOfProducts}
		// 				inputRef={inputRef}
		// 			/>
		// 		</div>
		// 	</div>
		// </div>
		<div className="container mx-auto w-[100vw] h-[100vh]">
			<Header />

			<div className="flex lg:flex-row sm:flex-col-reverse items-center justify-center w-full h-full sm:pt-[12.5rem] md:pt-[12.5rem]  md:items-start">
				<div className="w-full  sm:pb-14 md:pb-14 lg:w-2/3 lg:mr-10 lg:pb-0">
					<Products
						products={selectedProducts}
						removeProduct={handleProductToggle}
						productDisplayQuantity={numberOfProducts}
						handleAddProductBox={handleAddProductBox}
					/>
				</div>
				<div className="w-full sm:mb-14 sm:mt-[18rem] md:mb-14 lg:mb-14 md:mt-[24rem] lg:mt-0 lg:w-1/3 md:w-2/3 lg:flex lg:items-center lg:mr-10">
					<AddProducts
						products={searchProducts}
						handleSelect={handleProductToggle}
						handleSearch={handleProductSearch}
						productDisplayQuantity={numberOfProducts}
						inputRef={inputRef}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
