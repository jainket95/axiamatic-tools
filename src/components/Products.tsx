import { Product, Products } from "../types";
import ProductCard from "./ProductCard";

type ProductProps = {
	products: Products;
	removeProduct: (id: string) => void;
	productDisplayQuantity: number;
	handleAddProductBox: () => void;
};

const Products = ({
	products,
	removeProduct,
	productDisplayQuantity,
	handleAddProductBox,
}: ProductProps) => {
	const emptyProductCard = Array.from(
		{
			length: productDisplayQuantity - products.length,
		},
		(_, i) => i + 1
	).map((id) => ({ type: "add", id: String(id) }));

	const newProducts = [...products, ...emptyProductCard];

	return (
		<div className="flex lg:flex-col items-center justify-evenly md:w-full md:flex-col-reverse sm:w-full sm:flex-col-reverse">
			<div className="flex flex-wrap items-center justify-evenly md:gap-32 sm:gap-14">
				{newProducts.map((product: Product | { type: string; id: string }) => (
					<ProductCard
						key={product.id}
						product={product}
						removeProduct={removeProduct}
						handleAddProductBox={handleAddProductBox}
					/>
				))}
			</div>
			<p
				className={`font-normal text-lg text-gray-400 mb-10 ${
					products.length ? "block" : "hidden"
				}`}>
				{products.length} products added
			</p>
		</div>
	);
};

export default Products;
