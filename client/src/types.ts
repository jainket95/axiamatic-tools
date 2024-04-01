export type Product = {
	id: string;
	name: string;
	isSelected: boolean;
};

export type Products = Product[];

export type EmptyProductBox = {
	id: string;
	type: "add";
};
export type EmptyProductBoxes = EmptyProductBox[];

export type SelectedProduct = Product | EmptyProductBox;
export type SelectedProducts = Products | EmptyProductBoxes;
