import { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/helpers.js";
import { AuthenticatedUser } from "../../common/utils/types/interfaces.js";
import * as productService from "./product.service.js";

export const createProduct = asyncHandler(
	async (req: Request, res: Response) => {
		const { name, price, stock } = req.body;

		const product = await productService.createProduct({
			name,
			price,
			stock,
			createdBy: (req.user as AuthenticatedUser).id, // attached by authenticate middleware
		});

		res.status(201).json({
			success: true,
			data: { product },
		});
	},
);

export const getAllProducts = asyncHandler(
	async (_req: Request, res: Response) => {
		const products = await productService.getAllProducts();

		res.status(200).json({
			success: true,
			count: products.length,
			data: { products },
		});
	},
);

export const updateProduct = asyncHandler(
	async (req: Request, res: Response) => {
		const { productId } = req.params;
		const data = req.body;

		const product = await productService.updateProduct(productId, data);

		res.status(200).json({
			success: true,
			data: { product },
		});
	},
);

export const deleteProduct = asyncHandler(
	async (req: Request, res: Response) => {
		const { productId } = req.params;

		await productService.deleteProduct(productId);

		res.status(200).json({
			success: true,
			message: "Product deleted successfully",
		});
	},
);
