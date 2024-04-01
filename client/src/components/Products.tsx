import { Product, SelectedProducts } from "../types";
import ProductCard from "./ProductCard";

type ProductProps = {
	products: SelectedProducts;
	removeProduct: (id: string, type: "dropdown" | "box") => void;
	handleAddProductBox: () => void;
};

const Products = ({
	products,
	removeProduct,
	handleAddProductBox,
}: ProductProps) => {
	return (
		<div className="flex lg:flex-col items-center justify-evenly md:w-full md:flex-col-reverse sm:w-full sm:flex-col-reverse">
			<div className="flex flex-wrap items-center justify-evenly md:gap-32 sm:gap-14">
				{products.map((product: Product | { type: string; id: string }) => (
					<ProductCard
						key={product.id}
						product={product}
						removeProduct={removeProduct}
						handleAddProductBox={handleAddProductBox}
					/>
				))}
			</div>
			<p
				className={`font-normal text-lg text-gray-400 m-10 ${
					products.length ? "block" : "hidden"
				}`}>
				{products.length} products added
			</p>
		</div>
	);
};

export default Products;
