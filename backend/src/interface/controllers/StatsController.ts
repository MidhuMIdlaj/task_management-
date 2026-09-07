import { inject, injectable } from "inversify";
import { Response } from "express";
import TYPES from "../../infrastructure/di/types";
import { AuthRequest } from "../middlewares/authMiddleware";
import { IGetTaskStatsUseCase } from "../../application/interfaces/IStatsUseCases";

@injectable()
export class StatsController {
  constructor(@inject(TYPES.IGetTaskStatsUseCase) private getTaskStatsUseCase: IGetTaskStatsUseCase) {}

  getStats = async (req: AuthRequest, res: Response): Promise<void> => {
    const owner = req.userId as string;
    const stats = await this.getTaskStatsUseCase.execute(owner);
    res.status(200).json(stats);
  };
}
