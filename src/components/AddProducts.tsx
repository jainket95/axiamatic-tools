import { RefObject, useState } from "react";
import { Products } from "../types";
import Input from "./Input";
import Dropdown from "./Dropdown";

type AddProductsProps = {
	products: Products;
	handleSelect: (id: string) => void;
	handleSearch: (searchText: string) => void;
	productDisplayQuantity: number;
	inputRef: RefObject<HTMLInputElement>;
};

const AddProducts = ({
	products,
	handleSelect,
	handleSearch,
	productDisplayQuantity,
	inputRef,
}: AddProductsProps) => {
	const productSelectionLimit =
		products.filter((products) => products.isSelected).length ===
		productDisplayQuantity;
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
		handleSelect(id);
		setSearch("");
		setShowDropdown(false);
	};

	const clearSearchInputDropdown = () => {
		setSearch("");
		setShowDropdown(false);
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
				disabled={productSelectionLimit || search.length === 0}
				className={`w-full h-[3rem] capitalize font-medium text-lg rounded text-white bg-blue-500 ${
					productSelectionLimit ? "bg-blue-400" : "bg-blue-500"
				}`}>
				next
			</button>
		</div>
	);
};

export default AddProducts;
