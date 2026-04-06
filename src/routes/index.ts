import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
	res.json({ success: true, message: "API is running 🚀" });
});

// router.use("/products", productRoutes);

export default router;
