import { Router } from "express";
import protect from "../../common/middleware/auth.middleware.js";
import authorize from "../../common/middleware/authorize.middleware.js";
import {
	createUser,
	deleteUser,
	getAllUsers,
	updateUser,
} from "./user.controller.js";

const router = Router();

// All routes below require a valid token and admin role
router.use(protect);
router.use(authorize("admin"));

router.get("/", getAllUsers);
router.post("/", createUser);
router.patch("/:userId", updateUser);
router.delete("/:userId", deleteUser);

export default router;
