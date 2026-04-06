import { Router } from "express";
import protect from "../../common/middleware/auth.middleware.js";
import authorize from "../../common/middleware/authorize.middleware.js";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	updateProduct,
} from "./product.controller.js";

const router = Router();

router.use(protect);
router.use(authorize("admin"));

router.get("/", getAllProducts);
router.post("/", createProduct);
router.patch("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

export default router;
