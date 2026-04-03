import type { Request, Response } from "express";

export function list(req: Request, res: Response): void {
	res.json({ success: true, module: "user", requesterId: req.userId, data: [] });
}

export function getById(req: Request, res: Response): void {
	res.json({ success: true, module: "user", id: req.params.id });
}

export function create(req: Request, res: Response): void {
	res.status(201).json({ success: true, module: "user", created: true });
}

export function update(req: Request, res: Response): void {
	res.json({ success: true, module: "user", id: req.params.id, updated: true });
}

export function remove(req: Request, res: Response): void {
	res.json({ success: true, module: "user", id: req.params.id, deleted: true });
}
