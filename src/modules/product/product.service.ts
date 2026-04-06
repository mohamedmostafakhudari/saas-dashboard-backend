import { AppError } from "../../common/errors/app-error.js";
import {
	CreateProductData,
	IProduct,
	UpdateProductData,
} from "../../common/utils/types/interfaces.js";
import Product from "./product.model.js";

export const createProduct = async (
	data: CreateProductData,
): Promise<IProduct> => {
	const product = await Product.create(data);
	return product;
};

export const getAllProducts = async (): Promise<IProduct[]> => {
	return Product.find().populate("createdBy", "-password");
};

export const updateProduct = async (
	productId: string,
	data: UpdateProductData,
): Promise<IProduct> => {
	const product = await Product.findByIdAndUpdate(productId, data, {
		returnDocument: "after", // return updated document
		runValidators: true, // enforce schema rules on update
	});

	if (!product) throw new AppError("Product not found", 404);

	return product;
};

export const deleteProduct = async (productId: string): Promise<void> => {
	const product = await Product.findByIdAndDelete(productId);
	if (!product) throw new AppError("Product not found", 404);
};
