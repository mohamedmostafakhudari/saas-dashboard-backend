import { Request, Response } from "express";
import { asyncHandler } from "../../common/utils/helpers.js";
import * as dashboardService from "./dashboard.service.js";

export const getStats = asyncHandler(async (_req: Request, res: Response) => {
	const stats = await dashboardService.getStats();

	res.status(200).json({
		success: true,
		data: { stats },
	});
});
