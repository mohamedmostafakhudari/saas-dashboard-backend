import { AppError } from "../../common/errors/app-error.js";
import { IUser, UpdateUserData } from "../../common/utils/types/interfaces.js";
import User from "./user.model.js";

export const getAllUsers = async (): Promise<IUser[]> => {
	return User.find().select("-password");
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
