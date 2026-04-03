import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../errors/app-error";

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

		// 3. Attach userId to request for use in controllers
		req.userId = decoded.id;

		next();
	} catch (error) {
		// jwt.verify throws its own errors (TokenExpiredError, JsonWebTokenError)
		// we catch them all and normalize to a clean AppError
		if (error instanceof AppError) return next(error);
		next(new AppError("Unauthorized — invalid or expired token", 401));
	}
};

export default protect;
