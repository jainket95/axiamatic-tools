import { CheckIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { Product, Products } from "../types";

type DropdownProps = {
	showDropdown: boolean;
	products: Products;
	handleProductSelect: (id: string) => void;
};

type DropdownItemsProps = {
	product: Product;
	handleProductSelect: (id: string) => void;
};

const DropdownItem = ({ product, handleProductSelect }: DropdownItemsProps) => {
	return (
		<div
			key={product.id}
			className={`relative w-full h-12 mb-1 rounded-md text-black flex items-center pl-3 cursor-pointer ${
				product.isSelected && "bg-blue-500 text-white"
			}`}
			onClick={handleProductSelect.bind(null, product.id)}>
			<div className="w-6 mr-3">
				<PhotoIcon />
			</div>
			<p className="font-normal text-md ">{product.name}</p>
			{product.isSelected && (
				<div className="absolute top-[0.7rem] right-4 w-6">
					<CheckIcon />
				</div>
			)}
		</div>
	);
};

const Dropdown = ({
	showDropdown,
	products,
	handleProductSelect,
}: DropdownProps) => {
	return (
		<div
			id="dropdown"
			className={`relative ${showDropdown ? "block" : "hidden"}`}>
			<div className="absolute -top-1 left-0 w-full border rounded-md border-gray-300 flex flex-col items-start bg-white">
				{products.map((product) => (
					<DropdownItem
						key={product.id}
						product={product}
						handleProductSelect={handleProductSelect}
					/>
				))}
			</div>
		</div>
	);
};

export default Dropdown;
