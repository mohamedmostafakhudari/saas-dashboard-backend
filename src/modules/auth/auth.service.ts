import bcrypt from "bcrypt";
import { AppError } from "../../common/errors/app-error.js";
import { generateToken, sanitizeUser } from "../../common/utils/helpers.js";
import { AuthUser, LoginResult } from "../../common/utils/types/interfaces.js";
import User from "../user/user.model.js";

export const register = async (
	name: string,
	email: string,
	password: string,
): Promise<AuthUser> => {
	const existingUser = await User.findOne({ email });
	if (existingUser) throw new AppError("Email is already in use", 409);

	const user = await User.create({ name, email, password });

	return sanitizeUser(user);
};

export const login = async (
	email: string,
	password: string,
): Promise<LoginResult> => {
	// .select('+password') overrides select:false on the password field
	const user = await User.findOne({ email }).select("+password");
	if (!user) throw new AppError("Invalid email or password", 401);

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) throw new AppError("Invalid email or password", 401);

	const token = generateToken(user._id.toString());

	return { token, user: sanitizeUser(user) };
};
