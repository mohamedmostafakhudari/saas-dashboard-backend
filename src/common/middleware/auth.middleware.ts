import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../modules/user/user.model.js";
import { AppError } from "../errors/app-error.js";
import { JwtPayload } from "../utils/types/interfaces.js";

const protect = async (
	req: Request,
	_res: Response,
	next: NextFunction,
): Promise<void> => {
	try {
		// 1. Extract token from "Authorization: Bearer <token>"
		const authHeader = req.headers.authorization;
		if (!authHeader?.startsWith("Bearer ")) {
			throw new AppError("Unauthorized — no token provided", 401);
		}

		const token = authHeader.split(" ")[1];

		// 2. Verify token
		const secret = process.env.JWT_SECRET;
		if (!secret) throw new AppError("JWT_SECRET is not defined", 500);

		const decoded = jwt.verify(token, secret) as JwtPayload;
		const userId = decoded.id;
		if (typeof userId !== "string" || !userId) {
			throw new AppError("Unauthorized — invalid token payload", 401);
		}

		// 3. Load user from DB (password field is not selected on this model)
		const user = await User.findById(userId);
		if (!user) {
			throw new AppError("Unauthorized — user not found", 401);
		}

		req.user = {
			id: user._id.toString(),
			name: user.name,
			email: user.email,
			role: user.role,
		};

		next();
	} catch (error) {
		// jwt.verify throws its own errors (TokenExpiredError, JsonWebTokenError)
		// we catch them all and normalize to a clean AppError
		if (error instanceof AppError) return next(error);
		next(new AppError("Unauthorized — invalid or expired token", 401));
	}
};

export default protect;
