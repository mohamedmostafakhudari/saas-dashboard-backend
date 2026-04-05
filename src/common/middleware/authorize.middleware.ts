import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app-error.js";

const authorize = (...roles: string[]) => {
	return (req: Request, _res: Response, next: NextFunction): void => {
		if (!req.user) {
			return next(new AppError("Unauthorized — authentication required", 401));
		}
		if (!roles.includes(req.user.role)) {
			return next(new AppError("Forbidden — you do not have permission", 403));
		}
		next();
	};
};

export default authorize;
