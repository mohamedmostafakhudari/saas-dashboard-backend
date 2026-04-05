import { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/helpers.js";
import * as userService from "./user.service.js";

export const getAllUsers = asyncHandler(
	async (_req: Request, res: Response) => {
		const users = await userService.getAllUsers();

		res.status(200).json({
			success: true,
			count: users.length,
			data: { users },
		});
	},
);

export const createUser = asyncHandler(async (req: Request, res: Response) => {
	const { name, email, password, role } = req.body;

	const user = await userService.createUser(name, email, password, role);

	res.status(201).json({
		success: true,
		data: { user },
	});
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
	const { userId } = req.params;
	const data = req.body;

	const user = await userService.updateUser(userId, data);

	res.status(200).json({
		success: true,
		data: { user },
	});
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
	const { userId } = req.params;

	await userService.deleteUser(userId);

	res.status(200).json({
		success: true,
		message: "User deleted successfully",
	});
});
