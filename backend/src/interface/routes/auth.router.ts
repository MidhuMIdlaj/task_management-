import { Router } from "express";
import container from "../../infrastructure/di/container";
import TYPES from "../../infrastructure/di/types";
import { AuthController } from "../controllers/AuthController";
import { asyncHandler } from "../middlewares/asyncHandler";

const router = Router();
const authController = container.get<AuthController>(TYPES.AuthController);

router.post("/register", asyncHandler(authController.register));
router.post("/login", asyncHandler(authController.login));

export default router;
