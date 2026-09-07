import { Router } from "express";
import container from "../../infrastructure/di/container";
import TYPES from "../../infrastructure/di/types";
import { TaskController } from "../controllers/TaskController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { asyncHandler } from "../middlewares/asyncHandler";

const router = Router();
const taskController = container.get<TaskController>(TYPES.TaskController);

router.use(authMiddleware);

router.post("/", asyncHandler(taskController.create));
router.get("/", asyncHandler(taskController.getAll));
router.put("/:id", asyncHandler(taskController.update));
router.delete("/:id", asyncHandler(taskController.delete));

export default router;
