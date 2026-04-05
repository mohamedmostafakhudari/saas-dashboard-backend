import mongoose, { Schema } from "mongoose";
import { IProduct } from "../../common/utils/types/interfaces.js";

const productSchema = new Schema<IProduct>(
	{
		name: {
			type: String,
			required: [true, "Product name is required"],
			trim: true,
		},

		price: {
			type: Number,
			required: [true, "Product price is required"],
		},

		stock: {
			type: Number,
			required: [true, "Stock is required"],
			default: 0,
		},

		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Product must belong to a user"],
		},
	},
	{
		timestamps: true,
	},
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
