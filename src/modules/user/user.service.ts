import { AppError } from "../../common/errors/app-error.js";
import {
	IUser,
	PaginatedUsers,
	PaginationParams,
	UpdateUserData,
} from "../../common/utils/types/interfaces.js";
import User from "./user.model.js";

// ─── Get All Users (Paginated) ─────────────────────────────────────────────────
export const getAllUsers = async (
	params: PaginationParams = {},
): Promise<PaginatedUsers> => {
	const MAX_LIMIT = 50;

	// Safely parse and clamp values
	const page = Math.max(1, Number(params.page) || 1);
	const limit = Math.min(MAX_LIMIT, Math.max(1, Number(params.limit) || 20));
	const skip = (page - 1) * limit;

	// Run both queries in parallel
	const [users, total] = await Promise.all([
		User.find().select("-password").skip(skip).limit(limit),
		User.countDocuments(),
	]);

	const totalPages = Math.ceil(total / limit);

	return {
		users,
		pagination: {
			total,
			page,
			limit,
			totalPages,
			hasNext: page < totalPages,
			hasPrev: page > 1,
		},
	};
};

export const createUser = async (
	name: string,
	email: string,
	password: string,
	role: "admin" | "user" = "user",
): Promise<IUser> => {
	const existing = await User.findOne({ email });
	if (existing) throw new AppError("Email is already in use", 409);

	const user = await User.create({ name, email, password, role });

	// Return user without password
	user.password = undefined!;
	return user;
};

export const updateUser = async (
	userId: string,
	data: UpdateUserData,
): Promise<IUser> => {
	const user = await User.findByIdAndUpdate(userId, data, {
		returnDocument: "after", // return the updated document
		runValidators: true, // enforce schema rules on update
	}).select("-password");

	if (!user) throw new AppError("User not found", 404);

	return user;
};

export const deleteUser = async (userId: string): Promise<void> => {
	const user = await User.findByIdAndDelete(userId);
	if (!user) throw new AppError("User not found", 404);
};
