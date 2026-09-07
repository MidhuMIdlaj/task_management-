import { Router } from "express";
import container from "../../infrastructure/di/container";
import TYPES from "../../infrastructure/di/types";
import { StatsController } from "../controllers/StatsController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { asyncHandler } from "../middlewares/asyncHandler";

const router = Router();
const statsController = container.get<StatsController>(TYPES.StatsController);

router.use(authMiddleware);
router.get("/", asyncHandler(statsController.getStats));

export default router;
