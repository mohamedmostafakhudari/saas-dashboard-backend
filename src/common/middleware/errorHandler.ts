import { NextFunction, Request, Response } from "express";
import type { AppErrorI } from "../errors/app-error.js";

export const errorHandler = (
	err: AppErrorI,
	_req: Request,
	res: Response,
	_next: NextFunction,
): void => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error";

	res.status(statusCode).json({
		success: false,
		statusCode,
		message,
	});
};
