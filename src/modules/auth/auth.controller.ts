import { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/helpers.js";
import * as authService from "./auth.service.js";

export const register = asyncHandler(async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	const user = await authService.register(name, email, password);

	res.status(201).json({
		success: true,
		data: { user },
	});
});

export const login = asyncHandler(async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const { token, user } = await authService.login(email, password);

	res.status(200).json({
		success: true,
		data: { token, user },
	});
});
