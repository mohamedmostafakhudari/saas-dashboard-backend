import { Router } from "express";
import protect from "../../common/middleware/auth.middleware";
import * as controller from "./controller";

const router = Router();

router.use(protect);

router.get("/", controller.list);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.patch("/:id", controller.update);
router.delete("/:id", controller.remove);

export default router;
