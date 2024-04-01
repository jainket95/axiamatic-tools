import { RefObject, useState } from "react";
import { Products, SelectedProduct, SelectedProducts } from "../types";
import Input from "./Input";
import Dropdown from "./Dropdown";
import { numberOfProducts as productDisplayQuantity } from "../config";

type AddProductsProps = {
	products: Products;
	selectedProducts: SelectedProducts;
	handleSelect: (id: string, type: "dropdown" | "box") => void;
	handleSearch: (searchText: string) => void;
	inputRef: RefObject<HTMLInputElement>;
};

const AddProducts = ({
	products,
	selectedProducts,
	handleSelect,
	handleSearch,
	inputRef,
}: AddProductsProps) => {
	const productSelectionLimit =
		selectedProducts.filter((p: SelectedProduct) => "name" in p && p.name)
			.length === productDisplayQuantity;

	const [search, setSearch] = useState("");
	const [showDropdown, setShowDropdown] = useState(false);

	const handleProductSearch = (inputText: string) => {
		if (productSelectionLimit) {
			alert(
				"Product selection limit has reached for current page, you can add more later on!"
			);
			return;
		}
		setSearch(inputText);
		if (inputText.length >= 1) {
			setShowDropdown(true);
		} else {
			setShowDropdown(false);
		}
		handleSearch(inputText);
	};

	const handleProductSelect = (id: string) => {
		handleSelect(id, "dropdown");
		setSearch("");
		setShowDropdown(false);
	};

	const clearSearchInputDropdown = () => {
		setSearch("");
		setShowDropdown(false);
	};

	const handleSubmitButton = async () => {
		const postDataProducts: (SelectedProduct | { id: string; name: string })[] =
			selectedProducts.map((item) => {
				if ("name" in item && item.name) {
					return {
						id: item.id,
						name: item.name,
					};
				}
				return item;
			});

		const response = await fetch("http://localhost:8080/setProducts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				products: JSON.stringify(postDataProducts),
				id: 1,
			}),
		});

		if (response.ok) {
			alert("Onboarding products saved successfully.");
		}
	};

	return (
		<div className="w-full ">
			<div className="gradient w-20 h-10 flex items-center justify-center rounded mb-6">
				<p className="font-semibold text-white text-lg">1 of 3</p>
			</div>
			<h1 className="text-3xl font-semibold mb-2">
				Let's add your internal tools
			</h1>
			<p className="text-lg font-light text-gray-400">
				Search to quickly add products your team uses today. You'll be able to
				add as many products as you need later but for now let's add four.
			</p>

			<Input
				ref={inputRef}
				search={search}
				handleSearch={handleProductSearch}
				clearSearchInputDropdown={clearSearchInputDropdown}
			/>

			<Dropdown
				showDropdown={showDropdown}
				products={products}
				handleProductSelect={handleProductSelect}
			/>

			<button
				disabled={!productSelectionLimit}
				className={`w-full h-[3rem] capitalize font-medium text-lg rounded text-white ${
					!productSelectionLimit ? "bg-blue-300" : "bg-blue-500"
				}`}
				onClick={handleSubmitButton}>
				next
			</button>
		</div>
	);
};

export default AddProducts;
