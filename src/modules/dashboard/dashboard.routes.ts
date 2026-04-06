import { Router } from "express";
import protect from "../../common/middleware/auth.middleware.js";
import authorize from "../../common/middleware/authorize.middleware.js";
import { getStats } from "./dashboard.controller.js";

const router = Router();

router.use(protect);
router.use(authorize("admin"));

router.get("/stats", getStats);

export default router;
