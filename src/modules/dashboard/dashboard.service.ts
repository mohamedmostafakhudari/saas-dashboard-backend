import { DashboardStats } from "../../common/utils/types/interfaces.js";
import Product from "../product/product.model.js";
import User from "../user/user.model.js";

export const getStats = async (): Promise<DashboardStats> => {
	const [totalUsers, totalProducts] = await Promise.all([
		User.countDocuments(),
		Product.countDocuments(),
	]);

	return { totalUsers, totalProducts };
};
