import { XMarkIcon } from "@heroicons/react/24/outline";
import { Product } from "../types";

type ProductCardProps = {
	product: Product | { type: string; id: string };
	removeProduct: (id: string) => void;
	handleAddProductBox: () => void;
};

const ProductCard = ({
	product,
	removeProduct,
	handleAddProductBox,
}: ProductCardProps) => {
	if ("type" in product && product.type === "add") {
		return (
			<div className="lg:w-56 lg:h-56 sm:w-48 sm:h-48 border border-gray-400 flex items-center justify-center rounded cursor-pointer">
				<p
					className="text-7xl font-thin text-center text-gray-400 self-center"
					onClick={handleAddProductBox}>
					+
				</p>
			</div>
		);
	} else if ("name" in product && product.name) {
		return (
			<div className="lg:w-56 lg:h-56 sm:w-48 sm:h-48 border border-gray-400 flex flex-col items-center justify-center p-6 cursor-pointer">
				<p className="text-1xl font-medium text-center text-black mb-4">
					{product.name}
				</p>
				<div
					className="flex items-center justify-center"
					onClick={removeProduct.bind(null, product.id)}>
					<div className="mr-2 w-5 text-red-800">
						<XMarkIcon />
					</div>
					<p className="text-md font-light text-center text-gray-600">
						{" "}
						Remove
					</p>
				</div>
			</div>
		);
	}
};

export default ProductCard;
